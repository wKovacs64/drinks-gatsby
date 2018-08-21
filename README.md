<div align="center">
  <h1>Drinks 🥃</h1>
  <p>
    <em>Static site to showcase your favorite cocktails</em>
  </p>
</div>
<hr>

## Run your own:

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

1. Deploy to [Netlify][netlify] (or [other][zeit-now] static content
   [host][surge.sh]):

   [![Deploy to Netlify][deploy-image]][deploy-link]

   If your hosting platform builds the site for you (like Netlify), you'll need
   to configure the environment variables for the build process that match the
   entries in your `.env` file.

   🔥 **BONUS** 🔥

   If your hosting platform supports build event webhooks (like Netlify), create
   one and note the URL. Then, configure a webook in your Contentful space
   (under `Settings > Webhooks`) and provide your hosting platform build hook
   URL to trigger a rebuild whenever you update content in Contentful for silky
   smooth continuous deployment.

[contentful]: https://www.contentful.com/
[contentful-cli]: https://github.com/contentful/contentful-cli
[netlify]: https://www.netlify.com/
[zeit-now]: https://zeit.co/now
[surge.sh]: https://surge.sh/
[deploy-image]: https://www.netlify.com/img/deploy/button.svg
[deploy-link]:
  https://app.netlify.com/start/deploy?repository=https://github.com/wKovacs64/drinks
