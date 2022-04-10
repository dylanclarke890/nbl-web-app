import React from "react"
import { Link } from "react-router-dom"
import CheckmarkSvg from "../../shared/svgs/checkmark-svg"

export default function MessageConfirmation() {
  return (
    <section className="text-center">
      <h1 className="title">Success!</h1>
      <CheckmarkSvg />
      <p className="title">Your message was successfully sent.</p>
      <Link className="custom-link mt-1" to={"/"}>Back to home</Link>
    </section>
  )
}