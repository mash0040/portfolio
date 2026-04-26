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
    <div className="mx-auto max-w-6xl py-10 sm:py-14">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
          Get in touch.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
          The fastest way to reach me is by email. I'm also on GitHub and
          LinkedIn &mdash; happy to chat about work, collaboration, or
          interesting bugs.
        </p>
      </header>

      <div className="mt-10 border-t border-slate-800 pt-10 sm:mt-14 sm:pt-14">
        <div className="max-w-2xl">
          <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/60 p-5">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                {...(method.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-baseline gap-3 text-sm focus-visible:outline-none"
              >
                <span className="w-20 shrink-0 text-slate-500">
                  {method.label}
                </span>
                <span className="break-all font-medium text-sky-400 transition-colors group-hover:text-sky-300 group-focus-visible:text-sky-300 group-focus-visible:underline group-focus-visible:underline-offset-4">
                  {method.value}
                  {method.external && (
                    <span className="sr-only"> (opens in new tab)</span>
                  )}
                </span>
              </a>
            ))}
          </div>

          <a
            href="/resume.pdf"
            download
            className="mt-8 inline-flex items-center rounded-md border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Download resume{" "}
            <span aria-hidden="true" className="ml-1">
              -&gt;
            </span>
          </a>

          {/* <div className="mt-8">
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center rounded-md border border-slate-800 px-5 py-2.5 text-sm font-medium text-slate-500"
            >
              Resume &mdash; coming soon
            </span>
            <p className="mt-2 text-xs text-slate-500">
              Available for download shortly.
            </p>
          </div> */}

          <p className="mt-8 text-sm text-slate-500">
            I usually reply within a day or two.
          </p>
        </div>
      </div>
    </div>
  );
}
