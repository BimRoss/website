export function OpsStrip() {
  return (
    <section
      className="border-t border-white/10 px-5 py-16 md:px-10 md:py-20"
      aria-labelledby="ops-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2
          id="ops-heading"
          className="font-display text-2xl font-normal text-zinc-100 md:text-3xl"
        >
          How we operate
        </h2>
        <p className="mt-5 font-sans text-base leading-relaxed text-zinc-400 md:text-lg">
          From discovery to production, we pair validators and miners with disciplined deployment,
          observability, and hardware chosen for sustained performance—including Azure DC-series class
          hosts where confidential compute is required.
        </p>
      </div>
    </section>
  );
}
