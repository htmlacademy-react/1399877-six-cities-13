import { Helmet } from 'react-helmet-async';

export default function NotFoundPage():JSX.Element {
  return (
    <div className="page">
      <Helmet>
        <title>404</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <section>
          <div className="container">
            <h1 className="offer__name">
              404 There is no such page, sorry!
            </h1>
          </div>
        </section>
      </main>
    </div>
  );
}
