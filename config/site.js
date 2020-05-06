const title = process.env.SITE_TITLE;
const description = process.env.SITE_DESCRIPTION;
const imageUrl = process.env.SITE_IMAGE_URL;
const imageAlt = process.env.SITE_IMAGE_ALT;
const pwaShortName = process.env.SITE_PWA_SHORT_NAME || title;

if (!title) {
  throw new Error('SITE_TITLE must be provided.');
}

if (!description) {
  throw new Error('SITE_DESCRIPTION must be provided.');
}

if (!imageUrl) {
  throw new Error('SITE_IMAGE_URL must be provided.');
}

if (!imageAlt) {
  throw new Error('SITE_IMAGE_ALT must be provided.');
}

module.exports = {
  title,
  description,
  imageUrl,
  imageAlt,
  pwaShortName,
};
