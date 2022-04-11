import React from "react";

import ISocialIcon from "./ISocialIcon";

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