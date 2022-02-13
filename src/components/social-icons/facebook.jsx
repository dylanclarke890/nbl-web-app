import React from "react";
import { FaFacebook } from "react-icons/fa";
import '../../styles/social-icons.css';

export default function Facebook()
{
  const link = "https://www.facebook.com/NBLbyTanya/";
  const onClick = () => {
    window.location.href = link;
  }

  return (
    <FaFacebook onClick={onClick} className="icon" />
  )
}