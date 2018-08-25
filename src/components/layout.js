import 'normalize.css';
import 'typeface-source-sans-pro';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal, css } from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';
import backgroundImage from '../images/background.jpg';
import Header from './header';
import Main from './main';
import Footer from './footer';

injectGlobal`
  @font-face {
    font-family: 'Source Sans Pro';
    src: local('Source Sans Pro');
  }
  html {
    background-color: #242424;
    overflow-y: scroll;
  }
  body {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto,
      'segoe ui', arial, sans-serif;
    font-weight: 300;
  }
  html,
  body,
  div,
  article,
  aside,
  section,
  main,
  nav,
  footer,
  header,
  form,
  fieldset,
  legend,
  pre,
  code,
  a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  ol,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figcaption,
  figure,
  textarea,
  table,
  td,
  th,
  tr,
  input[type='email'],
  input[type='number'],
  input[type='password'],
  input[type='tel'],
  input[type='text'],
  input[type='url'] {
    box-sizing: border-box;
  }
`;

const Layout = ({ children, onSearchTermChange, withSearch }) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
  >
    {({ site: { siteMetadata } }) => (
      <Fragment>
        <Helmet>
          <html lang="en" />
        </Helmet>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            position: relative;
            &::after {
              content: '';
              background-image: url(${backgroundImage});
              background-repeat: no-repeat;
              background-size: cover;
              background-attachment: fixed;
              background-position: center;
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              z-index: -1;
              opacity: 0.25;
            }
          `}
        >
          <Header
            siteTitle={siteMetadata.title}
            onSearchTermChange={onSearchTermChange}
            withSearch={withSearch}
          />
          <Main>{children}</Main>
          <Footer />
        </div>
      </Fragment>
    )}
  </StaticQuery>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onSearchTermChange: PropTypes.func,
  withSearch: PropTypes.bool,
};

Layout.defaultProps = {
  onSearchTermChange: () => {},
  withSearch: false,
};

export default Layout;
