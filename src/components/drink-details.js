import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from 'react-emotion';
import mq from '../utils/mq';

const DrinkDetails = ({ className, drink }) => (
  <section
    className={css`
      background-color: #eeeeee;
      padding: 2rem;
      font-size: 1rem;
      ${mq.lg(css`
        font-size: 1.25rem;
      `)};
      ${className};
    `}
  >
    {drink.notes && (
      <div
        className={css`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-weight: 300;
            margin-top: 0;
          }
          h1,
          h2,
          h3 {
            font-size: 1.25rem;
            ${mq.lg(css`
              font-size: 1.5rem;
            `)};
          }
          h4 {
            font-size: 1rem;
            ${mq.lg(css`
              font-size: 1.25rem;
            `)};
          }
          h5 {
            font-size: 0.875rem;
            ${mq.lg(css`
              font-size: 1rem;
            `)};
          }
          h6 {
            font-size: 0.75rem;
            ${mq.lg(css`
              font-size: 0.875rem;
            `)};
          }
          a {
            color: currentColor;
            text-decoration: none;
            border-bottom: 1px solid #d09e45;
            box-shadow: inset 0 -2px 0 0 #d09e45;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;

            &:hover {
              border-color: #a62304;
              box-shadow: inset 0 -2px 0 0 #a62304;
            }
          }
        `}
        dangerouslySetInnerHTML={{
          __html: drink.notes.childMarkdownRemark.html,
        }}
      />
    )}
    {drink.tags && (
      <div
        className={css`
          display: flex;
          flex-wrap: wrap;
          ${mq.sm(css`
            justify-content: flex-end;
          `)};
          border-top: 1px dotted #cccccc;
          padding-top: 1rem;
        `}
      >
        {drink.tags.map(tag => (
          <Link
            to={`tags/${tag}`}
            key={tag}
            className={css`
              text-decoration: none;
              margin-top: 1rem;
              margin-left: 0;
              margin-right: 1rem;
              ${mq.sm(css`
                margin-left: 1rem;
                margin-right: 0;
              `)};
            `}
          >
            <div
              className={css`
                text-align: center;
                min-width: 4rem;
                padding: 0.5rem;
                border-radius: 0.25rem;
                color: #d09e45;
                background-color: #6d372a;
                transition: color 0.3s ease, background-color 0.3s ease;

                &:hover {
                  color: #6d372a;
                  background-color: #d09e45;
                }
              `}
            >
              <span
                className={css`
                  text-transform: lowercase;
                  font-size: 0.875rem;
                  ${mq.lg(css`
                    font-size: 1rem;
                  `)};
                `}
              >
                {tag}
              </span>
            </div>
          </Link>
        ))}
      </div>
    )}
  </section>
);

DrinkDetails.propTypes = {
  className: PropTypes.string,
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

DrinkDetails.defaultProps = {
  className: '',
};

export default DrinkDetails;
