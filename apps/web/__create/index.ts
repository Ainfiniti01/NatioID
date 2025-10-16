import { Hono } from 'hono';
import { requestId } from 'hono/request-id';
import { createHonoServer } from 'react-router-hono-server/node';
import { getHTMLForErrorPage } from './get-html-for-error-page';

const app = new Hono();

app.use('*', requestId());

app.onError((err, c) => {
  if (c.req.method !== 'GET') {
    // For non-GET requests, return a generic error or handle as appropriate for a frontend-only app.
    // For a presentation build, we might not even need this, but keeping it minimal.
    return c.text('An error occurred', 500);
  }
  return c.html(getHTMLForErrorPage(err), 200);
});

// The rest of the file would be the frontend routing/rendering setup.
// Since this file is `index.ts` and likely the entry point for the server,
// we'll assume it needs to export a Hono server instance that can render the frontend.
// For now, we'll keep it minimal.

export default await createHonoServer({
  app,
  defaultLogger: false,
});
