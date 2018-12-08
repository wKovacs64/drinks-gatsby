import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import kebabCase from 'lodash.kebabcase';
import matchSorter from 'match-sorter';
import Layout from '../components/layout';
import Nav from '../components/nav';
import NavLink from '../components/nav-link';
import NavDivider from '../components/nav-divider';
import TagLink from '../components/tag-link';
import Tag from '../components/tag';
import mq from '../utils/mq';

function TagsPage({
  data: {
    allContentfulDrink: { group },
  },
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const tags = group.map(({ fieldValue }) => fieldValue);
  const filteredTags = matchSorter(tags, searchTerm);

  function handleSearchTermChange(value) {
    setSearchTerm(value);
  }

  return (
    <Layout withSearch onSearchTermChange={handleSearchTermChange}>
      <Helmet
        title="Drink Tags"
        meta={[{ name: 'description', content: 'All drink tags' }]}
      />
      <Nav>
        <NavLink to="/">All Drinks</NavLink>
        <NavDivider />
        Tags
      </Nav>
      <div
        css={css`
          display: grid;
          grid-gap: 1rem;
          margin: 0 1rem;
          ${mq.sm} {
            grid-gap: 2rem;
            margin: 0;
          }
          ${mq.lg} {
            grid-gap: 2rem;
            grid-template-columns: repeat(2, 1fr);
          }
          ${mq.xl} {
            grid-template-columns: repeat(3, 1fr);
          }
        `}
      >
        {filteredTags.length ? (
          filteredTags.map(tag => (
            <TagLink to={`/tags/${kebabCase(tag)}/`} key={tag}>
              <Tag
                css={css`
                  font-weight: 300;
                  font-size: 1.5rem;
                  padding: 1rem;
                  ${mq.lg} {
                    font-size: 2.25rem;
                    padding: 1.5rem;
                  }
                `}
              >
                {tag}
              </Tag>
            </TagLink>
          ))
        ) : (
          <span
            css={css`
              color: #eeeeee;
              font-size: 1.25rem;
              padding: 0;
            `}
          >
            No matching tags found.
          </span>
        )}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query {
    allContentfulDrink {
      group(field: tags) {
        fieldValue
      }
    }
  }
`;

TagsPage.propTypes = {
  data: PropTypes.shape({
    allContentfulDrink: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string,
        }),
      ),
    }),
  }).isRequired,
};

export default TagsPage;
