import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import { SkipNavContent } from '@reach/skip-nav';
import Layout from '../components/layout';
import MessageIcon from '../components/message-icon';

function FeedbackSent() {
  return (
    <Layout>
      <Helmet
        title="Feedback sent!"
        meta={[{ name: 'description', content: 'Feedback sent!' }]}
      />
      <SkipNavContent />
      <div className="m-4 flex flex-col items-center justify-evenly text-gray-100 md:mx-0 md:mt-8 md:mb-0">
        <p className="max-w-[23ch] text-center text-xl font-normal md:text-2xl md:font-light lg:text-4xl">
          Thanks for the feedback!
        </p>
        <MessageIcon className="my-[10vh] inline h-[20vh] w-[20vh] text-burnt-orange" />
        <Link
          to="/"
          className="border-b border-solid pb-1 transition-shadow ease-default hover:shadow-[inset_0_-2px_0_0] focus-visible:shadow-[inset_0_-2px_0_0] focus-visible:outline-none focus-visible:ring md:text-xl"
        >
          Back to Drinks
        </Link>
      </div>
    </Layout>
  );
}

export default FeedbackSent;
