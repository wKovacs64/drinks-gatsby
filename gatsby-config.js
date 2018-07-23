module.exports = {
  siteMetadata: {
    title: 'Drinks',
  },
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
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
