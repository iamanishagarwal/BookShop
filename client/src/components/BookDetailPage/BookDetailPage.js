import React, { Component } from "react";
import axios from "axios";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./BookDetailPage.css";

export default class BookDetailPage extends Component {
  state = {
    id: " ",
    book: {
      id: " ",
      img: "NA",
      title: "No Title Found",
      author: "No Author Found",
      price: 0,
      isbn: "No ISBN Found",
      description: "No Description Found",
      language: "No Edition Language Found",
      publisher: "No Publisher Found",
      publishedDate: "No Published Date Found",
      pageCount: "No Page Count Found"
    },
    quantity: 1,
    isPresentInCart: false
  };

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id !== state.id) {
      return {
        id: props.match.params.id,
        book: state.book,
        quantity: state.quantity
      };
    }
    return null;
  }

  async componentDidMount() {
    if (this.state.book.id !== this.props.match.params.id) this.fetchData();
  }

  async componentDidUpdate() {
    if (this.state.book.id !== this.props.match.params.id) this.fetchData();
  }

  handleIncrement = () => {
    this.setState(state => ({
      quantity: state.quantity + 1
    }));
  };

  handleDecrement = () => {
    if (this.state.quantity !== 1)
      this.setState(state => ({
        quantity: state.quantity - 1
      }));
  };

  handleAddToCart = async () => {
    if (this.state.isPresentInCart === false) {
      let book = this.state.book;
      book.quantity = this.state.quantity;
      const result = await axios.post("/api/user/cart/book", { book });
      console.log(result);
      if (result.data === "Success") this.setState({ isPresentInCart: true });
    } else {
      this.props.history.push("/user/cart");
    }
  };

  fetchData = async () => {
    const result = await axios.get("/api/book/search/id", {
      params: {
        id: this.props.match.params.id
      }
    });
    let price;
    if (result.data.saleInfo.listPrice)
      price = result.data.saleInfo.listPrice.amount;
    else price = result.data.saleInfo.saleability;

    let isbn = "";
    if (result.data.volumeInfo.industryIdentifiers) {
      result.data.volumeInfo.industryIdentifiers.forEach(ele => {
        if (isbn === "") isbn = isbn + ele.type + " : " + ele.identifier;
        else isbn = isbn + ", " + ele.type + " : " + ele.identifier;
      });
    }

    const book = {
      id: result.data.id,
      img:
        result.data.volumeInfo.imageLinks.small ||
        result.data.volumeInfo.imageLinks.thumbnail,
      title: result.data.volumeInfo.title || "No Title Found",
      author: result.data.volumeInfo.authors || "No Author Found",
      price: price,
      isbn: isbn || "No ISBN Found",
      description: result.data.volumeInfo.description || "No Description Found",
      language: result.data.volumeInfo.language || "No Edition Language Found",
      publisher: result.data.volumeInfo.publisher || "No Publisher Found",
      publishedDate:
        result.data.volumeInfo.publishedDate || "No Published Date Found",
      pageCount: result.data.volumeInfo.pageCount || "No Page Count Found"
    };

    const check = await axios.post("/api/user/cart/book/search", {
      id: book.id
    });

    if (check.data === "Success")
      this.setState({ book: book, isPresentInCart: true });
    else this.setState({ book: book, isPresentInCart: false });
  };

  render() {
    return (
      <div>
        <NavigationBar className="navigation-bar" pageName="bookDetail" />
        <div className="book-detail-page">
          <img className="book-img" src={this.state.book.img} alt="Not Found" />
          <div className="book-detail">
            <div className="book-title">{this.state.book.title}</div>
            <div className="book-author">
              Author : {this.state.book.author.toString()}
            </div>
            <div className="book-price">Rs {this.state.book.price}</div>
            <div
              className="book-description"
              dangerouslySetInnerHTML={{ __html: this.state.book.description }}
            ></div>
            <div>
              <span
                className="decrement-book-quantity"
                onClick={this.handleDecrement}
              >
                -
              </span>
              <span className="book-quantity">{this.state.quantity}</span>
              <span
                className="increment-book-quantity"
                onClick={this.handleIncrement}
              >
                +
              </span>
              <span className="add-book button" onClick={this.handleAddToCart}>
                {this.state.isPresentInCart ? "Go to Cart" : "Add to Cart"}
              </span>
            </div>
          </div>
        </div>
        <table className="book-detail-table" cellSpacing="0">
          <tbody>
            <tr>
              <td>Book Title</td>
              <td>{this.state.book.title}</td>
            </tr>
            <tr>
              <td>Author</td>
              <td>{this.state.book.author}</td>
            </tr>
            <tr>
              <td>ISBN</td>
              <td>{this.state.book.isbn}</td>
            </tr>
            <tr>
              <td>Edition Language</td>
              <td>{this.state.book.language.toUpperCase()}</td>
            </tr>
            <tr>
              <td>Page Count</td>
              <td>{this.state.book.pageCount}</td>
            </tr>
            <tr>
              <td>Date Published</td>
              <td>
                {this.state.book.publishedDate +
                  " by " +
                  this.state.book.publisher}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
