import React, { Component } from "react";
import { connect } from "react-redux";
import Basket from "./Basket";
import PropTypes from "prop-types";
import { filterProductsByName } from "../actions/productActions";
import "../css/navbar.css";

class Header extends Component {
  handleChange = (e) => {
    this.props.filterProductsByName(e.target.value);
  };

  render() {
    return (
      <div className="flex-container">
        <div className="hb-row" style={{ justifyContent: "space-around" }}>
          <div className="hb-column hb-logo" data-test="test-logo">
            hepsiburada
          </div>
          <div className="hb-column-2"></div>
          <div className="hb-column input_container">
            <input
              className="hb-filter"
              type="text"
              id="inputText"
              data-test="input-text"
              name="productName"
              placeholder="25 milyondan fazla ürün içerisinde ara..."
              value={this.props.filterText}
              onChange={this.handleChange}
            />
            <img
              src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%23ccc'%3E%3Cpath d='M14.653 13.165l5.039 5.038a1.053 1.053 0 11-1.489 1.489l-5.038-5.038a8.12 8.12 0 111.488-1.489zm-4.086.585A6.014 6.014 0 105.863 2.68a6.014 6.014 0 004.704 11.07z'/%3E%3C/svg%3E"
              className="input_img"
            />
          </div>
          <div className="hb-column" data-test="test-basket">
            <Basket />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filterText: state.products.filterText,
});

Header.propTypes = {
  filterText: PropTypes.string,
};

export default connect(mapStateToProps, { filterProductsByName })(Header);
