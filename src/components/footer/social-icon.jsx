import React from "react";
import '../../styles/footer/social-icon.css';

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