import PropTypes from 'prop-types';
import { FaGithub } from 'react-icons/fa';

function Footer({ onFeedbackClick }) {
  return (
    <footer className="flex flex-col items-center bg-[#111111] p-4 text-stone-300 md:p-8">
      <section className="flex w-full flex-wrap items-center justify-between sm:w-[26rem] lg:w-full lg:max-w-[60rem] xl:max-w-[80rem]">
        <button
          type="button"
          onClick={onFeedbackClick}
          className="inline-block whitespace-nowrap border border-solid border-current p-2 transition-shadow ease-default hover:border-zinc-100 hover:text-zinc-100 focus:border-zinc-100 focus:text-zinc-100 focus-visible:outline-none focus-visible:ring md:p-4"
        >
          Send Feedback
        </button>
        <a
          className="transition-shadow ease-default hover:text-zinc-100 focus:text-zinc-100 focus-visible:outline-none focus-visible:ring"
          href="https://github.com/wKovacs64/drinks"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <FaGithub aria-label="View source on GitHub" size={32} />
        </a>
      </section>
    </footer>
  );
}

Footer.propTypes = {
  onFeedbackClick: PropTypes.func,
};

Footer.defaultProps = {
  onFeedbackClick: () => {},
};

export default Footer;
