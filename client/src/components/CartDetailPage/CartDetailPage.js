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

  handleBookQuantity = async (id, quantity) => {
    if (quantity > 0) {
      const result = await axios.patch(`/api/user/cart/book/${id}`, {
        quantity: quantity
      });
      if (result.data === "Success") this.componentDidMount();
    } else {
      this.handleClickOnCross();
    }
  };

  handleClickOnCross = async id => {
    const result = await axios.delete(`/api/user/cart/book/${id}`);
    if (result.data === "Success") this.componentDidMount();
  };

  fetchData = async () => {
    const result = await axios.get("/api/user/cart");
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
            <i
              className="fa fa-chevron-down"
              onClick={() =>
                this.handleBookQuantity(book.id, book.quantity - 1)
              }
            ></i>
            {book.quantity}
            <i
              className="fa fa-chevron-up"
              onClick={() =>
                this.handleBookQuantity(book.id, book.quantity + 1)
              }
            ></i>
          </td>
          <td>{book.price}</td>
          <td>{Math.round(book.quantity * book.price * 100) / 100}</td>
          <td>
            <span
              className="cross-icon"
              onClick={() => this.handleClickOnCross(book.id)}
            >
              x
            </span>
          </td>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderBook()}
            <tr>
              <td></td>
              <td></td>
              <td>Total</td>
              <td>257</td>
              <td></td>
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
