import PropTypes from 'prop-types';

function Nav({ children }) {
  return (
    <nav className="mb-4 px-4 text-gray-100 sm:mb-8 sm:p-0">{children}</nav>
  );
}

Nav.propTypes = {
  children: PropTypes.node,
};

Nav.defaultProps = {
  children: null,
};

export default Nav;
