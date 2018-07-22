import 'tachyons/css/tachyons.css';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { injectGlobal } from 'emotion';
import Header from './Header';

injectGlobal`
  html,
  body,
  #___gatsby {
    height: 100%;
  }
`;

const Layout = ({ children /* , data */ }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
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
        <div className="min-h-100 f4 sans-serif black-70 bg-near-white">
          <Header siteTitle={siteMetadata.title} />
          <div className="pa4">{children}</div>
        </div>
      </Fragment>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  // data: PropTypes.shape.isRequired,
};

export default Layout;
