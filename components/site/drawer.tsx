"use client"

import { AnimatePresence, motion } from "motion/react"
import { useEffect } from "react"

/** Bottom sheet on phones, side panel on desktop. */
export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    addEventListener("keydown", k)
    document.documentElement.style.overflow = "hidden"
    return () => { removeEventListener("keydown", k); document.documentElement.style.overflow = "" }
  }, [open, onClose])
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-end bg-plum/50 md:items-stretch md:justify-end" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.aside
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="dialog" aria-label={title}
            className="flex max-h-[92dvh] w-full flex-col overflow-y-auto rounded-t-[32px] bg-cream p-6 md:max-h-none md:w-[480px] md:rounded-none md:rounded-l-[40px] md:p-9"
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-plum/15 md:hidden" />
            <div className="flex items-start justify-between gap-4">
              <h3 className="display t-h2">{title}</h3>
              <button onClick={onClose} aria-label="Close" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blush font-bold transition hover:bg-rose hover:text-white">✕</button>
            </div>
            <div className="mt-6 flex-1 pb-4">{children}</div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
