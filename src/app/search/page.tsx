// app/search/page.js or app/search/page.tsx
import { Search } from './search'; // change this with the path to your <Search> component

export const dynamic = 'force-dynamic';

export default function Page() {
  return <Search />;
}
