"use client"; 

import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LinearProgress from '@mui/material/LinearProgress';
import type { Navigation, Session } from '@toolpad/core/AppProvider';

import theme from '../theme';
import { CalendarMonthRounded, Event, Logout, MonetizationOn, Schedule, Work } from '@mui/icons-material';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Admin',
  },
  {
    segment: '',
    title: 'Home',
    icon: <DashboardIcon />,
  },
  {
    segment: 'calendar',
    title: 'Calendar',
    icon: <Event />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Employee Management',
  },
  {
    segment: 'jobs',
    title: 'Jobs',
    icon: <Work />,
  },
  {
    segment: 'eCalendar',
    title: 'Employee Calendar',
    icon: <Schedule />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Financials',
  },
  {
    segment: 'payroll',
    title: 'Payroll',
    icon: <MonetizationOn />,
  },
 
  {
    kind: 'divider',
  },
 
  {
    segment: 'logout',
    title: 'Logout',
    icon: <Logout />,
   
  },
];

const BRANDING = {
  title: 'ServiceSync',
  logo: <img src="https://i.imgur.com/Qb4GvFV.png" alt="RRP logo" />,
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: 'Mohammad Taufique Imrose',
      email: 'taufiqsaimun@csus.edu',
      image: 'https://i.imgur.com/bWfKjXl.jpeg',
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Mohammad Taufique Imrose',
            email: 'taufiqsaimun@csus.edu',
            image: 'https://i.imgur.com/bWfKjXl.jpeg',
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              authentication={authentication}
              theme={theme}
              session={session}
            >
              {props.children}
            </NextAppProvider>
          </React.Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}