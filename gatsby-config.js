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
    buildInfo: {
      commit: buildInfo.commit,
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            "Content-Security-Policy: default-src 'self'; connect-src 'self' https://images.ctfassets.net/ https://*.algolianet.com; img-src data: https:; script-src 'self' 'unsafe-inline' https://*.algolianet.com; style-src 'self' 'unsafe-inline'; worker-src 'self'",
            "Feature-Policy: geolocation 'none'; camera 'none'; microphone 'none'; speaker 'none'; payment 'none'; usb 'none'",
            'Referrer-Policy: no-referrer-when-downgrade',
            'Expect-CT: enforce, max-age=3600',
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
    'gatsby-plugin-emotion',
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
};
