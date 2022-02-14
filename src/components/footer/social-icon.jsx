import React from "react";
import './social-icon.css';

export default function SocialIcon({link, children})
{
  const onClick = () => {
    window.location.href = link;
  }
  return (
    <div onClick={onClick} className='icon'>
      {children}
    </div>
  )
}