import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { metaForPath, publicRoutes } from './seo/meta';
import { SPORTS } from './data/sports';
import { ZONES } from './data/zones';
import { EVENTS, upcomingEvents } from './data/events';
import { SITE } from './seo/site';

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, meta: metaForPath(url) };
}

export { publicRoutes, SPORTS, ZONES, EVENTS, upcomingEvents, SITE };
