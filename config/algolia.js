const appId = process.env.GATSBY_ALGOLIA_APP_ID;
const indexName = process.env.GATSBY_ALGOLIA_INDEX_NAME;
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;
const adminKey = process.env.GATSBY_ALGOLIA_ADMIN_KEY;

if (!appId) {
  throw new Error('GATSBY_ALGOLIA_APP_ID must be provided.');
}

if (!indexName) {
  throw new Error('GATSBY_ALGOLIA_INDEX_NAME must be provided.');
}

if (!searchKey) {
  throw new Error('GATSBY_ALGOLIA_SEARCH_KEY must be provided.');
}

if (!adminKey) {
  throw new Error('ALGOLIA_ADMIN_KEY must be provided.');
}

function flattenNode({ notes, image, ...node }) {
  return {
    ...node,
    notes: notes.childMarkdownRemark.rawMarkdownBody,
    imagePreviewSrc: image.fixed.src,
  };
}

const queries = [
  {
    query: `
      {
        allContentfulDrink {
          nodes {
            objectID: slug
            title
            ingredients
            notes {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            createdAt
            image {
              fixed(height: 80, width: 80) {
                src
              }
            }
          }
        }
      }
    `,
    transformer: ({ data }) => data.allContentfulDrink.nodes.map(flattenNode),
    settings: {
      distinct: true,
    },
  },
];

module.exports = {
  appId,
  indexName,
  searchKey,
  adminKey,
  queries,
  chunkSize: 10000,
};
