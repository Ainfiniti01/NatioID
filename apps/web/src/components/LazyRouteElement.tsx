import React, { Suspense } from 'react';

interface LazyRouteElementProps {
  componentPath: string;
}

const LazyRouteElement: React.FC<LazyRouteElementProps> = ({ componentPath }) => {
  const LazyComponent = React.lazy(() => import(/* @vite-ignore */ componentPath));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};

export default LazyRouteElement;
