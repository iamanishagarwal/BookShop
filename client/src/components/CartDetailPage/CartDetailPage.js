import React, { Component } from "react";
import { connect } from "react-redux";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./CartDetailPage.css";

export class CartDetailPage extends Component {
  render() {
    return (
      <div className="cart-page">
        <NavigationBar pageName="CartDetailPage" />
        <div className="page-title">Shopping Cart</div>
        <table className="cart-detail-table" cellPadding="20" cellSpacing="0">
          <thead>
            <tr>
              <th>Items</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Harry Potter</td>
              <td>2</td>
              <td>150</td>
              <td>300</td>
            </tr>
            <tr>
              <td>Stupid World</td>
              <td>1</td>
              <td>68</td>
              <td>68</td>
            </tr>
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
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDetailPage);
