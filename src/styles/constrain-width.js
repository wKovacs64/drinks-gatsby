import { css } from '@emotion/core';
import mq from '../utils/mq';

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
