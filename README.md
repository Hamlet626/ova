
### OVA
Project OVA is a comprehensive full-stack web application designed to facilitate and manage the egg donation process. Developed using Next.js and Firebase, this platform streamlines the journey for both egg donors and recipients, providing a secure and organized system for a sensitive and complex process.

## Features ✨
Donor & Recipient Management: 
Guides egg donors through the entire process, from the initial application to legal case finalization. It also allows egg recipients to browse donor profiles and securely select a match.

Case Management: 
Includes a robust internal system for tracking all aspects of the donation journey, including legal agreements, medical screenings, and court proceedings.

Secure & Private: 
Ensures the privacy and security of all users with a robust authentication and data management backend.


## Set Up Environments
1. Fill credentials in


   `src/utils/firebase/firebase_client.ts`,
   `src/utils/firebase/firebase_server.ts`,
   `src/utils/cloudinary/cloudinary.ts`,
   `src/utils/algolia.ts`,
   `src/components/google_map.tsx`
   
   Or use other methods to handle the env variables.
   
3. (Optional) If using Firebase admin file as credential, download e.g. 'ova-firebase-admin.json' on firebase/setting, then put it into root directory.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
