import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from 'react-emotion';
import { IconContext } from 'react-icons';
import { FaSearch, FaSearchMinus } from 'react-icons/fa';
import mq from '../utils/mq';

class Header extends Component {
  state = {
    searchTerm: '',
    showSearch: false,
  };

  clearSearchTerm = () => {
    this.setState({ searchTerm: '' }, () => {
      this.props.onSearchTermChange('');
    });
  };

  toggleSearch = () => {
    this.setState(({ showSearch }) => ({ showSearch: !showSearch }));
    this.clearSearchTerm();
  };

  handleSearchTermChange = ({ target: { value: searchTerm } }) => {
    this.setState(() => ({ searchTerm }));
    this.props.onSearchTermChange(searchTerm);
  };

  handleSearchTermKeydown = ({ keyCode }) => {
    if (keyCode === 27 /* ESC */) {
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
            background-color: #111111;
            padding: 1rem;
            ${mq.md(css`
              padding: 2rem;
            `)};
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          `}
        >
          <h1
            className={css`
              font-weight: 300;
              margin: 0;
              padding: 0.5rem 0;
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
                aria-label="Search"
                type="text"
                placeholder="Search"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={searchTerm}
                onChange={this.handleSearchTermChange}
                onKeyDown={this.handleSearchTermKeydown}
                className={css`
                  color: #f4f4f4;
                  background-color: transparent;
                  border-width: 0 0 1px;
                  padding: ${showSearch ? '0.5rem' : '0'} 0;
                  width: ${showSearch ? '10rem' : '0'};
                  transition: all 0.2s ease-in-out;
                  ${mq.md(css`
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
                  padding: 0.5rem 0;
                  margin-left: ${showSearch ? '0.5rem' : '0'};
                  transition: margin-left 0.2s ease-in-out;
                  transition: color 0.3s ease;

                  &:hover {
                    color: #f4f4f4;
                  }
                `}
                aria-label="Toggle Search"
                type="button"
                onClick={this.toggleSearch}
              >
                {showSearch ? (
                  <FaSearchMinus size={24} />
                ) : (
                  <FaSearch size={24} />
                )}
              </button>
            </div>
          )}
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
