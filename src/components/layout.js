import 'normalize.css';
import 'typeface-source-sans-pro';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal, css } from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';
import Main from './main';
import Footer from './footer';

injectGlobal`
  @font-face {
    font-family: 'Source Sans Pro';
    src: local('Source Sans Pro');
  }
  html,
  body,
  #___gatsby {
    min-height: 100vh;
  }
  html {
    background-color: #242424;
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
  input[type='url'],
  .border-box {
    box-sizing: border-box;
  }
`;

const Layout = ({ children }) => (
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
    render={({ site: { siteMetadata } }) => (
      <Fragment>
        <Helmet
          title={siteMetadata.title}
          meta={[
            { name: 'description', content: 'Drinks' },
            { name: 'keywords', content: 'drinks, cocktails, alcohol' },
          ]}
        />
        <div
          className={css`
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          `}
        >
          <Header siteTitle={siteMetadata.title} />
          <Main>{children}</Main>
          <Footer />
        </div>
      </Fragment>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
