import { NavLink } from "react-router-dom";

import ghost from "../../assets/mini-ghost.gif";

const NotFound = () => (
  <>
    <h2 style={{textAlign: 'center'}}><span style={{fontSize: '64px'}}>404</span><br /><br />This is not the web page you are looking for</h2>
    <img src={ghost} alt="" width="64" height="64" style={{display: 'block', margin: '100px auto',textAlign: 'center'}} />
    <NavLink to="/" style={{display: 'block', margin: '100px 0',textAlign: 'center'}}>Go Home</NavLink>
  </>
);

export default NotFound;