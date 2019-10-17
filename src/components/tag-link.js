import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { focus } from '../styles';

const TagLink = styled(Link)`
  text-decoration: none;
  color: #eedebf;
  background-color: #6d372a;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  transition: 0.3s ease;
  transition-property: color, background-color, border-color;
  &:hover,
  &:focus {
    color: #6d372a;
    background-color: #eedebf;
    border-color: currentColor;
  }
  ${focus};
`;

export default TagLink;
