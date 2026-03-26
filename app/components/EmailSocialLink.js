"use client";

import { useCallback } from "react";
import { useSiteToast } from "./ToastProvider";

/**
 * mailto: opens the user's default mail client.
 * Also copies the address and shows a short toast (handy when webmail opens or for pasting elsewhere).
 */
export function EmailSocialLink({ href, className, children, "aria-label": ariaLabel }) {
  const { showToast } = useSiteToast();

  const email = href.replace(/^mailto:/i, "").split("?")[0] || "";

  const onClick = useCallback(
    (event) => {
      event.preventDefault();
      if (email) {
        void navigator.clipboard.writeText(email).catch(() => {});
      }
      showToast(`Copied ${email}`);
      // Let the toast paint before mailto opens and steals focus/navigation.
      window.setTimeout(() => {
        window.location.href = href;
      }, 120);
    },
    [email, href, showToast],
  );

  return (
    <a href={href} className={className} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </a>
  );
}
