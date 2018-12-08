import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { MdSearch, MdZoomOut } from 'react-icons/md';
import constrainWidth from '../styles/constrain-width';
import mq from '../utils/mq';
import usePrevious from '../utils/usePrevious';
import useSearchFocusHandler from '../utils/useSearchFocusHandler';

function Header({ onSearchTermChange, siteTitle, withSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchInput = useRef(null);
  const searchButton = useRef(null);
  const previousSearchTerm = usePrevious(searchTerm);

  useSearchFocusHandler({
    isShowing: showSearch,
    focusOnShow: searchInput,
    focusOnHide: searchButton,
  });

  useEffect(
    () => {
      if (searchTerm !== previousSearchTerm) {
        onSearchTermChange(searchTerm);
      }
    },
    [previousSearchTerm, searchTerm],
  );

  function resetSearch() {
    setSearchTerm('');
    setShowSearch(false);
  }

  function toggleSearch() {
    if (showSearch) {
      resetSearch();
    } else {
      setShowSearch(true);
    }
  }

  function handleSearchTermChange({ target: { value } }) {
    setSearchTerm(value);
  }

  function handleSearchTermKeydown({ keyCode }) {
    if (keyCode === 27 /* ESC */) {
      resetSearch();
    }
  }

  return (
    <header
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #cccccc;
        background-color: #111111;
        padding: 1rem;
        ${mq.md} {
          padding: 2rem;
        }
      `}
    >
      <section
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
          ${constrainWidth};
        `}
      >
        <h1
          css={css`
            font-weight: 300;
            margin: 0;
            padding: 0;
          `}
        >
          <Link
            to="/"
            css={css`
              color: currentColor;
              text-decoration: none;
              transition: color 0.3s ease;
              &:hover,
              &:focus {
                color: #f4f4f4;
              }
            `}
          >
            {siteTitle}
          </Link>
        </h1>
        {withSearch && (
          <div>
            <input
              id="search-input"
              name="searchInput"
              aria-label="Search Term"
              type="text"
              placeholder="Search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              disabled={!showSearch}
              ref={searchInput}
              value={searchTerm}
              onChange={handleSearchTermChange}
              onKeyDown={handleSearchTermKeydown}
              css={css`
                color: #f4f4f4;
                background-color: transparent;
                border-width: 0 0 1px;
                padding: 0 0 0.25rem 0;
                width: ${showSearch ? '30vw' : '0'};
                max-width: 8rem;
                transition: width 0.2s ease-in-out;
                ${mq.sm} {
                  width: ${showSearch ? '10rem' : '0'};
                  max-width: unset;
                }
                ${mq.md} {
                  padding: 0 0 0.5rem 0;
                  width: ${showSearch ? '12rem' : '0'};
                }
              `}
            />
            <button
              css={css`
                cursor: pointer;
                color: currentColor;
                background-color: transparent;
                border: none;
                transition: color 0.3s ease;
                &:hover,
                &:focus {
                  color: #f4f4f4;
                }
              `}
              aria-label="Toggle Search"
              type="button"
              ref={searchButton}
              onClick={toggleSearch}
            >
              {showSearch ? <MdZoomOut size={32} /> : <MdSearch size={32} />}
            </button>
          </div>
        )}
      </section>
    </header>
  );
}

Header.propTypes = {
  onSearchTermChange: PropTypes.func,
  siteTitle: PropTypes.string.isRequired,
  withSearch: PropTypes.bool,
};

Header.defaultProps = {
  onSearchTermChange: () => {},
  withSearch: false,
};

export default Header;
