/// <reference types="node" />

import { Router, Request, Response } from 'express';
import OAuthClient from 'intuit-oauth';
import process from 'process';

interface Token {
  realmId: string;
  [key: string]: any;
}

const router = Router();

console.log('Loading environment variables...');
console.log('CLIENT_ID from env:', process.env.CLIENT_ID);
console.log('CLIENT_SECRET from env:', process.env.CLIENT_SECRET);
console.log('REDIRECT_URI from env:', process.env.REDIRECT_URI);
console.log('ENVIRONMENT from env:', process.env.ENVIRONMENT);

const oauthClient = new OAuthClient({
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  environment: (process.env.ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
  redirectUri: process.env.REDIRECT_URI || '',
});

let tokenData: Token | null = null;

router.get('/auth', (req: Request, res: Response) => {
  try {
    const authUri = oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
      state: 'testState',
    });
    res.redirect(authUri);
  } catch (error: any) {
    console.error('Failed to generate QuickBooks auth URI:', error instanceof Error ? error.message : error);
    res.status(500).send('Failed to initiate QuickBooks auth.');

  }
});

router.get('/callback', async (req: Request, res: Response) => {
  console.log('Callback route hit with query:', req.query);
  try {
    const parseRedirect = req.url;
    const tokenResponse = await oauthClient.createToken(parseRedirect);
    tokenData = tokenResponse.getJson();
    console.log('Token received:', tokenData);
    res.redirect('http://localhost:3000/payroll');
  } catch (error: any) {
    console.error('OAuth callback error:', error instanceof Error ? error.message : error);
    res.status(400).send('QuickBooks authentication failed.');

  }
});

router.get('/company-info', async (req: Request, res: Response) => {
  try {
    const token = oauthClient.getToken();
    if (!token || !token.realmId) {
      res.status(401).json({ error: 'No valid token or realmId found. Please authenticate first.' });
      return;
    }
    const companyID = token.realmId;

    const baseURL =
      oauthClient.environment === 'sandbox'
        ? 'https://sandbox-quickbooks.api.intuit.com/'
        : 'https://quickbooks.api.intuit.com/';

    const apiResponse = await oauthClient.makeApiCall({
      url: `${baseURL}v3/company/${companyID}/companyinfo/${companyID}`,
    });

    res.json(JSON.parse(apiResponse.text()));
  } catch (error: any) {
    console.error('Failed to retrieve company info:', error instanceof Error ? error.message : error);
    res.status(500).json({ error: 'Could not fetch QuickBooks company data.' });

  }
});

export default router;