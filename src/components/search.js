import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import VisuallyHidden from '@reach/visually-hidden';
import { MdArrowUpward, MdClear } from 'react-icons/md';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
} from 'react-instantsearch-dom';
import debounce from 'lodash/debounce';
import { appId, indexName, searchKey } from '../../config/algolia';
import { focus } from '../styles';
import { mq } from '../utils';
import DrinkList from './drink-list';
import BrokenGlassIcon from './broken-glass-icon';
import AlgoliaIcon from './algolia-icon';

function NoDrinksFound() {
  return (
    <section
      css={css`
        text-align: center;
      `}
    >
      <BrokenGlassIcon
        aria-label="Broken Glass"
        css={css`
          color: #d09e45;
          height: 20vh;
          width: 20vh;
          margin: 10vh 0;
        `}
      />
      <p
        css={css`
          color: #eeeeee;
          ${mq.md} {
            font-size: 1.25rem;
          }
        `}
      >
        No matching drinks found.
      </p>
    </section>
  );
}

const Hits = connectHits(({ hits, drinks }) => {
  if (hits.length) {
    const matchingDrinks = hits.map((hit) =>
      drinks.find((drink) => drink.slug === hit.objectID),
    );
    return <DrinkList drinks={matchingDrinks} />;
  }

  return <NoDrinksFound />;
});

const SearchBox = connectSearchBox(
  ({ refine, searchTerm, onSearchTermChange }) => {
    const debouncedRefine = React.useCallback(debounce(refine, 350), [refine]);
    const inputRef = React.useRef(null);

    React.useEffect(() => {
      if (inputRef.current && searchTerm === '') {
        inputRef.current.focus();
      }
    }, [searchTerm]);

    function handleSearchTermChange({ target: { value } }) {
      onSearchTermChange(value);
      debouncedRefine(value);
    }

    return (
      <div
        css={css`
          display: flex;
          background-color: white;
          height: 3rem;
          margin-bottom: 2rem;
        `}
      >
        <a
          href="https://www.algolia.com"
          title="Search by Algolia"
          target="_blank"
          rel="nofollow noopener noreferrer"
          css={css`
            ${focus};
          `}
        >
          <AlgoliaIcon
            aria-label="Search by Algolia"
            css={css`
              height: 2rem;
              width: 2rem;
              padding: 0.5rem;
              opacity: 0.9;
              a:focus &, /* inside a focused a */
              &:hover {
                opacity: 1;
              }
            `}
          />
        </a>
        <input
          ref={inputRef}
          name="search"
          aria-label="Search"
          placeholder="Search all drinks..."
          type="text"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          onChange={handleSearchTermChange}
          value={searchTerm}
          css={css`
            border: none;
            padding: 1rem;
            width: 100%;
            /* horizontal margin to account for 3px box-shadow on focus */
            margin-left: 3px;
            margin-right: 3px;
            ${focus};
          `}
        />
        <button
          css={css`
            border: none;
            cursor: pointer;
            color: #eedebf;
            background-color: #6d372a;
            &:hover,
            &:focus {
              color: #6d372a;
              background-color: #eedebf;
            }
            ${focus};
          `}
          type="button"
          onClick={() => onSearchTermChange('')}
        >
          <VisuallyHidden>Clear</VisuallyHidden>
          <MdClear aria-hidden size={32} />
        </button>
      </div>
    );
  },
);

function NoSearchTerm() {
  return (
    <section
      css={css`
        text-align: center;
      `}
    >
      <MdArrowUpward
        aria-label="Arrow Pointing Up"
        css={css`
          color: #d09e45;
          height: 20vh;
          width: 20vh;
          margin: 10vh 0;
        `}
      />
      <p
        css={css`
          color: #eeeeee;
          ${mq.md} {
            font-size: 1.25rem;
          }
        `}
      >
        Search all drinks by ingredient or description!
      </p>
    </section>
  );
}

function Search({ searchTerm, setSearchTerm, drinks }) {
  const searchClient = algoliasearch(appId, searchKey, {
    _useRequestCache: true,
  });

  return (
    <InstantSearch indexName={indexName} searchClient={searchClient}>
      <SearchBox searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      {searchTerm ? <Hits drinks={drinks} /> : <NoSearchTerm />}
    </InstantSearch>
  );
}

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
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
};

export default Search;
