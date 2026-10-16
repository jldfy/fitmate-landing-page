import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './index.css';

const container = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

// Les pages publiques sont prérendues en HTML statique (scripts/prerender.mjs) : on hydrate.
// Les routes non prérendues (ex. /pitch) partent d'un <div id="root"> vide : on monte.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
