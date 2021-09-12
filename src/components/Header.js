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
          {/*<div className="hb-column">*/}
              <div className="SearchBoxOld-root">
                {/* <div className="SearchBoxOld-inputContainer">
                    <div className="SearchBoxOld-iconWrapper"> */}
                        <i className="Icon-search SearchBoxOld-searchIcon"></i>
                    {/* </div>
                </div> */}
              </div>
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
          {/*</div>*/}
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
