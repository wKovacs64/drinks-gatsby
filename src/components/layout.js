import '@wkovacs64/normalize.css';
import 'typeface-source-sans-pro';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import Helmet from 'react-helmet';
import { css, Global, ClassNames } from '@emotion/core';
import { StaticQuery, graphql } from 'gatsby';
import backgroundImage from '../images/background.jpg';
import FeedbackDialog from './feedback-dialog';
import Header from './header';
import Main from './main';
import Footer from './footer';
import mq from '../utils/mq';

function Layout({ children, onSearchTermChange, withSearch }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  function handleFeedbackToggle() {
    setFeedbackOpen(open => !open);
  }

  return (
    <StaticQuery
      query={graphql`
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
      `}
    >
      {({ site: { siteMetadata } }) => (
        <ClassNames>
          {({ css: classNameFromCss }) => (
            <IconContext.Provider
              value={{
                className: classNameFromCss`
                  vertical-align: middle;
                `,
              }}
            >
              <Global
                styles={css`
                  @font-face {
                    font-family: 'Source Sans Pro';
                    src: local('Source Sans Pro');
                  }
                  html {
                    background-color: #242424;
                    overflow-y: scroll;
                  }
                  body {
                    font-family: 'Source Sans Pro', -apple-system,
                      BlinkMacSystemFont, 'avenir next', avenir,
                      'helvetica neue', helvetica, ubuntu, roboto, noto,
                      'segoe ui', arial, sans-serif;
                    font-weight: 300;
                  }
                  #gatsby-noscript {
                    display: none;
                  }
                `}
              />
              <Helmet>
                <html lang="en" data-commit={siteMetadata.buildInfo.commit} />
              </Helmet>
              <FeedbackDialog
                isOpen={feedbackOpen}
                onDismiss={handleFeedbackToggle}
              />
              <div
                css={css`
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
                <noscript>
                  <p
                    css={css`
                      color: #f4f4f4;
                      margin-bottom: 0;
                      padding: 1rem;
                      ${mq.sm} {
                        padding: 0;
                        text-align: center;
                      }
                    `}
                  >
                    Please enable JavaScript for full site functionality.
                  </p>
                </noscript>
                <Main>{children}</Main>
                <Footer onFeedbackClick={handleFeedbackToggle} />
              </div>
            </IconContext.Provider>
          )}
        </ClassNames>
      )}
    </StaticQuery>
  );
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
