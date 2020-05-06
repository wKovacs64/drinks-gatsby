/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
const kebabCase = require('lodash/kebabCase');

const drinkPage = path.resolve('./src/templates/drink-page.js');
const tagPage = path.resolve('./src/templates/tag-page.js');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  (
    await graphql(`
      {
        allContentfulDrink {
          edges {
            node {
              slug
            }
          }
        }
      }
    `)
  ).data.allContentfulDrink.edges.forEach(({ node: { slug } }) => {
    createPage({
      path: `${slug}/`,
      component: drinkPage,
      context: { slug },
    });
  });

  (
    await graphql(`
      {
        allContentfulDrink {
          group(field: tags) {
            fieldValue
          }
        }
      }
    `)
  ).data.allContentfulDrink.group.forEach(({ fieldValue: tag }) => {
    createPage({
      path: `/tags/${kebabCase(tag)}/`,
      component: tagPage,
      context: { tag },
    });
  });
};
