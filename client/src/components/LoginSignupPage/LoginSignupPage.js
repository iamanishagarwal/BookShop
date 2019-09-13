import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchUser } from "../../action";
import "./LoginSignupPage.css";

class LoginSignupPage extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    signInEmail: "",
    signInPassword: "",
    signInError: "",
    signUpError: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    const res = await axios.post("/api/user/signup", user);
    if (res.data === "Success") this.props.history.push("/");
    else this.setState({ signUpError: res.data });
    this.props.fetchUser();
  };

  handleSignIn = async e => {
    e.preventDefault();
    const user = {
      email: this.state.signInEmail,
      password: this.state.signInPassword
    };
    const res = await axios.post("/api/user/signin", user);
    if (res.data === "Success") this.props.history.push("/");
    else this.setState({ signInError: res.data });
    this.props.fetchUser();
  };

  renderSignInError = () => {
    if (this.state.signInError)
      return <div className="error-message">{this.state.signInError}</div>;
  };

  renderSignUpError = () => {
    if (this.state.signUpError)
      return <div className="error-message">{this.state.signUpError}</div>;
  };

  render() {
    return (
      <div className="login-signup-page">
        <form className="login-form" onSubmit={this.handleSignIn}>
          <div className="form-header">Sign in to BookShop</div>
          <div className="form-icons">
            <a href="/api/auth/google">
              <span className="icon-container">
                <i className="fa fa-google-plus" />
              </span>
            </a>
            <a href="/api/auth/facebook">
              <span className="icon-container">
                <i className="fa fa-facebook-f" />
              </span>
            </a>
          </div>
          <div className="text">or use your email account</div>
          <input
            type="text"
            placeholder="&#xf003;  Email"
            className="input-icon"
            name="email"
            autoComplete="email"
            required
            value={this.state.signInEmail}
            onChange={e => {
              this.setState({ signInEmail: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="&#xf023;  Password"
            className="input-icon"
            autoComplete="password"
            required
            value={this.state.signInPassword}
            onChange={e => {
              this.setState({ signInPassword: e.target.value });
            }}
          />
          {this.renderSignInError()}
          <button className="button">SIGN IN</button>
        </form>

        <form className="signup-form" onSubmit={this.handleSignUp}>
          <div className="form-header">Create Account</div>
          <div className="form-icons">
            <span className="icon-container">
              <i className="fa fa-google-plus" onClick={this.googleOAuth} />
            </span>
            <span className="icon-container">
              <i className="fa fa-facebook-f" />
            </span>
          </div>
          <div className="text">or use your email for registration</div>
          <input
            type="text"
            name="name"
            className="input-icon"
            placeholder="&#xf007;  Name"
            required
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="&#xf003;  Email"
            className="input-icon"
            name="email"
            value={this.state.email}
            required
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="&#xf023;  Password"
            className="input-icon"
            value={this.state.password}
            required
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
          {this.renderSignUpError()}
          <button className="button">SIGN UP</button>
        </form>
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
)(LoginSignupPage);
