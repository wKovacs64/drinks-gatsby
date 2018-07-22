import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import Header from './header';

const Layout = ({ children /* , data */ }) => (
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
        <div>
          <Header siteTitle={siteMetadata.title} />
          <div>{children}</div>
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
