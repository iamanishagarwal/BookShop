import React, { Component } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./BillingPage.css";

export default class BillingPage extends Component {
  render() {
    return (
      <div className="billing-page">
        <NavigationBar pageName="BillingPage" />
        <div className="page-title">Billing Information</div>
        <div className="billing-page-container">
          <div className="buyer-info">
            <div className="section-heading">Buyer Info</div>
            <div className="input-section">
              <div className="input-label">Full Name</div>
              <input
                className="input"
                type="text"
                name="name"
                required
                autoComplete
              />
            </div>
            <div className="input-section">
              <div className="input-label">Address 1</div>
              <input
                className="input"
                type="text"
                name="address1"
                required
                autoComplete
              />
            </div>
            <div className="input-section">
              <div className="input-label">Address 2</div>
              <input
                className="input"
                type="text"
                name="address2"
                required
                autoComplete
              />
            </div>
            <div className="input-section">
              <div className="input-label">City</div>
              <input
                className="input"
                type="text"
                name="city"
                required
                autoComplete
              />
            </div>
            <div className="input-multiple-section">
              <div className="input-section">
                <div className="input-label">State</div>
                <input
                  className="input"
                  type="text"
                  name="state"
                  required
                  autoComplete
                />
              </div>
              <div className="input-section">
                <div className="input-label">Zip Code</div>
                <input
                  className="input"
                  type="number"
                  name="zipcode"
                  required
                  autoComplete
                />
              </div>
            </div>
          </div>
          <div className="payment-method">
            <div className="section-heading">Payment Method</div>
            <div className="icon-section">
              <div className="icon-container">
                <i className="fa fa-2x fa-credit-card"></i>
                <span>Credit Card</span>
              </div>
              <div className="icon-container">
                <i className="fa fa-2x fa-paypal"></i>
                <span>Paypal</span>
              </div>
            </div>
            <div className="input-section">
              <div className="input-label">Name On Card</div>
              <input
                className="input"
                type="text"
                name="cardName"
                required
                autoComplete
              />
            </div>
            <div className="input-multiple-section">
              <div className="input-section">
                <div className="input-label">Card Number</div>
                <input
                  className="input"
                  type="number"
                  name="cardNumber"
                  required
                  autoComplete
                />
              </div>
              <div className="input-section">
                <div className="input-label">CVV</div>
                <input
                  className="input"
                  type="number"
                  name="cardCVV"
                  required
                  autoComplete
                />
              </div>
            </div>
            <div className="input-multiple-section">
              <div className="input-section">
                <div className="input-label">Month</div>
                <input
                  className="input"
                  type="number"
                  name="cardMonth"
                  required
                  autoComplete
                />
              </div>
              <div className="input-section">
                <div className="input-label">Year</div>
                <input
                  className="input"
                  type="number"
                  name="cardyear"
                  required
                  autoComplete
                />
              </div>
            </div>
            <div className="button-container">
              <div className="button">Place Order</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
