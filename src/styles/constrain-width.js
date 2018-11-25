import { css } from 'react-emotion';
import mq from '../utils/mq';

export default css`
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
`;
