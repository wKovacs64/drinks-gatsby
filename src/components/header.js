import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from 'react-emotion';
import { IconContext } from 'react-icons';
import { MdSearch, MdZoomOut } from 'react-icons/md';
import mq from '../utils/mq';

class Header extends Component {
  state = {
    searchTerm: '',
    showSearch: false,
  };

  searchButton = createRef();

  searchInput = createRef();

  clearSearchTerm = () => {
    this.setState({ searchTerm: '' }, () => {
      this.props.onSearchTermChange('');
    });
  };

  toggleSearch = () => {
    this.setState(
      ({ showSearch }) => ({ showSearch: !showSearch }),
      () => {
        if (this.state.showSearch) {
          this.searchInput.current.focus();
        } else {
          this.searchButton.current.focus();
        }
      },
    );
    this.clearSearchTerm();
  };

  handleSearchTermChange = ({ target: { value: searchTerm } }) => {
    this.setState(() => ({ searchTerm }));
    this.props.onSearchTermChange(searchTerm);
  };

  handleSearchTermKeydown = ({ keyCode }) => {
    if (keyCode === 27 /* ESC */) {
      this.searchInput.current.blur();
      this.toggleSearch();
    }
  };

  render() {
    const { siteTitle, withSearch } = this.props;
    const { searchTerm, showSearch } = this.state;

    return (
      <IconContext.Provider
        value={{
          className: css`
            vertical-align: middle;
          `,
        }}
      >
        <header
          className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #111111;
            padding: 1rem;
            ${mq.md(css`
              padding: 2rem;
            `)};
          `}
        >
          <section
            className={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-wrap: wrap;
              width: 100%;
              ${mq.sm(css`
                width: 26rem;
              `)};
              ${mq.lg(css`
                width: 100%;
                max-width: 60rem;
              `)};
              ${mq.xl(css`
                max-width: 80rem;
              `)};
            `}
          >
            <h1
              className={css`
                font-weight: 300;
                margin: 0;
                padding: 0;
              `}
            >
              <Link
                to="/"
                className={css`
                  color: #cccccc;
                  text-decoration: none;
                  transition: color 0.3s ease;
                  &:hover {
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
                  ref={this.searchInput}
                  value={searchTerm}
                  onChange={this.handleSearchTermChange}
                  onKeyDown={this.handleSearchTermKeydown}
                  className={css`
                    color: #f4f4f4;
                    background-color: transparent;
                    border-width: 0 0 1px;
                    padding: 0 0 0.25rem 0;
                    width: ${showSearch ? '30vw' : '0'};
                    max-width: 8rem;
                    transition: width 0.2s ease-in-out;
                    ${mq.sm(css`
                      width: ${showSearch ? '10rem' : '0'};
                      max-width: unset;
                    `)};
                    ${mq.md(css`
                      padding: 0 0 0.5rem 0;
                      width: ${showSearch ? '12rem' : '0'};
                    `)};
                  `}
                />
                <button
                  className={css`
                    cursor: pointer;
                    color: #cccccc;
                    background-color: transparent;
                    border: none;
                    transition: color 0.3s ease;
                    &:hover {
                      color: #f4f4f4;
                    }
                  `}
                  aria-label="Toggle Search"
                  type="button"
                  ref={this.searchButton}
                  onClick={this.toggleSearch}
                >
                  {showSearch ? (
                    <MdZoomOut size={32} />
                  ) : (
                    <MdSearch size={32} />
                  )}
                </button>
              </div>
            )}
          </section>
        </header>
      </IconContext.Provider>
    );
  }
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
