"use server"

import emailjs from "@emailjs/browser"

export async function submitFeedback(data: {
  name: string
  email: string
  category: string
  message: string
}) {
  try {
    console.log("[v0] Feedback submission:", {
      to: "datxitofficial@gmail.com",
      from_name: data.name,
      from_email: data.email,
      category: data.category,
      message: data.message,
    })

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
      {
        to_email: "datxitofficial@gmail.com",
        from_name: data.name,
        from_email: data.email,
        category: data.category,
        message: data.message,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
    )

    console.log("[v0] Feedback sent successfully to EmailJS")
    return { success: true }
  } catch (error) {
    console.error("[v0] Feedback submission error:", error)
    throw new Error("Failed to send feedback")
  }
}
