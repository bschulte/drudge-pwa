import React, { Component } from "react";
import axios, { AxiosResponse } from "axios";
import {
  PullToRefresh,
  RefreshContent,
  ReleaseContent,
  PullDownContent
} from "react-js-pull-to-refresh";

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
    await this.handleRefresh();
  };

  handleRefresh = async () => {
    return new Promise(async (resolve, reject) => {
      let response: AxiosResponse;
      this.setState({ articles: [] });
      try {
        response = await axios.get(
          "https://proxy.cromox.org/https://drudgereport.com",
          {
            headers: {
              "x-requested-with": "test-drudge.com"
            }
          }
        );
      } catch (err) {
        console.log("Err:", JSON.stringify(err));
        reject();
      }

      const linkData = parsePage(response.data);
      this.setState({ articles: linkData });

      resolve();
    });
  };

  render() {
    const { articles } = this.state;
    if (articles.length === 0) {
      return "Loading...";
    }

    return (
      <PullToRefresh
        onRefresh={this.handleRefresh}
        pullDownContent={<div style={{ height: 100 }} />}
        releaseContent={<ReleaseContent />}
        refreshContent={<RefreshContent />}
        pullDownThreshold={window.innerHeight / 4}
        triggerHeight={500}
      >
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
      </PullToRefresh>
    );
  }
}

export default App;
