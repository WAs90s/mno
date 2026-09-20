import type { MouseEvent } from "react";

import mnoSplash from "@/assets/mno-splash.png";

const PARTNER_URL = "/pqr/";

const links = [
  { label: "Inside", href: "#how" },
  { label: "Places", href: "#places" },
  // { label: "Your lane", href: "#your-lane" },
  { label: "PQR", href: PARTNER_URL, external: true },
];

function openPartnerApp(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.location.assign(PARTNER_URL);
}

export function Nav() {
  return (
    <header className="animate-fade-in fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
      <nav className="pop-card mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <a href="#top" className="flex items-center">
          <img
            src={mnoSplash}
            alt="MNO"
            className="h-9 w-auto max-w-[9rem] object-contain sm:h-10 sm:max-w-[10rem]"
          />
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) =>
            l.external ? (
              <a
                key={l.href}
                href={l.href}
                onClick={openPartnerApp}
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ),
          )}
        </div>
        <a
          href="#join"
          className="display rounded-full border-2 border-ink bg-primary px-4 py-2 text-sm shadow-pop-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Get started
        </a>
      </nav>
    </header>
  );
}
