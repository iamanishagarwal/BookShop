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
        <div
          className="lds-ring"
          style={
            this.props.pageName !== "home"
              ? { height: "50px" }
              : { height: "70px" }
          }
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }
  };

  renderSearchResult = () => {
    if (this.state.result && this.state.renderSearchResult)
      return (
        <SearchBarResult
          result={this.state.result}
          unmountMe={this.handleSearchBarUnmount}
          pageName={this.props.pageName}
        />
      );
  };

  render() {
    return (
      <>
        <form
          className="search-bar"
          style={this.props.pageName !== "home" ? { flexGrow: 2 } : {}}
        >
          <div
            className="input-field"
            style={
              this.props.pageName !== "home"
                ? { height: "50px" }
                : { height: "70px" }
            }
          >
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
