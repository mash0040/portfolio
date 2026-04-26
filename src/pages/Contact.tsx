const contactMethods: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}[] = [
  {
    label: "Email",
    value: "mashaekene1313@gmail.com",
    href: "mailto:mashaekene1313@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/mash0040",
    href: "https://github.com/mash0040",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/mashaak",
    href: "https://linkedin.com/in/mashaak",
    external: true,
  },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl py-20 sm:py-28">
      <header className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
          Contact
        </p>
        <h1
          className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          Get in touch.
        </h1>
        <p className="mt-7 text-base leading-relaxed text-slate-300 sm:text-lg">
          The fastest way to reach me is by email. I'm also on GitHub and
          LinkedIn &mdash; happy to chat about work, collaboration, or
          interesting bugs.
        </p>
      </header>

      <div className="mt-16 grid gap-2 border-t border-slate-800/80 pt-16 sm:mt-20 sm:grid-cols-12 sm:pt-20">
        <div className="sm:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
            <span className="text-slate-400">01</span>
            &nbsp;—&nbsp;
            Channels
          </p>
        </div>
        <div className="sm:col-span-9">
          <ul role="list" className="divide-y divide-slate-800 border-y border-slate-800">
            {contactMethods.map((method) => (
              <li key={method.label}>
                <a
                  href={method.href}
                  {...(method.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-baseline gap-6 py-5 text-base focus-visible:outline-none"
                >
                  <span className="w-24 shrink-0 font-mono text-xs uppercase tracking-widest text-slate-500">
                    {method.label}
                  </span>
                  <span className="break-all font-medium text-white transition-colors group-hover:text-slate-200 group-focus-visible:underline group-focus-visible:underline-offset-4">
                    {method.value}
                    {method.external && (
                      <span className="sr-only"> (opens in new tab)</span>
                    )}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-white"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/resume.pdf"
            download
            className="group mt-10 inline-flex items-center gap-2 rounded-md border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Download resume
            <span
              aria-hidden="true"
              className="text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:text-white"
            >
              ↓
            </span>
          </a>

          <p className="mt-10 font-mono text-xs uppercase tracking-widest text-slate-500">
            I usually reply within a day or two.
          </p>
        </div>
      </div>
    </div>
  );
}
