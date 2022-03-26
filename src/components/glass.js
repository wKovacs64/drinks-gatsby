import PropTypes from 'prop-types';
import clsx from 'clsx';

function Glass({ children, className }) {
  return (
    <article
      className={clsx(
        'border-y-4 border-double border-burnt-orange text-maroon sm:border-x-4',
        className,
      )}
    >
      {children}
    </article>
  );
}

Glass.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Glass.defaultProps = {
  children: null,
  className: '',
};

export default Glass;
