import PropTypes from 'prop-types';

function Main({ children, ...props }) {
  return (
    <main
      {...props}
      className="flex-1 py-4 sm:w-[26rem] sm:self-center sm:py-8 lg:w-full lg:max-w-[60rem] xl:max-w-[80rem]"
    >
      {children}
    </main>
  );
}

Main.propTypes = {
  children: PropTypes.node,
};

Main.defaultProps = {
  children: null,
};

export default Main;
