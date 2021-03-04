import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { css } from '@emotion/react';
import Glass from './glass';
import DrinkSummary from './drink-summary';
import { mq } from '../utils';

function DrinkList({ drinks, ...props }) {
  return (
    <div
      css={css`
        display: grid;
        grid-gap: 1rem;
        ${mq.sm} {
          grid-gap: 2rem;
        }
        ${mq.lg} {
          grid-template-columns: repeat(2, 1fr);
        }
        ${mq.xl} {
          grid-template-columns: repeat(3, 1fr);
        }
      `}
      {...props}
    >
      {drinks.map((drink) => (
        <Link
          aria-label={drink.title}
          to={`/${drink.slug}/`}
          key={drink.slug}
          css={css`
            outline: none;
            text-decoration: none;
          `}
        >
          <Glass
            css={css`
              height: 100%;
              transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
              transition-property: border-color, transform, box-shadow;
              a:focus &, /* inside a focused <a> */
              &:hover {
                border-color: #a62304;
                box-shadow: rgb(166, 35, 4) 0px 8px 16px;
                ${mq.lg} {
                  transform: translateY(-8px);
                }
              }
            `}
          >
            <DrinkSummary drink={drink} />
          </Glass>
        </Link>
      ))}
    </div>
  );
}

DrinkList.propTypes = {
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

export default DrinkList;
