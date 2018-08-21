import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { css } from 'react-emotion';
import Layout from '../components/layout';
import BrokenGlass from '../components/broken-glass';
import mq from '../utils/mq';

const NotFoundPage = () => (
  <Layout>
    <Helmet
      title="Broken Link"
      meta={[{ name: 'description', content: 'No drinks found.' }]}
    />
    <div
      className={css`
        color: #eeeeee;
        margin: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        ${mq.md(css`
          margin: 2rem 0 0;
        `)};
      `}
    >
      <p
        className={css`
          font-weight: 400;
          font-size: 1.25rem;
          margin: 0;
          max-width: 23ch;
          text-align: center;
          ${mq.md(css`
            font-weight: 300;
            font-size: 1.5rem;
          `)};
          ${mq.xl(css`
            font-weight: 300;
            font-size: 2.25rem;
          `)};
        `}
      >
        Oops, this doesn&apos;t appear to be a tasty drink recipe!
      </p>
      <BrokenGlass
        className={css`
          color: #d09e45;
          height: 20vh;
          width: 20vh;
          margin: 10vh 0;
        `}
      />
      <Link
        to="/"
        className={css`
          padding-bottom: 0.25rem;
          color: currentColor;
          text-decoration: none;
          border-bottom: 1px solid #cccccc;
          transition: color 0.3s ease, border-color 0.3s ease,
            box-shadow 0.3s ease;
          &:hover {
            color: #f4f4f4;
            border-color: #f4f4f4;
            box-shadow: inset 0 -2px 0 0 #f4f4f4;
          }
          ${mq.md(css`
            font-size: 1.25rem;
          `)};
        `}
      >
        Back to Drinks
      </Link>
    </div>
  </Layout>
);

export default NotFoundPage;
