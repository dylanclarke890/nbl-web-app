import React from "react";
import './social-icon.css';

interface ISocialIcon {
  link: string,
  children: React.ReactChild
}

export default function SocialIcon({ link, children }: ISocialIcon) {
  const onClick = () => {
    window.location.href = link;
  }
  return (
    <div onClick={onClick} className='icon'>
      {children}
    </div>
  )
}