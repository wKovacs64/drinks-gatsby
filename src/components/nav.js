import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { mq } from '../utils';

function Nav({ children, ...props }) {
  return (
    <nav
      css={css`
        color: #eeeeee;
        padding: 0 1rem;
        margin-bottom: 1rem;
        ${mq.sm} {
          padding: 0;
          margin-bottom: 2rem;
        }
      `}
      {...props}
    >
      <ul
        css={css`
          margin: 0;
          padding: 0;
          list-style-type: none;
        `}
      >
        {children}
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  children: PropTypes.node,
};

Nav.defaultProps = {
  children: null,
};

export default Nav;
