import * as React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { SkipNavLink } from '@reach/skip-nav';
import { useStaticQuery, graphql } from 'gatsby';
import FeedbackDialog from './feedback-dialog';
import Header from './header';
import Main from './main';
import Footer from './footer';

function Layout({ children }) {
  const [feedbackOpen, setFeedbackOpen] = React.useState(false);
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          buildInfo {
            commit
          }
        }
      }
    }
  `);

  function handleFeedbackToggle() {
    setFeedbackOpen((open) => !open);
  }

  return (
    <React.Fragment>
      <Helmet
        htmlAttributes={{
          lang: 'en',
          'data-commit': siteMetadata.buildInfo.commit,
        }}
      />
      <FeedbackDialog isOpen={feedbackOpen} onDismiss={handleFeedbackToggle} />
      <SkipNavLink />
      <div className="flex min-h-screen flex-col">
        <Header siteTitle={siteMetadata.title} />
        <noscript>
          <p className="p-4 text-gray-100 sm:p-0 sm:text-center">
            Please enable JavaScript for full site functionality.
          </p>
        </noscript>
        <Main>{children}</Main>
        <Footer onFeedbackClick={handleFeedbackToggle} />
      </div>
    </React.Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
