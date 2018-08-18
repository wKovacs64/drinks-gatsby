const contentfulConfig = require('./src/utils/contentful');

module.exports = {
  siteMetadata: {
    title: 'Drinks',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            "Content-Security-Policy: default-src 'self'; img-src data: https:; script-src 'self' 'unsafe-inline'; style-src 'unsafe-inline'; worker-src 'self'",
            "Feature-Policy: geolocation 'none'; camera 'none'; microphone 'none'; speaker 'none'; payment 'none'; usb 'none'",
            'Referrer-Policy: no-referrer-when-downgrade',
            'Expect-CT: enforce, max-age=3600',
          ],
        },
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
        name: 'Drinks',
        short_name: 'Drinks',
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
