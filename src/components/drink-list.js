import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Glass from './glass';
import DrinkSummary from './drink-summary';

function DrinkList({ drinks }) {
  return (
    <div className="grid gap-4 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      {drinks.map((drink) => (
        <Link
          aria-label={drink.title}
          to={`/${drink.slug}/`}
          key={drink.slug}
          className="group focus-visible:outline-none"
        >
          <Glass className="h-full transition group-hover:border-orange-800 group-hover:shadow-lg group-hover:shadow-orange-800 group-focus:border-orange-800 group-focus:shadow-lg group-focus:shadow-orange-800 lg:group-hover:-translate-y-2 lg:group-focus:-translate-y-2">
            <DrinkSummary drink={drink} />
          </Glass>
        </Link>
      ))}
    </div>
  );
}

DrinkList.propTypes = {
  drinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      image: PropTypes.shape({
        gatsbyImageData: PropTypes.shape(),
      }),
      ingredients: PropTypes.arrayOf(PropTypes.string),
      calories: PropTypes.number,
      rank: PropTypes.number,
      createdAt: PropTypes.string,
      notes: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          rawMarkdownBody: PropTypes.string,
        }),
      }),
    }),
  ).isRequired,
};

export default DrinkList;
