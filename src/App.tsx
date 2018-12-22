import React, { Component } from "react";
import axios, { AxiosResponse } from "axios";

import { ArticleListItem } from "./components/ArticleListItem";
import { parsePage } from "./parsing/parse";

interface IArticle {
  text: string;
  url: string;
}

interface IAppState {
  articles: IArticle[];
}

class App extends Component<object, IAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      articles: []
    };
  }

  componentDidMount = async () => {
    let response: AxiosResponse;
    try {
      response = await axios.get(
        "http://proxy.cromox.org/https://drudgereport.com",
        {
          headers: {
            "x-requested-with": "test-drudge.com"
          }
        }
      );
      console.log("Response:", response);
    } catch (err) {
      console.log("Err:", JSON.stringify(err));
      return;
    }

    const linkData = parsePage(response.data);
    this.setState({ articles: linkData });
  };

  render() {
    const { articles } = this.state;
    if (articles.length === 0) {
      return "Loading...";
    }

    return (
      <div>
        <ul className="list-reset">
          {articles.map((article: IArticle, index: number) => (
            <ArticleListItem
              key={index}
              text={article.text}
              url={article.url}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
