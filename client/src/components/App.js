import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../action";
import HomePage from "./HomePage/HomePage";
import LoginSignupPage from "./LoginSignupPage/LoginSignupPage";
import BookDetailPage from "./BookDetailPage/BookDetailPage";

class App extends React.Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginSignupPage} />
        <Route path="/book/id/:id" component={BookDetailPage} />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
