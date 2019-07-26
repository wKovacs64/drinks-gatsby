import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import orderBy from 'lodash/orderBy';
import matchSorter from 'match-sorter';
import mq from '../utils/mq';
import Layout from './layout';
import DrinkList from './drink-list';
import AnimateOnTransition from './animate-on-transition';

function SearchableDrinksPage({ children, drinks }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchTermChange(value) {
    setSearchTerm(value);
  }

  const filteredDrinks = matchSorter(drinks, searchTerm, {
    keys: ['title', 'ingredients', 'notes.childMarkdownRemark.rawMarkdownBody'],
    threshold: matchSorter.rankings.CONTAINS,
  });
  const sortedDrinks = orderBy(drinks, ['rank', 'createdAt'], ['desc', 'desc']);

  return (
    <Layout withSearch onSearchTermChange={handleSearchTermChange}>
      {children}
      {filteredDrinks.length ? (
        <AnimateOnTransition>
          <DrinkList drinks={searchTerm ? filteredDrinks : sortedDrinks} />
        </AnimateOnTransition>
      ) : (
        <span
          css={css`
            color: #eeeeee;
            font-size: 1.25rem;
            padding: 1rem;
            ${mq.sm} {
              padding: 2rem 0;
            }
          `}
        >
          No drinks found.
        </span>
      )}
    </Layout>
  );
}

SearchableDrinksPage.propTypes = {
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      image: PropTypes.shape({
        fluid: PropTypes.shape(),
      }),
      ingredients: PropTypes.arrayOf(PropTypes.string),
      calories: PropTypes.number,
      rank: PropTypes.number,
      createdAt: PropTypes.string,
      notes: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          rawMarkdownBody: PropTypes.string,
        }),
      }),
    }),
  ).isRequired,
  children: PropTypes.node,
};

SearchableDrinksPage.defaultProps = {
  children: null,
};

export default SearchableDrinksPage;
