import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
}

type ToastAction =
  | { type: "ADD"; toast: Toast }
  | { type: "REMOVE"; id: string };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case "ADD":
      return { toasts: [...state.toasts.slice(-4), action.toast] };
    case "REMOVE":
      return { toasts: state.toasts.filter((t) => t.id !== action.id) };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface ToastContextType {
  toast: {
    success: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const addToast = useCallback(
    (message: string, type: ToastType, duration = 3000) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      dispatch({ type: "ADD", toast: { id, message, type, duration } });
      setTimeout(() => dispatch({ type: "REMOVE", id }), duration);
    },
    []
  );

  const toast = {
    success: (message: string, duration?: number) =>
      addToast(message, "success", duration),
    error: (message: string, duration?: number) =>
      addToast(message, "error", duration),
    info: (message: string, duration?: number) =>
      addToast(message, "info", duration),
    warning: (message: string, duration?: number) =>
      addToast(message, "warning", duration),
  };

  const icons: Record<ToastType, string> = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️",
  };

  const colors: Record<ToastType, string> = {
    success:
      "bg-[#f0fdf4] border-[#86efac] text-[#166534]",
    error:
      "bg-[#fef2f2] border-[#fca5a5] text-[#991b1b]",
    info:
      "bg-[#eff6ff] border-[#93c5fd] text-[#1e40af]",
    warning:
      "bg-[#fffbeb] border-[#fcd34d] text-[#92400e]",
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast Container */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed right-4 top-20 z-[9999] flex flex-col gap-3 pointer-events-none"
        style={{ minWidth: 280, maxWidth: 360 }}
      >
        {state.toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-sm pointer-events-auto transition-all duration-300 animate-in slide-in-from-right ${colors[t.type]}`}
          >
            <span className="text-lg leading-none mt-0.5 shrink-0">
              {icons[t.type]}
            </span>
            <span className="text-sm font-semibold leading-snug flex-1">
              {t.message}
            </span>
            <button
              type="button"
              onClick={() => dispatch({ type: "REMOVE", id: t.id })}
              className="ml-1 shrink-0 opacity-60 hover:opacity-100 text-xs font-bold"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
