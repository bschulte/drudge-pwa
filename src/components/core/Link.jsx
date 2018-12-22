import * as React from "react";

export function Link({ children, href }) {
  return (
    <a href={href} className="text-blue">
      {children}
    </a>
  );
}
