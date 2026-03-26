"use client";

import { createContext, useCallback, useContext } from "react";
import { Toaster, toast } from "sonner";

const DEFAULT_DURATION_MS = 2800;

const ToastContext = createContext(null);

/**
 * Sonner toasts — stacked, swipe-dismiss, expand on hover.
 * Use `useSiteToast().showToast(message)` from any client component.
 */
export function ToastProvider({ children }) {
  const showToast = useCallback((message, duration = DEFAULT_DURATION_MS) => {
    toast(message, { duration });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster
        className="bim-sonner"
        theme="dark"
        position="top-center"
        expand
        visibleToasts={5}
        gap={12}
        richColors={false}
        toastOptions={{
          duration: DEFAULT_DURATION_MS,
          classNames: {
            toast: "bim-sonner-toast",
            title: "bim-sonner-toast-text",
            description: "bim-sonner-toast-text",
          },
        }}
      />
    </ToastContext.Provider>
  );
}

export function useSiteToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useSiteToast must be used within ToastProvider");
  }
  return ctx;
}
