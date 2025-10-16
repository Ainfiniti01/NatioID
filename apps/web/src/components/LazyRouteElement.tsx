import React, { Suspense } from 'react';
import { routeImportMap } from '../utils/routeImports';

interface LazyRouteElementProps {
  componentPath: string;
}

const LazyRouteElement: React.FC<LazyRouteElementProps> = ({ componentPath }) => {
  const importFn = routeImportMap[componentPath as keyof typeof routeImportMap];

  if (!importFn) {
    console.error(`Unknown componentPath: ${componentPath}`);
    return <div>Error: Component not found</div>;
  }

  const LazyComponent = React.lazy(importFn);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
};

export default LazyRouteElement;
