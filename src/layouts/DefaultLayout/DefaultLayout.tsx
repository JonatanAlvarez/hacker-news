import { NavLink, Outlet } from 'react-router-dom';

import './DefaultLayout.scss';

const DefaultLayout = () => (
  <div className="DefaultLayout">
    <header>
      <h1 className="max-container">Hacker News</h1>
    </header>
    <nav>
      <NavLink to="/">All</NavLink>
      <NavLink to="/my-faves">My faves</NavLink>
    </nav>
    <main>
      <Outlet />
    </main>
  </div>
)

export default DefaultLayout;