import React from "react";
import MiniBag from "../../components/MiniBag";
import "./BagPage.scss";

const BagPage = () => {
  return (
    <div className="bag__page__container">
      <div className="bag__page__text-container">
        <h3 className="title">Shopping bag</h3>
      </div>
      <MiniBag />
    </div>
  );
};

export default BagPage;
