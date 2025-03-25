import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import { initializeApp } from 'firebase/app';
import { ref, query, getDatabase, orderByChild, equalTo, get } from 'firebase/database';
import { use } from 'react';
import { db } from './app/(dashboard)/editProfile/lib/firebase'

interface User {
  name: string;
  role: string;
  image: string;
  email: string;
}

// This is the db name assigned in the firebase.ts file.
if (db.app.name != 'service_sync') {
  //This is an error, the db should already be loaded and not unloaded.
  console.error('Error, program says db is not loaded.');
  throw new Error('Database is not loading properly refer to duplicate declarations of db in application.');
}

async function findAuthEntry(email: string, password: string): Promise<boolean> {
  try {
    // Create a reference to the Authentication node
    const authRef = ref(db, 'Authentication');

    // Query where the 'email' child property equals the provided email
    const authQuery = query(
      authRef,
      orderByChild('email'),    // Use the property name "email", not the email value
      equalTo(email)            // Match the email value
    );

    // Execute the query
    const snapshot = await get(authQuery);

    if (snapshot.exists()) {
      // Check if any returned entry has a matching password
      const data = snapshot.val();
      const users = Object.values(data); // Convert to array of user objects
      for (const user of users) {
        if ((user as any).password === password) { // Type assertion; refine as needed
          return true;
        }
      }
      return false; // Email found but password didn't match
    } else {
      return false; // No matching email found
    }
  } catch (error) {
    console.error('[Auth Error] Database query failed.');
    throw new Error('Authentication service is currently unavailable.');

  }
}

async function finduserInfo(email: string): Promise<{
  name: string;
  email: string;
  role: string;
  image: string;
}> {
  try {
    // Create a reference to the Authentication node
    const authRef = ref(db, 'Authentication');

    // Query where the 'email' child property equals the provided email
    const authQuery = query(
      authRef,
      orderByChild('email'),    // Use the property name "email", not the email value
      equalTo(email)            // Match the email value
    );

    // Execute the query
    const snapshot = await get(authQuery);

    if (snapshot.exists()) {
      const userData = Object.values(snapshot.val())[0] as {
        email: string;
        name: string;
        role: string;
        image: string;
        password: string;
      };
      return {
        email: userData.email,
        name: userData.name,
        role: userData.role,
        image: userData.image,
      };
    }
    else {
      return { name: 'error', role: 'error', image: 'error', email: 'error' }; // No matching email found
    }
  } catch (error) {
    console.error('[User Info Error] Failed to retrieve user details.');
    throw new Error('User information could not be retrieved at this time.');


  }
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: 'Email Address', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null;
      }

      const result = await findAuthEntry(
        String(credentials.email),
        String(credentials.password)
      );

      if (!result) {
        if (!result) {
          console.warn('[Auth Warning] Invalid email or password.');
          throw new Error('Invalid login credentials.');
        }

      }
      const user: User = await finduserInfo(String(credentials.email));
      return {
        id: 'What_is_purpose_of_id', // Replace with a unique ID from your database if possible
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,

      };
    },
  }),
];


export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  }
  return { id: provider.id, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,



  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith('/public');

      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false; // Redirect unauthenticated users to login page
    },
    async session({ session, user }) {
      // Get the user's email from the session object
      const userEmail = session.user.email;
      // Fetch additional data for the user based on their ID or other properties
      const user1: User = await finduserInfo(userEmail);

      // Add the additional data to the session object
      session.user.name = user1.name;
      session.user.image = user1.image;
      session.user.email = user1.email;
      session.user.id = user1.role;

      // You can also modify other parts of the session if needed
      return session;
    },
  },
});

export { db };
