import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { fetchUser } from "../../action";
import "./NavigationBar.css";

class NavigationBar extends React.Component {
  logOutUser = async () => {
    await axios.get("/api/user/logout");
    this.props.fetchUser();
  };

  renderAuth() {
    if (this.props.auth === false) {
      return (
        <Link className="link" to="/login">
          LogIn
        </Link>
      );
    } else {
      return (
        <div className="link" onClick={this.logOutUser}>
          <i className="fa fa-2x fa-sign-out"></i>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="nav">
        <div className="nav-item nav-header">BOOKSHOP</div>
        <ul className="nav-ul">
          <li className="nav-item nav-ul-li">Books</li>
          <li className="nav-item nav-ul-li">Textbooks</li>
          <li className="nav-item nav-ul-li">Sell</li>
          <li className="nav-item nav-ul-li">Rent</li>
        </ul>
        <div className="nav-item">
          <i className="fa fa-2x fa-cart-plus" />
        </div>
        <div className="nav-item">{this.renderAuth()}</div>
      </div>
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
