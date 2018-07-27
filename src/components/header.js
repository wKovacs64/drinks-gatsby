import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from 'react-emotion';
import { rhythm } from '../utils/typography';

const Header = ({ siteTitle }) => (
  <header
    className={css`
      background-color: #111111;
      padding: ${rhythm(1)};
    `}
  >
    <h1
      className={css`
        margin-bottom: 0;
      `}
    >
      <Link
        to="/"
        className={css`
          color: #eeeeee;

          &:hover {
            color: #aaaaaa;
            text-decoration: none;
          }
        `}
      >
        {siteTitle}
      </Link>
    </h1>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default Header;
