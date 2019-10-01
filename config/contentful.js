const host = process.env.CONTENTFUL_HOST;
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error(
    'CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN must be provided.',
  );
}

module.exports = {
  host,
  spaceId,
  accessToken,
};
