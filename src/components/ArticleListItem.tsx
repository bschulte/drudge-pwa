import * as React from "react";

import { Link } from "./core";

interface IArticleListItemProps {
  text: string;
  url: string;
}

export function ArticleListItem(props: IArticleListItemProps) {
  const { text, url } = props;
  return (
    <li className="border-t-2 p-2 p-t-4 p-b-4 font-mono">
      <Link href={url}>{text}</Link>
    </li>
  );
}
