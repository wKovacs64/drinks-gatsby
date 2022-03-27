import PropTypes from 'prop-types';
import clsx from 'clsx';

function Tag({ children, className }) {
  return (
    <div className={clsx('min-w-[4rem] text-center lowercase', className)}>
      {children}
    </div>
  );
}

Tag.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};

Tag.defaultProps = {
  children: '',
  className: '',
};

export default Tag;
