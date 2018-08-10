import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { css } from 'react-emotion';
import kebabCase from 'lodash.kebabcase';
import matchSorter from 'match-sorter';
import Layout from '../components/layout';
import Nav from '../components/nav';
import NavLink from '../components/nav-link';
import NavDivider from '../components/nav-divider';
import Tag from '../components/tag';
import mq from '../utils/mq';

class TagsPage extends Component {
  state = {
    searchTerm: '',
  };

  handleSearchTermChange = searchTerm => {
    this.setState(() => ({ searchTerm }));
  };

  render() {
    const {
      data: {
        allContentfulDrink: { group },
      },
    } = this.props;
    const { searchTerm } = this.state;

    const tags = group.map(({ fieldValue }) => fieldValue);
    const filteredTags = matchSorter(tags, searchTerm);

    return (
      <Layout withSearch onSearchTermChange={this.handleSearchTermChange}>
        <Helmet
          title="Drink Tags"
          meta={[{ name: 'description', content: `All drink tags` }]}
        />
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
          {filteredTags.length ? (
            filteredTags.map(tag => (
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
            ))
          ) : (
            <span
              className={css`
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
