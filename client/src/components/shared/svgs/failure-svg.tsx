import React from "react";

export default function FailureSvg({ }) {
  return (<div className="failure-wrapper mt-2 mb-2">
    <svg className="failure" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle className="failure__circle" cx="26" cy="26" r="25" fill="none" />
      <path className="failure__check" fill="none" d="M16 16 36 36 M36 16 16 36" />
    </svg>
  </div>);
}
