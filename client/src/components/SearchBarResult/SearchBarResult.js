import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SearchBarResult.css";

export class SearchBarResult extends Component {
  state = {
    showResult: true
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  handleClickOutside = () => {
    this.setState({ showResult: false });
    this.props.unmountMe();
  };

  handleClick = e => {
    // if (this.node.contains(e.target)) {
    //   return;
    // }
    this.handleClickOutside();
  };

  renderResult() {
    const result = this.props.result;
    let displayResult;
    if (result) {
      displayResult = result.map(element => {
        let title, author;
        if (element.title.length > 45)
          title = element.title.substring(0, 40) + "...";
        else title = element.title;
        if (element.author === null) author = "NA";
        else author = element.author;

        return (
          <Link className="link" key={element.id} to={`/book/id/${element.id}`}>
            <div className="search-result">
              <img src={element.img} alt=" " />
              <div className="search-result-content">
                <div className="search-result-title">{title}</div>
                <div className="search-result-author">{author}</div>
              </div>
            </div>
          </Link>
        );
      });
    }
    return displayResult;
  }

  render() {
    if (this.state.showResult)
      return (
        <div
          className="search-bar-result"
          ref={node => (this.node = node)}
          style={this.props.pageName !== "home" ? { top: "72px" } : {}}
        >
          {this.renderResult()}
        </div>
      );
    else return null;
  }
}

export default SearchBarResult;
