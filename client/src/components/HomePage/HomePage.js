import React from "react";
import { connect } from "react-redux";
import "./HomePage.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import SearchBar from "../SearchBar/SearchBar";
import FeatureList from "../FeatureList/FeatureList";

class HomePage extends React.Component {
  componentDidUpdate() {
    if (this.props.result) {
    }
  }

  render() {
    return (
      <div className="introduction">
        <NavigationBar className="navigation-bar" />
        <div className="introduction-header">
          Welcome to BookShop
          <br />
          Search over millions of books
        </div>
        <SearchBar className="search-bar" />
        <div className="feature-list-element">
          <FeatureList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { result: state.searchResult };
};

export default connect(mapStateToProps)(HomePage);
