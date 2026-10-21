import type { Metadata } from "next"
import { BookingWizard } from "@/components/book/wizard"

export const metadata: Metadata = { title: "Book a visit", description: "Reserve a hand-casting visit. A refundable ₹500 advance holds your slot." }

export default function Book() {
  return <BookingWizard />
}
