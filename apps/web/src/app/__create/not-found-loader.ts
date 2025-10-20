import fg from 'fast-glob';
import { type LoaderFunctionArgs } from 'react-router-dom'; // Import LoaderFunctionArgs

export async function loader({ params }: LoaderFunctionArgs) {
  const matches = await fg('src/**/page.{js,jsx,ts,tsx}');
  return {
    path: `/${params['*']}`,
    pages: matches
      .sort((a, b) => a.length - b.length)
      .map((match) => {
        const url = match.replace('src/app', '').replace(/\/page\.(js|jsx|ts|tsx)$/, '') || '/';
        const path = url.replaceAll('[', '').replaceAll(']', '');
        const displayPath = path === '/' ? 'Homepage' : path;
        return { url, path: displayPath };
      }),
  };
}
