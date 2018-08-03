import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const NavDivider = ({ className }) => (
  <span
    className={css`
      margin: 0 1rem;
      ${className};
    `}
  >
    ⇒
  </span>
);

NavDivider.propTypes = {
  className: PropTypes.string,
};

NavDivider.defaultProps = {
  className: '',
};

export default NavDivider;
