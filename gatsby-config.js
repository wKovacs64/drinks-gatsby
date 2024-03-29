require('./config/dotenv');

const algoliaConfig = require('./config/algolia');
const contentfulConfig = require('./config/contentful');
const siteConfig = require('./config/site');
const buildInfo = require('./config/build-info');

module.exports = {
  siteMetadata: {
    title: siteConfig.title,
    description: siteConfig.description,
    // this will be used for the og:image meta tag content value
    imageUrl: siteConfig.imageUrl,
    // this will be used for the og:image:alt meta tag content value
    imageAlt: siteConfig.imageAlt,
    buildInfo: {
      commit: buildInfo.commit,
    },
  },
  jsxRuntime: 'automatic',
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            "Content-Security-Policy: base-uri 'none'; frame-ancestors 'none'; form-action 'self'; default-src 'self'; connect-src 'self' https://images.ctfassets.net/ https://*.algolianet.com https://*.algolia.net; img-src data: https:; object-src 'none'; script-src 'self' 'unsafe-inline' https://*.algolianet.com; style-src 'self' 'unsafe-inline'; worker-src 'self'",
            'Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=(), usb=()',
            'Referrer-Policy: strict-origin-when-cross-origin',
            'Expect-CT: enforce, max-age=3600',
            'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload',
          ],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: algoliaConfig.appId,
        apiKey: algoliaConfig.adminKey,
        indexName: algoliaConfig.indexName,
        queries: algoliaConfig.queries,
        chunkSize: algoliaConfig.chunkSize,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-external-links'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteConfig.title,
        short_name: siteConfig.pwaShortName,
        start_url: '/',
        background_color: '#f4f4f4',
        theme_color: '#137752',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-offline',
  ],
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
};
