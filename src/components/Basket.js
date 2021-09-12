import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import "../css/basket.scss";

class Basket extends Component {
  state = {
    isBasketOpen: false,
    isModalOpen: false,
    basketItem: "",
  };

  handleBasketOpen = () => {
    this.setState({
      isBasketOpen: !this.state.isBasketOpen,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleOpenModal = (item) => {
    this.setState({
      isModalOpen: true,
      basketItem: item,
    });
  };

  removeItemFromCart = (item) => {
    this.props.removeFromCart(this.props.cartItems, item);
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div className="hb-basket">
        <div className="hb-basket-badge">{cartItems.length}</div>
        <button className="hb-basket-button" onClick={this.handleBasketOpen}>
          Sepetim
        </button>
        {cartItems.length > 0 && this.state.isBasketOpen ? (
          <div className="hb-basket-item-container">
            {cartItems.reverse().map((item) => (
              <div key={item.id}>
                <div className="hb-row hb-basket-item">
                  <div className="column" data-test="test-basket-item-image">
                    <img
                      className="hb-basket-image"
                      src={`phones/${item.image}.jpg`}
                    />
                  </div>
                  <div className="column">
                    <div className="row" data-test="test-basket-item-title">
                      {item.title}
                    </div>
                    <div className="hb-row" data-test="test-remove-button">
                      <button
                        className="hb-basket-remove"
                        onClick={(e) => this.handleOpenModal(item)}
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        <ReactModal
          isOpen={this.state.isModalOpen}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <p className="modal-title">Ürünü silmek istediğinize emin misiniz?</p>
          <div style={{ borderBottom: "1px solid gray" }}></div>
          <p className="modal-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially...
          </p>
          <div className="modal-footer-row">
            <button
              className="modal-footer confirm-button"
              onClick={(e) => {
                this.removeItemFromCart(this.state.basketItem);
              }}
            >
              EVET
            </button>
            <button
              className="modal-footer"
              style={{ display: "revert", marginRight: "15px" }}
              onClick={this.handleCloseModal}
            >
              HAYIR
            </button>
          </div>
        </ReactModal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});

Basket.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      color: PropTypes.string,
      mark: PropTypes.string,
      price: PropTypes.number,
    })
  ),
};
export default connect(mapStateToProps, { addToCart, removeFromCart })(Basket);
