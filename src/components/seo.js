import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({
  title: pageTitle,
  description: pageDescription,
  socialImageUrl,
  socialImageAlt,
}) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          imageUrl
          imageAlt
        }
      }
    }
  `);

  const title = pageTitle || siteMetadata.title;
  const description = pageDescription || siteMetadata.description;
  const imageUrl = socialImageUrl || siteMetadata.imageUrl;
  const imageAlt = socialImageAlt || siteMetadata.imageAlt;

  return (
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:alt', content: imageAlt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl },
        { name: 'twitter:image:alt', content: imageAlt },
      ]}
    />
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socialImageUrl: PropTypes.string,
  socialImageAlt: PropTypes.string,
};

SEO.defaultProps = {
  title: '',
  description: '',
  socialImageUrl: '',
  socialImageAlt: '',
};

export default SEO;
