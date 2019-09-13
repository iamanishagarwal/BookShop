import React from "react";
import { connect } from "react-redux";
import "./SearchBar.css";
import { searchTerm, searchResult } from "../../action";

class SearchBar extends React.Component {
  render() {
    return (
      <form className="search-bar">
        <input
          type="text"
          placeholder="Search by title, author, or ISBN"
          onChange={e => {
            this.props.searchTerm(e.target.value);
            this.props.searchResult(e.target.value);
          }}
          value={this.props.term}
        />
        <button>Search</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { term: state.searchTerm };
};

export default connect(
  mapStateToProps,
  { searchTerm, searchResult }
)(SearchBar);
