import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { focus } from '../styles';

export default styled(Link)`
  padding-bottom: 0.25rem;
  color: currentColor;
  text-decoration: none;
  border-bottom-style: dotted;
  border-bottom-width: 1px;
  &:hover,
  &:focus {
    border-bottom-style: solid;
  }
  ${focus};
`;
