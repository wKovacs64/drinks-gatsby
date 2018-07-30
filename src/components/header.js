import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const Header = ({ siteTitle }) => (
  <header
    className={css`
      background-color: #111111;
      padding: 1rem;
      ${mq.md(css`
        padding: 2rem;
      `)};
    `}
  >
    <h1
      className={css`
        font-weight: 300;
        margin: 0;
      `}
    >
      <Link
        to="/"
        className={css`
          color: #cccccc;
          text-decoration: none;
          transition: color 0.3s ease;

          &:hover {
            color: #f4f4f4;
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
