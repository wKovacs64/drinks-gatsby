import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal, css } from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';
import Footer from './footer';

injectGlobal`
  html {
    background-color: #242424;
    overflow-y: auto;
  }
  html,
  body,
  #___gatsby {
    min-height: 100vh;
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
            min-height: 100vh;
          `}
        >
          <Header siteTitle={siteMetadata.title} />
          <main>{children}</main>
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
