import React from "react";
import "./FeatureList.css";

const FeatureList = () => {
  return (
    <div className="feature-list">
      <div className="list-item">
        <i className="fa fa-truck" />
        Quick Delivery
      </div>
      <div className="list-item">
        <i className="fa fa-credit-card" />
        Pay With Easy
      </div>
      <div className="list-item">
        <i className="fa fa-tag" />
        Best Deal
      </div>
      <div className="list-item">
        <i className="fa fa-shield" />
        Secured Payment
      </div>
    </div>
  );
};

export default FeatureList;
