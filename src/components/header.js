import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import VisuallyHidden from '@reach/visually-hidden';
import { MdSearch } from 'react-icons/md';
import mq from '../utils/mq';
import { constrainWidth, focus } from '../styles';

const HeaderLink = styled(Link)`
  color: currentColor;
  text-decoration: none;
  &:hover,
  &:focus {
    color: #f4f4f4;
  }
  ${focus};
`;

const Header = ({ siteTitle }) => (
  <header
    css={css`
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #cccccc;
      background-color: #111111;
      padding: 1rem;
      ${mq.md} {
        padding: 2rem;
      }
    `}
  >
    <section
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        ${constrainWidth};
      `}
    >
      <h1
        css={css`
          font-weight: 300;
          margin: 0;
          padding: 0;
        `}
      >
        <HeaderLink to="/">{siteTitle}</HeaderLink>
      </h1>
      <HeaderLink to="/search/">
        <VisuallyHidden>Search</VisuallyHidden>
        <MdSearch aria-hidden size={32} />
      </HeaderLink>
    </section>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default Header;
