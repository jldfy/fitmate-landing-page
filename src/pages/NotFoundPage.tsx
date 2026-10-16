import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { notFoundMeta } from '../seo/meta';

export default function NotFoundPage() {
  return (
    <PageShell meta={notFoundMeta('/404')}>
      <div className="container mx-auto px-4 max-w-3xl text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Page introuvable</h1>
        <p className="text-gray-600 mb-8">Cette page n’existe pas ou plus. Voici où aller :</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full border border-gray-300 px-5 py-2 hover:border-orange-400">
            Accueil
          </Link>
          <Link to="/sports" className="rounded-full border border-gray-300 px-5 py-2 hover:border-orange-400">
            Sports
          </Link>
          <Link to="/evenements" className="rounded-full border border-gray-300 px-5 py-2 hover:border-orange-400">
            Événements
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
