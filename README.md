<div align="center">
  <h1>Drinks 🥃</h1>
  <p>
    <em>Static site and PWA to showcase your favorite cocktails</em>
  </p>
</div>
<hr>

## Technologies used:

- [Gatsby][gatsby] (static site generator for [React][react], powered by
  [GraphQL][graphql])
- [Contentful][contentful] (headless CMS)
- [Algolia][algolia] (search)
- [Netlify][netlify] (hosting, form handling, and continuous deployment)
- [Tailwind CSS][tailwind]
- [CSS Grid Layout][grid]

## Run your own:

1. Create a new app and index at [Algolia][algolia].
1. Create a new space, content management token, and content delivery (access)
   token at [Contentful][contentful].
1. Clone this repo and change to the directory.
1. Use the [`contentful-cli`][contentful-cli] package to run the following:

   ```sh
   contentful space import --management-token <your-management-token> --space-id <your-space-id> --content-file contentful-space.json
   ```

1. Copy the provided `.env.example` file to a new `.env` file and fill in the
   values with your information.

   _Tip: if desired (e.g. for production deployments), change the
   `CONTENTFUL_HOST` value to `cdn.contentful.com` to only see published data._

1. Deploy to [Netlify][netlify]:

   [![Deploy to Netlify][deploy-image]][deploy-link]

   - Configure the environment variables for your site in your Netlify site
     settings so they match the entries in your `.env` file.

   - Create a build hook and note the URL. Then, configure a webhook in your
     Contentful space (under `Settings > Webhooks`) and provide the Netlify
     build hook URL to trigger a rebuild whenever you update content in
     Contentful for silky smooth continuous deployment.

   - Lastly, you may wish to add a notification for the feedback form in the
     form notifications section of your Netlify site settings so you are
     notified when someone submits feedback.

[gatsby]: https://www.gatsbyjs.org/
[react]: https://reactjs.org/
[graphql]: https://graphql.org/
[tailwind]: https://tailwindcss.com/
[grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
[contentful]: https://www.contentful.com/
[contentful-cli]: https://github.com/contentful/contentful-cli
[algolia]: https://www.algolia.com
[netlify]: https://www.netlify.com/
[deploy-image]: https://www.netlify.com/img/deploy/button.svg
[deploy-link]:
  https://app.netlify.com/start/deploy?repository=https://github.com/wKovacs64/drinks
