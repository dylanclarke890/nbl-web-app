import React from 'react';
import { Helmet } from "react-helmet";
import ITitleAndDesc from './ITitleAndDesc';

export default function TitleAndDesc({ title, desc }: ITitleAndDesc) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Helmet>
    </>

  )
}