import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom';

declare module 'react-router-dom' {
  interface IndexRouteObject {
    file?: string;
  }

  interface NonIndexRouteObject {
    file?: string;
  }
}
