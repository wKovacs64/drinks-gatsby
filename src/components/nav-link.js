import PropTypes from 'prop-types';
import { Link } from 'gatsby';

function NavLink({ children, to }) {
  return (
    <li className="inline">
      <Link
        className="border-b border-dotted pb-1 transition ease-default hover:border-solid focus:border-solid focus-visible:outline-none focus-visible:ring"
        to={to}
      >
        {children}
      </Link>
    </li>
  );
}

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default NavLink;
