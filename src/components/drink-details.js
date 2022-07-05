import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import Notes from './notes';
import TagLink from './tag-link';
import Tag from './tag';

function DrinkDetails({ drink }) {
  return (
    <section className="bg-gray-100 p-8 text-xl leading-tight xl:leading-snug">
      {drink.notes ? (
        <Notes>{drink.notes.childMarkdownRemark.html}</Notes>
      ) : null}
      {drink.tags ? (
        <div className="flex flex-wrap border-t border-dotted border-t-stone-300 pt-4 lg:justify-end">
          {drink.tags.map((tag) => (
            <TagLink
              className="mt-4 mr-4 ml-0 leading-tight lg:ml-4 lg:mr-0"
              aria-label={`Find all drinks containing ${tag}`}
              to={`/tags/${kebabCase(tag)}/`}
              key={tag}
            >
              <Tag className="p-2 text-sm font-normal leading-tight lg:text-base lg:font-light lg:leading-tight">
                {tag}
              </Tag>
            </TagLink>
          ))}
        </div>
      ) : null}
    </section>
  );
}

DrinkDetails.propTypes = {
  drink: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.shape({
      gatsbyImageData: PropTypes.shape(),
    }),
    ingredients: PropTypes.arrayOf(PropTypes.string),
    calories: PropTypes.number,
    notes: PropTypes.shape({
      childMarkdownRemark: PropTypes.shape({
        html: PropTypes.string,
      }),
    }),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default DrinkDetails;
