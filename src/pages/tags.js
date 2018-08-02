import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { css } from 'react-emotion';
import Layout from '../components/layout';
import Main from '../components/main';
import Tag from '../components/tag';
import mq from '../utils/mq';

const TagsPage = ({
  data: {
    allDrinks: { allTags },
  },
}) => (
  <Layout>
    <Main
      className={css`
        align-items: center;
      `}
    >
      {allTags.map(({ tag }) => (
        <Link
          to={`tags/${tag}`}
          key={tag}
          className={css`
            margin: 1rem 0;
            ${mq.xl(css`
              margin: 2rem 0;
            `)};
            text-decoration: none;
            max-width: 16rem;
          `}
        >
          <Tag
            className={css`
              font-weight: 300;
              font-size: 1.5rem;
              padding: 1rem;
              ${mq.xl(css`
                font-size: 2.25rem;
                padding: 1.5rem;
              `)};
            `}
          >
            {tag}
          </Tag>
        </Link>
      ))}
    </Main>
  </Layout>
);

export const query = graphql`
  query {
    allDrinks: allContentfulDrink {
      allTags: group(field: tags) {
        tag: fieldValue
      }
    }
  }
`;

TagsPage.propTypes = {
  data: PropTypes.shape({
    allDrinks: PropTypes.shape({
      allTags: PropTypes.arrayOf(
        PropTypes.shape({
          tag: PropTypes.string,
        }),
      ),
    }),
  }).isRequired,
};

export default TagsPage;
