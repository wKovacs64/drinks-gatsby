import styled from 'react-emotion';
import { Link } from 'gatsby';

export default styled(Link)`
  padding-bottom: 0.25rem;
  color: currentColor;
  text-decoration: none;
  transition: color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    color: #f4f4f4;
    border-color: #f4f4f4;
    box-shadow: inset 0 -2px 0 0 #f4f4f4;
  }
`;
