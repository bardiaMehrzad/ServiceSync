const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const crypto = require('crypto');
const qs = require('qs');
const cors = require('cors');
dotenv.config();

const app = express();
const port = 5001;

app.use(cors());

const clientId = process.env.QB_CLIENT_ID;
const clientSecret = process.env.QB_CLIENT_SECRET;
const redirectUri = process.env.QB_REDIRECT_URI;

console.log('Server is starting...');

// Temporary in-memory store for state (for development purposes)
let stateStore = '';

// Temporary in-memory store for access token (for development purposes)
let accessToken = null;

// Function to generate a random state string for security
const generateState = () => {
    return crypto.randomBytes(16).toString('hex');
};

// Redirect to QuickBooks for authentication
app.get('/auth/quickbooks', (req, res) => {
    const state = generateState();
    stateStore = state; // Store the state value
    const authUrl = `https://appcenter.intuit.com/connect/oauth2?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=com.intuit.quickbooks.accounting&state=${state}`;
    res.redirect(authUrl);
});

app.get('/api/check-token', (req, res) => {
    res.json({ tokenAvailable: accessToken !== null });
});

// Handle callback and exchange authorization code for tokens
app.get('/callback', async (req, res) => {
    const authCode = req.query.code;
    const returnedState = req.query.state;

    console.log('Authorization Code:', authCode);
    console.log('Returned State:', returnedState);

    try {
        const tokenResponse = await axios.post(
            'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
            qs.stringify({
                grant_type: 'authorization_code',
                code: authCode,
                redirect_uri: redirectUri
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
                }
            }
        );

        // Store the access token securely
        accessToken = tokenResponse.data.access_token;
        console.log('Access Token:', accessToken);

        res.send('OAuth flow completed. Tokens received.');
    } catch (error) {
        console.error('Error exchanging tokens:', error.response?.data || error.message);
        res.status(500).send('Failed to exchange tokens.');
    }
});

//route to fetch invoices from QuickBooks
app.get('/api/invoices', async (req, res) => {
    console.log("fetching invoices...");
    if (!accessToken) {
        console.error('No access token available');
        return res.status(401).send('Unauthorized: No access token');
    }

    console.log('Making API request to QuickBooks...');

    try {
        const response = await axios.get(
            `https://quickbooks.api.intuit.com/v3/company/9341453450159230/query?query=SELECT * FROM Invoice`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json'
                }
            }
        );

        console.log('API Response:', response.data); // Log the API response
        if (!response.data.QueryResponse || !response.data.QueryResponse.Invoice) {
            console.log('No invoices found in the API response.');
            return res.json({ message: 'No invoices found' });
        }

        res.json(response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error response from QuickBooks:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error('Error message:', error.message);
        }
        res.status(500).send('Failed to fetch invoices.');
    }
});


try {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
} catch (error) {
    console.error('Error starting server:', error);
}
//9341453450159230