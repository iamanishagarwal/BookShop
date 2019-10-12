import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./CartDetailPage.css";

export class CartDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = { books: null };
  }

  componentDidMount = async () => {
    const books = await this.fetchData();
    this.setState({ books });
  };

  fetchData = async () => {
    const result = await axios.get("/api/user/cart");
    console.log(result.data);
    return result.data;
  };

  renderBook = () => {
    let result;
    let books = this.state.books;
    console.log(books);
    result = books.map(book => {
      return (
        <tr key={book.id}>
          <td>
            <Link className="link" to={`/book/id/${book.id}`}>
              <div className="book">
                <img src={book.img} alt=" " />
                <div className="book-content">
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.author}</div>
                </div>
              </div>
            </Link>
          </td>
          <td>
            <i className="fa fa-chevron-down"></i>
            {book.quantity}
            <i className="fa fa-chevron-up"></i>
          </td>
          <td>{book.price}</td>
          <td>{book.quantity * book.price}</td>
        </tr>
      );
    });
    return result;
  };

  renderCartDetail = () => {
    return (
      <div className="cart-page">
        <NavigationBar pageName="CartDetailPage" />
        <div className="page-title">Shopping Cart</div>
        <table className="cart-detail-table" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Items</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.renderBook()}
            <tr>
              <td></td>
              <td></td>
              <td>Total</td>
              <td>257</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  renderContent = () => {
    if (!this.state.books) {
      return (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    } else return this.renderCartDetail();
  };

  render() {
    return <>{this.renderContent()}</>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDetailPage);
