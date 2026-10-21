import { cn } from "@/lib/utils"

/** Brand monogram: a tiny hand held in a soft ring, fingertips gilded. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-9 w-9 shrink-0", className)} fill="none" aria-hidden>
      <circle cx="24" cy="24" r="23" fill="#FADADD" />
      <g stroke="#3E2C3C" strokeWidth="3.4" strokeLinecap="round">
        <path d="M17 31V22" /><path d="M22 29V16" /><path d="M27 29V17" /><path d="M32 31V22" /><path d="M13 29l-2-6" />
        <path d="M16 31c0 5 3 8 8 8s8-3 8-8" />
      </g>
      <g fill="#E2B04A"><circle cx="17" cy="21" r="2.1" /><circle cx="22" cy="15" r="2.1" /><circle cx="27" cy="16" r="2.1" /><circle cx="32" cy="21" r="2.1" /></g>
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Mark />
      <span className="leading-none">
        <span className="display block text-[1.15rem] font-semibold sm:text-[1.3rem]">Shah Art Studio</span>
        <span className="hand mt-0.5 block text-[.95rem] text-rose-deep">&amp; Academy</span>
      </span>
    </span>
  )
}
