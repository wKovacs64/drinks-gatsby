import '@wkovacs64/normalize.css';
import 'typeface-source-sans-pro';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { injectGlobal, css } from 'react-emotion';
import { StaticQuery, graphql } from 'gatsby';
import backgroundImage from '../images/background.jpg';
import FeedbackDialog from './feedback-dialog';
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
`;

class Layout extends Component {
  state = { feedbackOpen: false };

  handleFeedbackToggle = () => {
    this.setState(({ feedbackOpen }) => ({ feedbackOpen: !feedbackOpen }));
  };

  render() {
    const { children, onSearchTermChange, withSearch } = this.props;
    const { feedbackOpen } = this.state;

    return (
      <StaticQuery
        query={graphql`
          {
            site {
              siteMetadata {
                title
                buildInfo {
                  commit
                  version
                }
              }
            }
          }
        `}
      >
        {({ site: { siteMetadata } }) => (
          <Fragment>
            <Helmet>
              <html
                lang="en"
                data-commit={siteMetadata.buildInfo.commit}
                data-version={siteMetadata.buildInfo.version}
              />
            </Helmet>
            <noscript>
              <style>{'.js { display: none; }'}</style>
            </noscript>
            <FeedbackDialog
              isOpen={feedbackOpen}
              onDismiss={this.handleFeedbackToggle}
            />
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
                }
              `}
            >
              <Header
                siteTitle={siteMetadata.title}
                onSearchTermChange={onSearchTermChange}
                withSearch={withSearch}
              />
              <Main>{children}</Main>
              <Footer onFeedbackClick={this.handleFeedbackToggle} />
            </div>
          </Fragment>
        )}
      </StaticQuery>
    );
  }
}

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
