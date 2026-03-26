"use client";

import { useCallback } from "react";
import { socials } from "../data/socials";
import { EmailSocialLink } from "./EmailSocialLink";
import { useSiteToast } from "./ToastProvider";

const CALL_TOAST_MESSAGE = "email us instead";

/**
 * Square cells: each column shares row width; height matches width (aspect-square).
 */
export function StickySocialBar() {
  const { showToast } = useSiteToast();

  const onCallClick = useCallback(() => {
    showToast(CALL_TOAST_MESSAGE);
  }, [showToast]);

  const n = socials.length;

  return (
    <div
      className="relative z-[60] w-full shrink-0 border-t border-white/15 bg-gradient-to-b from-black/[0.22] via-black/[0.14] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_-8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md backdrop-saturate-110 supports-[backdrop-filter]:from-black/[0.18] supports-[backdrop-filter]:via-black/[0.1] supports-[backdrop-filter]:to-transparent"
    >
      <nav aria-labelledby="social-heading" className="w-full">
        <h2 id="social-heading" className="sr-only">
          Social & contact
        </h2>
        <div
          className="grid w-full"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
        {socials.map(({ label, href, action, icon: Icon }) => {
          const className =
            "social-cell group relative flex aspect-square w-full min-w-0 items-center justify-center border-r border-white/12 transition-[transform,border-color,box-shadow,background-color] duration-300 ease-in-out last:border-r-0 active:scale-[0.98] md:hover:scale-[1.04] md:focus-visible:scale-[1.04] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/50";
          const icon = (
            <span className="social-icon-shell" aria-hidden>
              <Icon className="social-icon shrink-0 text-white" aria-hidden />
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
