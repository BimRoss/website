"use client";

import { useCallback } from "react";
import { socials } from "../data/socials";
import { EmailSocialLink } from "./EmailSocialLink";
import { useSiteToast } from "./ToastProvider";

const CALL_TOAST_MESSAGE = "email me instead!";

/**
 * Mobile: wide cells (aspect 2:1 → height = half of column width vs square). Desktop (md+): row (5.5rem) + cell padding.
 */
export function StickySocialBar() {
  const { showToast } = useSiteToast();

  const onCallClick = useCallback(() => {
    showToast(CALL_TOAST_MESSAGE);
  }, [showToast]);

  return (
    <div
      className="relative z-[60] w-full shrink-0 border-t border-white/15 bg-gradient-to-b from-black/[0.22] via-black/[0.14] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_-8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md backdrop-saturate-110 supports-[backdrop-filter]:from-black/[0.18] supports-[backdrop-filter]:via-black/[0.1] supports-[backdrop-filter]:to-transparent"
    >
      <nav aria-labelledby="social-heading" className="w-full">
        <h2 id="social-heading" className="sr-only">
          Contact
        </h2>
        <div className="social-dock flex w-full flex-row items-stretch">
        {socials.map(({ label, href, action, icon: Icon }) => {
          const className =
            "social-cell group relative flex aspect-[2/1] min-h-0 min-w-0 items-center justify-center border-r border-white/12 last:border-r-0 focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/50 max-md:aspect-auto max-md:min-h-[3.45rem] md:aspect-auto md:h-[5.5rem] md:max-h-[5.5rem] md:px-3 md:py-2.5";
          const icon = (
            <span className="social-icon-shell" aria-hidden>
              <Icon className="social-icon shrink-0" aria-hidden />
            </span>
          );

          if (action === "call") {
            return (
              <button
                key={label}
                type="button"
                className={className}
                aria-label={label}
                onClick={onCallClick}
              >
                {icon}
              </button>
            );
          }

          if (href?.startsWith("mailto:")) {
            return (
              <EmailSocialLink key={label} href={href} className={className} aria-label={label}>
                {icon}
              </EmailSocialLink>
            );
          }
          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              aria-label={label}
            >
              {icon}
            </a>
          );
        })}
        </div>
      </nav>
    </div>
  );
}
