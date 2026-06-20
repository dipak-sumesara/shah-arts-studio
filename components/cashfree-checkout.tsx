"use client"

import { Component, type ReactNode, useCallback, useEffect, useRef, useState } from "react"

// Replace TEST_APP_ID and TEST_SECRET_KEY with your actual Cashfree sandbox credentials
const TEST_APP_ID = "TEST_APP_ID"
const TEST_SECRET_KEY = "TEST_SECRET_KEY"

const CASHFREE_SDK_URL = "https://sdk.cashfree.com/js/v2/cashfree.js"

/* ----------------------------- Types ----------------------------- */

interface PaymentDetails {
  orderId: string
  [key: string]: unknown
}

export interface CashfreeCheckoutProps {
  orderId: string
  paymentSessionId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  onSuccess?: (details: PaymentDetails) => void
  onFailure?: (error: unknown) => void
  onDismiss?: () => void
}

// Minimal shape of the global the CDN script attaches to window
declare global {
  interface Window {
    Cashfree?: (config: { mode: "sandbox" | "production" }) => {
      checkout: (options: {
        paymentSessionId: string
        redirectTarget?: "_self" | "_blank" | "_modal"
      }) => Promise<{
        error?: unknown
        paymentDetails?: PaymentDetails
        redirect?: boolean
      }>
    }
  }
}

/* ----------------------- SDK loader (singleton) ----------------------- */

let sdkPromise: Promise<void> | null = null

function loadCashfreeSdk(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Cashfree SDK can only load in the browser"))
  }
  if (window.Cashfree) return Promise.resolve()
  if (sdkPromise) return sdkPromise

  sdkPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CASHFREE_SDK_URL}"]`)
    if (existing) {
      existing.addEventListener("load", () => resolve())
      existing.addEventListener("error", () => reject(new Error("Failed to load Cashfree SDK")))
      return
    }
    const script = document.createElement("script")
    script.src = CASHFREE_SDK_URL
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      sdkPromise = null
      reject(new Error("Failed to load Cashfree SDK"))
    }
    document.body.appendChild(script)
  })

  return sdkPromise
}

/* --------------------------- Error Boundary --------------------------- */

class CheckoutErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.log("[v0] Cashfree checkout error boundary caught:", error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="w-full rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-center text-sm text-red-700"
        >
          Payment could not be initialized. Please refresh and try again.
        </div>
      )
    }
    return this.props.children
  }
}

/* ----------------------------- Button ----------------------------- */

function CheckoutButton({
  orderId,
  paymentSessionId,
  customerName,
  customerPhone,
  customerEmail,
  onSuccess,
  onFailure,
  onDismiss,
}: CashfreeCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)
  const [sdkError, setSdkError] = useState<string | null>(null)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    loadCashfreeSdk()
      .then(() => mounted.current && setSdkReady(true))
      .catch((err) => mounted.current && setSdkError(err.message))
    return () => {
      mounted.current = false
    }
  }, [])

  const handlePay = useCallback(async () => {
    if (!window.Cashfree) {
      setSdkError("Cashfree SDK is not available")
      return
    }
    setLoading(true)
    console.log("[v0] Starting Cashfree checkout for order:", orderId, {
      customerName,
      customerPhone,
      customerEmail,
    })

    try {
      // 1. Initialize Cashfree in sandbox mode
      const cashfree = window.Cashfree({ mode: "sandbox" })

      // 2. Open the hosted checkout with the session id
      const result = await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_modal",
      })

      // 4. paymentFailure — SDK surfaces an error object on the result
      if (result?.error) {
        console.log("[v0] Cashfree paymentFailure:", result.error)
        onFailure?.(result.error)
        return
      }

      // 3. paymentSuccess
      if (result?.paymentDetails) {
        console.log("[v0] Cashfree paymentSuccess:", result.paymentDetails)
        onSuccess?.({ orderId, ...result.paymentDetails })
        return
      }

      // 5. paymentDismissed — modal closed with no success and no error
      console.log("[v0] Cashfree paymentDismissed")
      onDismiss?.()
    } catch (err) {
      console.log("[v0] Cashfree checkout threw:", err)
      onFailure?.(err)
    } finally {
      if (mounted.current) setLoading(false)
    }
  }, [orderId, paymentSessionId, customerName, customerPhone, customerEmail, onSuccess, onFailure, onDismiss])

  if (sdkError) {
    return (
      <div
        role="alert"
        className="w-full rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-center text-sm text-red-700"
      >
        {sdkError}. Please refresh and try again.
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={loading || !sdkReady}
      aria-busy={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C8A24B] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#b8923f] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
          Processing…
        </>
      ) : !sdkReady ? (
        "Loading…"
      ) : (
        "Pay ₹500"
      )}
    </button>
  )
}

/* --------------------------- Public export --------------------------- */

export default function CashfreeCheckout(props: CashfreeCheckoutProps) {
  return (
    <CheckoutErrorBoundary>
      <CheckoutButton {...props} />
    </CheckoutErrorBoundary>
  )
}
