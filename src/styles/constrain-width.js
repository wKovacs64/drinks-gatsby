import { css } from '@emotion/react';
import { mq } from '../utils';

export const constrainWidth = css`
  ${mq.sm} {
    width: 26rem;
  }
  ${mq.lg} {
    width: 100%;
    max-width: 60rem;
  }
  ${mq.xl} {
    max-width: 80rem;
  }
`;
