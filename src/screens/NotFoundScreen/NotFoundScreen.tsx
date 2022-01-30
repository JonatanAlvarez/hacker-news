import { NavLink } from "react-router-dom";

import ghost from "../../assets/Ghost.gif";

const NotFound = () => (
  <>
    <h1 style={{textAlign: 'center'}}><strong>404</strong><br />This is not the web page you are looking for</h1>
    <img src={ghost} alt="" style={{display: 'block', margin: '100px auto',textAlign: 'center'}} />
    <NavLink to="/" style={{display: 'block', margin: '100px 0',textAlign: 'center'}}>Go Home</NavLink>
  </>
);

export default NotFound;