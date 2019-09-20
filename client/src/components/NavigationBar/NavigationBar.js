import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { fetchUser } from "../../action";
import SearchBar from "../SearchBar/SearchBar";
import "./NavigationBar.css";

class NavigationBar extends React.Component {
  logOutUser = async () => {
    await axios.get("/api/user/logout");
    this.props.fetchUser();
  };

  renderNavbar = () => {
    if (this.props.pageName !== "home") {
      return (
        <ul className="nav-ul">
          <li className="nav-item nav-ul-li">Home</li>
          <li className="nav-item nav-ul-li">Books</li>
          <li className="nav-item nav-ul-li">Textbooks</li>
          <li className="nav-item nav-ul-li">Sell</li>
          <li className="nav-item nav-ul-li">Rent</li>
        </ul>
      );
    }
  };

  renderAuth() {
    if (this.props.auth === false) {
      return (
        <Link
          className="link"
          to="/login"
          style={
            this.props.pageName === "home"
              ? { color: "white" }
              : { color: "black" }
          }
        >
          LogIn
        </Link>
      );
    } else {
      return (
        <div onClick={this.logOutUser}>
          <i className="fa fa-2x fa-sign-out"></i>
        </div>
      );
    }
  }

  renderSearchBar = () => {
    if (this.props.pageName === "home") {
      return (
        <ul className="nav-ul">
          <li className="nav-item nav-ul-li">Books</li>
          <li className="nav-item nav-ul-li">Textbooks</li>
          <li className="nav-item nav-ul-li">Sell</li>
          <li className="nav-item nav-ul-li">Rent</li>
        </ul>
      );
    } else {
      return <SearchBar pageName={this.props.pageName} />;
    }
  };

  render() {
    return (
      <>
        <div className="nav">
          <div className="nav-item nav-header">BOOKSHOP</div>
          {this.renderSearchBar()}
          <div className="nav-item">
            <i className="fa fa-2x fa-cart-plus" />
          </div>
          <div className="nav-item">{this.renderAuth()}</div>
        </div>
        {this.renderNavbar()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(NavigationBar);
