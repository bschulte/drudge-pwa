import React, { Component } from "react";
import axios from "axios";

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
    let response;
    try {
      response = await axios.get(
        "http://192.168.55.18:5000/https://drudgereport.com",
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
        <ul>
          {articles.map((article: IArticle) => (
            <li>
              <a href={article.url}>{article.text}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
