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
      description: "No Description Found"
    }
  };

  fetchData = async () => {
    const result = await axios.get("/api/book/search/id", {
      params: {
        id: this.props.match.params.id
      }
    });
    console.log(result);
    let price;
    if (result.data.saleInfo.listPrice)
      price = result.data.saleInfo.listPrice.amount;
    else price = result.data.saleInfo.saleability;

    const book = {
      id: result.data.id,
      img: result.data.volumeInfo.imageLinks.small,
      title: result.data.volumeInfo.title || "No Title Found",
      author: result.data.volumeInfo.authors || "No Author Found",
      price: price,
      description: result.data.volumeInfo.description || "No Description Found"
    };

    this.setState({ book: book });
  };

  static getDerivedStateFromProps(props, state) {
    console.log(props, state);
    if (props.match.params.id !== state.id) {
      return {
        id: props.match.params.id,
        book: state.book
      };
    }
    return null;
  }

  async componentDidMount() {
    console.log(this.props, this.state);
    if (this.state.book.id !== this.props.match.params.id) this.fetchData();
  }

  async componentDidUpdate() {
    console.log(this.props, this.state);
    if (this.state.book.id !== this.props.match.params.id) this.fetchData();
  }

  render() {
    return (
      <div>
        <NavigationBar className="navigation-bar" pageName="bookDetail" />
        <div className="book-detail-page">
          <img className="book-img" src={this.state.book.img} alt=" " />
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
              <span className="decrement-book-quantity">-</span>
              <span className="book-quantity">1</span>
              <span className="increment-book-quantity">+</span>
              <span className="add-book button">Add to Cart</span>
            </div>
          </div>
        </div>
        <table className="book-detail-table" cellSpacing="0">
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
            <td>{this.state.book.author}</td>
          </tr>
          <tr>
            <td>Edition Language</td>
            <td>{this.state.book.author}</td>
          </tr>
          <tr>
            <td>Book Format</td>
            <td>{this.state.book.author}</td>
          </tr>
          <tr>
            <td>Date Published</td>
            <td>{this.state.book.author}</td>
          </tr>
        </table>
      </div>
    );
  }
}
