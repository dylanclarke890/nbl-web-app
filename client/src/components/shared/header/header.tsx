import React from "react";
import { Link } from "react-router-dom";

import IHeader from "../../../interfaces/IHeader";

import './header.css';

export default function Header({ headerTitle, returnLinkUrl, linkText }: IHeader) {

  const returnLink = linkText && returnLinkUrl ?
    <Link className="custom-link" to={returnLinkUrl}>{linkText}</Link> :
    null;


  return (
    <>
      <div className="text-center">
        <h3 className="title">{headerTitle}</h3>
      </div>
      <div className="redirect-link">
        {returnLink}
      </div>
    </>
  )
}