// WhatsApp booking-confirmation helpers.
// For production, use WhatsApp Business API (Twilio, Wati, Meta Business) for automated messages.

// Business WhatsApp number (country code 91 + number, digits only for wa.me)
export const BUSINESS_WHATSAPP_NUMBER = "919662184977"

export interface BookingData {
  parentName: string
  mobileNumber: string
  kidAge: string | number
  selectedDate: string
  selectedSlot: string
  city: string
  fullAddress: string
}

/**
 * Builds the formatted booking-confirmation message text.
 */
export function buildBookingMessage(b: BookingData): string {
  return [
    "🎉 New Booking Confirmed!",
    `👤 Name: ${b.parentName}`,
    `📞 Phone: ${b.mobileNumber}`,
    `👶 Kid's Age: ${b.kidAge}`,
    `📅 Date: ${b.selectedDate}`,
    `⏰ Slot: ${b.selectedSlot}`,
    `📍 City: ${b.city}`,
    `🏠 Address: ${b.fullAddress}`,
    "💰 Amount Paid: ₹500",
    "View full details in admin panel",
  ].join("\n")
}

/**
 * Constructs the booking message and returns a ready-to-open wa.me link.
 */
export function sendBookingWhatsApp(bookingData: BookingData): string {
  const message = buildBookingMessage(bookingData)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodedMessage}`
}
