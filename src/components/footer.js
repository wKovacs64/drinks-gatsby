import React from 'react';
import styled, { css } from 'react-emotion';
import { FaGithub } from 'react-icons/fa';
import mq from '../utils/mq';

const FooterLink = styled.a`
  padding-bottom: 0.25rem;
  color: currentColor;
  text-decoration: none;
  border-bottom: 1px solid #cccccc;
  transition: color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    color: #f4f4f4;
    border-color: #f4f4f4;
    box-shadow: inset 0 -2px 0 0 #f4f4f4;
  }
`;

const Footer = () => (
  <footer
    className={css`
      display: grid;
      grid-gap: 2rem;
      align-items: center;
      justify-items: center;
      background-color: #111111;
      color: #cccccc;
      padding: 1rem;
      font-size: 1rem;
      ${mq.sm(css`
        font-size: 1.25rem;
        grid-template-columns: repeat(2, minmax(max-content, 1fr));
        justify-items: stretch;
      `)};
      ${mq.md(css`
        padding: 2rem;
      `)};
    `}
  >
    <span>
      Built with{' '}
      <span role="img" aria-label="booze">
        🥃
      </span>{' '}
      using{' '}
      <FooterLink href="https://www.gatsbyjs.org/" rel="noopener noreferrer">
        Gatsby
      </FooterLink>
      ,{' '}
      <FooterLink href="https://www.contentful.com/" rel="noopener noreferrer">
        Contentful
      </FooterLink>
      , and{' '}
      <FooterLink href="https://emotion.sh/" rel="noopener noreferrer">
        Emotion
      </FooterLink>
    </span>
    <a
      className={css`
        color: currentColor;
        text-decoration: none;
        transition: color 0.3s ease;
        &:hover {
          color: #f4f4f4;
        }
        ${mq.sm(css`
          justify-self: end;
        `)};
      `}
      href="https://github.com/wKovacs64/drinks"
      rel="noopener noreferrer"
    >
      <FaGithub aria-label="View source on GitHub" size={32} />
    </a>
  </footer>
);

export default Footer;
