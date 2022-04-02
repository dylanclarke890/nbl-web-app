import React from "react"
import { Link } from "react-router-dom"
import CheckmarkSvg from "../../shared/svgs/checkmark-svg"

export default function MessageConfirmation() {
  return (
    <div className="text-center">
      <p className="title">Success!</p>
      <CheckmarkSvg />
      <p className="title">Your message was successfully sent.</p>
      <Link className="custom-link mt-1" to={"/"}>Back to home</Link>
    </div>
  )
}