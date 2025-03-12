import { http, HttpResponse } from 'msw';

export const quickbooksHandlers = [
// QuickBooks Payroll Company Info Handler
http.get('http://localhost:3001/quickbooks/company-info', (req) => {
    const isAuthenticated = false;
    if (!isAuthenticated) {
      return new HttpResponse(
        JSON.stringify({
          error: 'No valid token or realmId found. Please authenticate first.',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    return new HttpResponse(
      JSON.stringify({
        CompanyName: 'Roroman Plumbing',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }),
];