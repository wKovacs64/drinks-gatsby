import PropTypes from 'prop-types';
import '../styles/drink-notes.css';

function Notes({ children }) {
  return (
    <div
      className="mb-4 lg:mb-8"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: children,
      }}
      data-drink-notes
    />
  );
}

Notes.propTypes = {
  children: PropTypes.string,
};

Notes.defaultProps = {
  children: '',
};

export default Notes;
