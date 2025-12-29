import { Link } from 'react-router-dom';

const NavBar = ({ user, setUser }) => {
  return (
    <nav>
      {!user ? (
        <ul>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to="/sign-out">Sign Out</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
