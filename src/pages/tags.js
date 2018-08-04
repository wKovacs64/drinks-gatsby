import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { css } from 'react-emotion';
import kebabCase from 'lodash.kebabcase';
import Layout from '../components/layout';
import Nav from '../components/nav';
import NavLink from '../components/nav-link';
import NavDivider from '../components/nav-divider';
import Tag from '../components/tag';
import mq from '../utils/mq';

const TagsPage = ({
  data: {
    allDrinks: { allTags },
  },
}) => (
  <Layout>
    <Nav>
      <NavLink to="/">All Drinks</NavLink>
      <NavDivider />
      Tags
    </Nav>
    <div
      className={css`
        display: grid;
        grid-gap: 1rem;
        margin: 0 1rem 1rem;
        ${mq.sm(css`
          grid-gap: 2rem;
          margin: 0;
        `)};
        ${mq.lg(css`
          grid-gap: 2rem;
          grid-template-columns: repeat(2, 1fr);
        `)};
        ${mq.xl(css`
          grid-template-columns: repeat(3, 1fr);
        `)};
      `}
    >
      {allTags.map(({ tag }) => (
        <Link
          to={`/tags/${kebabCase(tag)}`}
          key={tag}
          className={css`
            text-decoration: none;
          `}
        >
          <Tag
            className={css`
              font-weight: 300;
              font-size: 1.5rem;
              padding: 1rem;
              ${mq.lg(css`
                font-size: 2.25rem;
                padding: 1.5rem;
              `)};
            `}
          >
            {tag}
          </Tag>
        </Link>
      ))}
    </div>
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
