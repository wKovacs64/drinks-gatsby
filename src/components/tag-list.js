import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import kebabCase from 'lodash/kebabCase';
import { mq } from '../utils';
import TagLink from './tag-link';
import Tag from './tag';

function TagList({ tags }) {
  return (
    <div
      css={css`
        display: grid;
        grid-gap: 1rem;
        margin: 0 1rem;
        ${mq.sm} {
          grid-gap: 2rem;
          margin: 0;
        }
        ${mq.lg} {
          grid-gap: 2rem;
          grid-template-columns: repeat(2, 1fr);
        }
        ${mq.xl} {
          grid-template-columns: repeat(3, 1fr);
        }
      `}
    >
      {tags.map((tag) => (
        <TagLink to={`/tags/${kebabCase(tag)}/`} key={tag}>
          <Tag
            css={css`
              font-weight: 300;
              font-size: 1.5rem;
              padding: 1rem;
              ${mq.lg} {
                font-size: 2.25rem;
                padding: 1.5rem;
              }
            `}
          >
            {tag}
          </Tag>
        </TagLink>
      ))}
    </div>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagList;
