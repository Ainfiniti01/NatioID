import React, { Suspense } from 'react';

interface LazyRouteElementProps {
  componentPath: string;
}

const LazyRouteElement: React.FC<LazyRouteElementProps> = ({ componentPath }) => {
  const getModulePath = (path: string) => {
    // Remove leading './' if present
    let cleanedPath = path.startsWith('./') ? path.substring(2) : path;
    // Replace .jsx or .tsx with .js
    cleanedPath = cleanedPath.replace(/\.(jsx|tsx)$/, '.js');
    // Prepend /assets/ if not already present and it's a relative path
    if (!cleanedPath.startsWith('/')) {
      cleanedPath = `/assets/${cleanedPath}`;
    }
    return cleanedPath;
  };

  const modulePath = getModulePath(componentPath);
  const LazyComponent = React.lazy(() => import(/* @vite-ignore */ modulePath));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};

export default LazyRouteElement;
