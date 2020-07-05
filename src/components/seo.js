import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, socialImageUrl, socialImageAlt }) => {
  return (
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: socialImageUrl },
        { property: 'og:image:alt', content: socialImageAlt },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: socialImageUrl },
        { name: 'twitter:image:alt', content: socialImageAlt },
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
