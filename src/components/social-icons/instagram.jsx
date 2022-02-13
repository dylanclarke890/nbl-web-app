import React from "react";
import { FaInstagram } from "react-icons/fa";
import '../../styles/social-icons.css';

export default function Instagram(){
  const link = "https://www.instagram.com/nbl_bytanya/";
  const onClick = () => {
    window.location.href = link;
  }

  return (
    <FaInstagram onClick={onClick} className="icon" />
  )
}