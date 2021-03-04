import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import VisuallyHidden from '@reach/visually-hidden';
import { MdArrowUpward, MdChevronRight, MdSearch } from 'react-icons/md';
import algoliasearch from 'algoliasearch/lite';
import { assign, createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { appId, indexName, searchKey } from '../../config/algolia';
import { focus } from '../styles';
import { mq } from '../utils';
import DrinkList from './drink-list';
import BrokenGlassIcon from './broken-glass-icon';
import AlgoliaIcon from './algolia-icon';

const searchClient = algoliasearch(appId, searchKey, {
  _useRequestCache: true,
});

const algoliaIndex = searchClient.initIndex(indexName);

const initialContext = {
  searchTerm: '',
  hits: [],
  // error: '',
};

const searchMachine = createMachine(
  {
    id: 'search',
    initial: 'idle',
    context: initialContext,
    states: {
      idle: {
        on: {
          SEARCH: {
            actions: ['setSearchTerm'],
            target: 'searching',
          },
        },
      },
      searching: {
        invoke: {
          id: 'searchDrinks',
          src: 'searchDrinks',
          onDone: {
            actions: ['setHits'],
            target: 'success',
          },
          // onError: {
          //   target: 'failure',
          //   actions: ['setError'],
          // },
        },
        on: {
          RESET: {
            actions: ['reset'],
            target: 'idle',
          },
        },
      },
      success: {
        on: {
          SEARCH: {
            actions: ['setSearchTerm'],
            target: 'searching',
          },
          RESET: {
            actions: ['reset'],
            target: 'idle',
          },
        },
      },
      // failure: {
      //   on: {
      //     SEARCH: {
      //       actions: ['setSearchTerm'],
      //       target: 'searching',
      //     },
      //     RESET: {
      //       actions: ['reset'],
      //       target: 'idle',
      //     },
      //   },
      // },
    },
  },
  {
    actions: {
      reset: assign(initialContext),
      setSearchTerm: assign({ searchTerm: (_, event) => event.data }),
      setHits: assign({ hits: (_, event) => event.data }),
      // setError: assign({ error: (_, event) => event.data.message }),
    },
    services: {
      searchDrinks: async (ctx) => {
        const { searchTerm } = ctx;
        return (await algoliaIndex.search(searchTerm)).hits;
      },
    },
  },
);

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

function Hits({ hits, drinks }) {
  const matchingDrinks = hits.map((hit) =>
    drinks.find((drink) => drink.slug === hit.objectID),
  );
  return <DrinkList drinks={matchingDrinks} />;
}

Hits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape({ objectID: PropTypes.string }))
    .isRequired,
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      image: PropTypes.shape({
        gatsbyImageData: PropTypes.shape(),
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

function SearchForm({ searchInputValue, setSearchInputValue, onSubmit }) {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    function handleEsc({ keyCode }) {
      if (keyCode === 27 /* ESC */) {
        setSearchInputValue('');
      }
    }

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setSearchInputValue]);

  React.useEffect(() => {
    if (inputRef.current && searchInputValue === '') {
      inputRef.current.focus();
    }
  }, [searchInputValue]);

  function handleSearchInputValueChange(event) {
    setSearchInputValue(event.target.value);
  }

  return (
    <form
      css={css`
        display: flex;
        background-color: white;
        height: 3rem;
        margin-bottom: 2rem;
      `}
      onSubmit={onSubmit}
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
        id="searchTerm"
        name="searchTerm"
        aria-label="Search Term"
        placeholder="Search all drinks..."
        type="text"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onChange={handleSearchInputValueChange}
        value={searchInputValue}
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
        title="Search"
        type="submit"
      >
        <VisuallyHidden>Search</VisuallyHidden>
        <MdChevronRight aria-hidden size={32} />
      </button>
    </form>
  );
}

SearchForm.propTypes = {
  searchInputValue: PropTypes.string.isRequired,
  setSearchInputValue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

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

function Searching() {
  return (
    <section
      css={css`
        text-align: center;
      `}
    >
      <MdSearch
        aria-label="Magnifying Glass"
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
        Searching . . .
      </p>
    </section>
  );
}

function SearchResults({ hits, drinks }) {
  if (hits.length) return <Hits hits={hits} drinks={drinks} />;
  return <NoDrinksFound />;
}

SearchResults.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape({ objectID: PropTypes.string }))
    .isRequired,
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      image: PropTypes.shape({
        gatsbyImageData: PropTypes.shape(),
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

function Search({
  searchTerm,
  searchInputValue,
  setSearchInputValue,
  onSubmit,
  drinks,
}) {
  const [current, send] = useMachine(searchMachine);

  React.useEffect(() => {
    if (searchTerm === '') {
      send('RESET');
    } else {
      send({ type: 'SEARCH', data: searchTerm });
    }
  }, [searchTerm, send]);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <React.Fragment>
      <SearchForm
        searchTerm={searchTerm}
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
        onSubmit={handleSubmit}
      />
      {current.matches('idle') && <NoSearchTerm />}
      {current.matches('searching') && <Searching />}
      {current.matches('success') && (
        <SearchResults hits={current.context.hits} drinks={drinks} />
      )}
      {/* {current.matches('failure') && null} */}
    </React.Fragment>
  );
}

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  searchInputValue: PropTypes.string.isRequired,
  setSearchInputValue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      image: PropTypes.shape({
        gatsbyImageData: PropTypes.shape(),
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
