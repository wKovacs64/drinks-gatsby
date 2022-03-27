import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import VisuallyHidden from '@reach/visually-hidden';
import { MdSearch } from 'react-icons/md';

export default function Header({ siteTitle }) {
  return (
    <header className="flex flex-col items-center bg-[#111111] p-4 text-stone-300 md:p-8">
      <section className="flex w-full flex-wrap items-center justify-between sm:w-[26rem] lg:w-full lg:max-w-[60rem] xl:max-w-[80rem]">
        {/* TODO: change to h2 or something, move h1 to interesting page content */}
        <h1 className="text-3xl font-light">
          <HeaderLink to="/">{siteTitle}</HeaderLink>
        </h1>
        <HeaderLink to="/search/">
          <VisuallyHidden>Search</VisuallyHidden>
          <MdSearch aria-hidden size={32} />
        </HeaderLink>
      </section>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

function HeaderLink(props) {
  return (
    <Link
      {...props}
      className="transition-shadow ease-default hover:text-zinc-100 focus:text-zinc-100 focus-visible:outline-none focus-visible:ring"
    />
  );
}
