"use client";

import { useCallback } from "react";
import { socials } from "../data/socials";
import { EmailSocialLink } from "./EmailSocialLink";
import { useSiteToast } from "./ToastProvider";

const CALL_TOAST_MESSAGE = "yeah right, you have enough info";

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
      className="relative z-[60] w-full shrink-0 border-t border-white/25 bg-gradient-to-b from-white/[0.14] via-white/[0.06] to-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_-8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:from-white/[0.10] supports-[backdrop-filter]:via-white/[0.05] supports-[backdrop-filter]:to-transparent"
    >
      <nav aria-labelledby="social-heading" className="mx-auto w-full max-w-7xl">
        <h2 id="social-heading" className="sr-only">
          Social & contact
        </h2>
        <div
          className="grid w-full"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
        {socials.map(({ label, href, action, icon: Icon }) => {
          const className =
            "group relative flex aspect-square w-full min-w-0 items-center justify-center border-r border-white/25 bg-gradient-to-b from-white/[0.09] to-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md backdrop-saturate-150 transition-[background-color,transform,box-shadow] last:border-r-0 hover:from-white/[0.16] hover:to-white/[0.06] active:scale-[0.98] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/60";
          const icon = (
            <Icon className="size-6 shrink-0 text-white md:size-7" aria-hidden />
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
