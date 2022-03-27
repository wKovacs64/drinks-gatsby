function FeedbackForm() {
  return (
    <form
      data-netlify="true"
      data-netlify-honeypot="terminator"
      action="/feedback-sent/"
      name="drinks-feedback"
      method="post"
      className="grid grid-cols-2 gap-8 text-black"
    >
      <input type="hidden" name="form-name" value="drinks-feedback" />
      <div hidden>
        <input
          type="text"
          name="terminator"
          aria-label="Are you the Terminator?"
        />
      </div>
      <input
        required
        type="text"
        name="name"
        placeholder="Name"
        aria-label="Name"
        className="col-span-2 h-16 border-2 border-solid border-zinc-400 p-4 transition-shadow ease-default placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring sm:col-span-1"
      />
      <input
        required
        type="email"
        name="email"
        placeholder="Email"
        aria-label="Email"
        className="col-span-2 h-16 border-2 border-solid border-zinc-400 p-4 transition-shadow ease-default placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring sm:col-span-1"
      />
      <textarea
        required
        name="message"
        placeholder="What's up?"
        aria-label="Message"
        rows={
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(min-width: 1024px)').matches
            ? 10
            : 5
        }
        className="col-span-2 border-2 border-solid border-zinc-400 p-4 transition-shadow ease-default placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring"
      />
      <button
        type="submit"
        className="col-span-2 h-16 border border-solid border-transparent bg-maroon uppercase tracking-widest text-cream transition ease-default hover:border-current hover:bg-cream hover:text-maroon focus:border-current focus:bg-cream focus:text-maroon focus-visible:outline-none focus-visible:ring lg:text-xl"
      >
        Send
      </button>
    </form>
  );
}

function FeedbackFormSkeleton(props) {
  return (
    <form
      data-netlify="true"
      data-netlify-honeypot="terminator"
      action="/feedback-sent/"
      name="drinks-feedback"
      {...props}
    >
      <input type="text" name="name" />
      <input type="email" name="email" />
      <textarea name="message" />
    </form>
  );
}

export { FeedbackFormSkeleton };
export default FeedbackForm;
