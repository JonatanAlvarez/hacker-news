import { NavLink, Outlet, useParams } from 'react-router-dom';

import './DefaultLayout.scss';

const DefaultLayout = () => {
  const { query, page } = useParams();

  return (
    <div className="DefaultLayout">
      <header>
        <h1 className="max-container">Hacker News</h1>
      </header>
      <nav>
        <NavLink to={'/' + ( query ? '' : page) }>All</NavLink>
        <NavLink to="/my-faves/1">My faves</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;