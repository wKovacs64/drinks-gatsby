import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import kebabCase from 'lodash.kebabcase';
import Notes from './notes';
import Tag from './tag';
import mq from '../utils/mq';

const DrinkDetails = ({ drink, ...props }) => (
  <section
    css={css`
      background-color: #eeeeee;
      padding: 2rem;
      font-size: 1.25rem;
    `}
    {...props}
  >
    {drink.notes && <Notes>{drink.notes.childMarkdownRemark.html}</Notes>}
    {drink.tags && (
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          border-top: 1px dotted #cccccc;
          padding-top: 1rem;
          ${mq.lg} {
            justify-content: flex-end;
          }
        `}
      >
        {drink.tags.map(tag => (
          <Link
            to={`/tags/${kebabCase(tag)}/`}
            key={tag}
            css={css`
              text-decoration: none;
              margin-top: 1rem;
              margin-left: 0;
              margin-right: 1rem;
              ${mq.lg} {
                margin-left: 1rem;
                margin-right: 0;
              }
            `}
          >
            <Tag>{tag}</Tag>
          </Link>
        ))}
      </div>
    )}
  </section>
);

DrinkDetails.propTypes = {
  drink: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.shape({
      fluid: PropTypes.shape(),
    }),
    ingredients: PropTypes.arrayOf(PropTypes.string),
    calories: PropTypes.number,
    notes: PropTypes.shape({
      childMarkdownRemark: PropTypes.shape({
        html: PropTypes.string,
      }),
    }),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default DrinkDetails;
