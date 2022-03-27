import PropTypes from 'prop-types';
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image';
import clsx from 'clsx';

function DrinkSummary({ className, drink, stacked }) {
  return (
    <section className={clsx('flex h-full flex-col bg-gray-100', className)}>
      <figure className={clsx('m-0 flex-1', !drink.image && 'bg-stone-900')}>
        {drink.image ? (
          <GatsbyImage image={drink.image.gatsbyImageData} alt={drink.title} />
        ) : (
          <StaticImage
            src="../images/icon.png"
            quality={80}
            layout="fullWidth"
            alt={drink.title}
          />
        )}
      </figure>
      <div className="flex flex-1">
        <div
          className={clsx(
            'flex flex-1 flex-col',
            stacked ? 'px-8 pt-8' : 'p-8',
          )}
        >
          <h2
            className={clsx(
              'text-2xl uppercase tracking-widest',
              stacked && 'xl:text-4xl',
            )}
          >
            {drink.title}
          </h2>
          <ul
            className={clsx(
              'my-8 flex-1 list-outside list-disc pl-8 text-xl leading-normal',
              stacked && 'xl:text-2xl xl:leading-normal',
            )}
          >
            {drink.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <div className={clsx('text-right', stacked && 'text-xl')}>
            {drink.calories ? <span>{drink.calories} cal</span> : ''}
          </div>
        </div>
      </div>
    </section>
  );
}

DrinkSummary.propTypes = {
  className: PropTypes.string,
  drink: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    image: PropTypes.shape({
      gatsbyImageData: PropTypes.shape(),
    }),
    ingredients: PropTypes.arrayOf(PropTypes.string),
    calories: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  stacked: PropTypes.bool,
};

DrinkSummary.defaultProps = {
  className: '',
  stacked: false,
};

export default DrinkSummary;
