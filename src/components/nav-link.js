import styled from '@emotion/styled';
import { Link } from 'gatsby';

export default styled(Link)`
  padding-bottom: 0.25rem;
  color: currentColor;
  text-decoration: none;
  transition: 0.3s ease;
  transition-property: color, border-color, box-shadow;
  &:hover,
  &:focus {
    color: #f4f4f4;
    border-color: #f4f4f4;
    box-shadow: inset 0 -2px 0 0 #f4f4f4;
  }
`;
