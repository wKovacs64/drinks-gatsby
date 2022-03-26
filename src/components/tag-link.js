import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import clsx from 'clsx';

function TagLink({ className, ...props }) {
  return (
    <Link
      className={clsx(
        'rounded border border-solid border-transparent bg-maroon text-cream no-underline transition-colors ease-default hover:border-current hover:bg-cream hover:text-maroon focus-visible:border-current focus-visible:bg-cream focus-visible:text-maroon focus-visible:outline-none focus-visible:ring',
        className,
      )}
      {...props}
    />
  );
}

TagLink.propTypes = {
  className: PropTypes.string,
};

TagLink.defaultProps = {
  className: '',
};

export default TagLink;
