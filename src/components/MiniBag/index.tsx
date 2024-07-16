import React from "react";
import { Link } from "react-router-dom";
import useBag from "../../hooks/useBag";
import { removeFromBag } from "../../util";
import "./MiniBag.scss";

const MiniBag = () => {
  const { bag: bagData, noOfItems, clearBag } = useBag();

  const emptyBagButton = (
    <div>
      <button role="button" onClick={clearBag} className="empty-bag-btn">
        clear all
      </button>
    </div>
  );

  const orderSummary = (
    <>
      <div className="order-summary">
        <p className={`order-summary-value ${!noOfItems && "emptybag"}`}>
          Order value:{" "}
          <span>
            $
            {bagData
              .reduce(
                (total, product) => total + product.price * product.quantity,
                0
              )
              .toFixed(2)}
          </span>
        </p>

        {!!noOfItems && (
          <p className="order-summary-delivery">
            Delivery: <span>FREE</span>
          </p>
        )}
        <p className="order-summary-total">
          Total:{" "}
          <span>
            $
            {bagData
              .reduce(
                (total, product) => total + product.price * product.quantity,
                0
              )
              .toFixed(2)}
          </span>
        </p>

        {!!noOfItems && (
          <>
            <button className="checkout-btn">Checkout</button>
            <button className="shopping-bag-btn">Shopping bag</button>
          </>
        )}
      </div>
    </>
  );

  const emptyText = <p className="empty-text">Your shopping bag is empty</p>;

  const shoppingDetails =
    noOfItems === 0 ? (
      <>
        {emptyText}
        {orderSummary}
      </>
    ) : (
      <div className="bag-items-wrapper">
        <div className="bag-items">
          {bagData.map((product, i) => (
            <div className="bag-item" key={product.id + i}>
              <div className="product-image-wrapper">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
              </div>
              <div className="product-details">
                <div className="product-name-container">
                  <Link to={`/products/${product.id}`} className="product-name">
                    {product.name}
                  </Link>
                  <button
                    className="clear-bag-button"
                    onClick={() => removeFromBag(product.id, product.size)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.229 1.229C6.105 1.352 6 1.577 6 2H5C5 1.423 5.145 0.898 5.521 0.521C5.898 0.145 6.423 0 7 0H9C9.577 0 10.102 0.145 10.479 0.521C10.855 0.898 11 1.423 11 2H10C10 1.577 9.895 1.352 9.771 1.229C9.648 1.105 9.423 1 9 1H7C6.577 1 6.352 1.105 6.229 1.229ZM1 2.5C1 2.36739 1.05268 2.24021 1.14645 2.14645C1.24021 2.05268 1.36739 2 1.5 2H14.5C14.6326 2 14.7598 2.05268 14.8536 2.14645C14.9473 2.24021 15 2.36739 15 2.5C15 2.63261 14.9473 2.75979 14.8536 2.85355C14.7598 2.94732 14.6326 3 14.5 3H1.5C1.36739 3 1.24021 2.94732 1.14645 2.85355C1.05268 2.75979 1 2.63261 1 2.5ZM12 15C12.423 15 12.648 14.895 12.771 14.771C12.895 14.648 13 14.423 13 14V5H14V14C14 14.577 13.855 15.102 13.479 15.479C13.102 15.855 12.577 16 12 16H4C3.423 16 2.898 15.855 2.521 15.479C2.145 15.102 2 14.577 2 14V5H3V14C3 14.423 3.105 14.648 3.229 14.771C3.352 14.895 3.577 15 4 15H12ZM14.5 5H1.5C1.36739 5 1.24021 4.94732 1.14645 4.85355C1.05268 4.75979 1 4.63261 1 4.5C1 4.36739 1.05268 4.24021 1.14645 4.14645C1.24021 4.05268 1.36739 4 1.5 4H14.5C14.6326 4 14.7598 4.05268 14.8536 4.14645C14.9473 4.24021 15 4.36739 15 4.5C15 4.63261 14.9473 4.75979 14.8536 4.85355C14.7598 4.94732 14.6326 5 14.5 5ZM6 11.5V8.5C6 8.36739 6.05268 8.24021 6.14645 8.14645C6.24021 8.05268 6.36739 8 6.5 8C6.63261 8 6.75979 8.05268 6.85355 8.14645C6.94732 8.24021 7 8.36739 7 8.5V11.5C7 11.6326 6.94732 11.7598 6.85355 11.8536C6.75979 11.9473 6.63261 12 6.5 12C6.36739 12 6.24021 11.9473 6.14645 11.8536C6.05268 11.7598 6 11.6326 6 11.5ZM9 8.5V11.5C9 11.6326 9.05268 11.7598 9.14645 11.8536C9.24021 11.9473 9.36739 12 9.5 12C9.63261 12 9.75979 11.9473 9.85355 11.8536C9.94732 11.7598 10 11.6326 10 11.5V8.5C10 8.36739 9.94732 8.24021 9.85355 8.14645C9.75979 8.05268 9.63261 8 9.5 8C9.36739 8 9.24021 8.05268 9.14645 8.14645C9.05268 8.24021 9 8.36739 9 8.5Z"
                        fill="#707070"
                      />
                    </svg>
                  </button>
                </div>
                <p className="product-info">
                  <span className="product-price">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="product-quantity">
                    Qty: {product.quantity}
                  </span>
                  <span className="product-color">Color: {product.color}</span>
                  <span className="product-size">Size: {product.size}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        {emptyBagButton}
        {orderSummary}
      </div>
    );

  return <div className="popover__bag-container">{shoppingDetails}</div>;
};

export default MiniBag;
