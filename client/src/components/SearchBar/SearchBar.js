import React from "react";
import axios from "axios";
import SearchBarResult from "../SearchBarResult/SearchBarResult";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = {
    term: "",
    result: null,
    renderSearchResult: true,
    showLoader: false
  };

  handleSearchTerm = async e => {
    const term = e.target.value ? e.target.value : " ";
    this.setState({ term: term, showLoader: true });
    if (term) {
      const result = await axios.get("/api/book/search/term", {
        params: { searchTerm: term }
      });
      console.log(result);
      this.setState({ showLoader: false });
      if (result && result.data !== "Error")
        this.setState({
          result: result.data,
          renderSearchResult: true
        });
    }
  };

  handleSearchBarUnmount = () => {
    this.setState({ renderSearchResult: false });
  };

  renderLoader = () => {
    if (this.state.showLoader) {
      return (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }
  };

  renderSearchResult = () => {
    console.log(this.state.result);
    if (this.state.result && this.state.renderSearchResult)
      return (
        <SearchBarResult
          result={this.state.result}
          unmountMe={this.handleSearchBarUnmount}
        />
      );
  };

  render() {
    return (
      <>
        <form className="search-bar">
          <div className="input-field">
            <div className="search-icon">
              <i className="fa fa-search"></i>
            </div>
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={this.handleSearchTerm}
              value={this.state.term}
            />
            {this.renderLoader()}
          </div>
        </form>
        {this.renderSearchResult()}
      </>
    );
  }
}

export default SearchBar;
