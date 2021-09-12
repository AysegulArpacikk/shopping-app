import React, { Component } from 'react'
import { connect } from "react-redux";
import { filterProductsByName } from "../actions/productActions";
import { sortProducts } from "../actions/productActions";
import PropTypes from "prop-types";
import "../css/basket.scss";

class TopBar extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        this.handleCategory();
    }

    handleCategory = () => {
        this.setState({
            products: this.props.filterProductsByName(this.props.filterText)
        })
    }

    render() {
        return (
            <div className="flex-container" style={{fontFamily: "sans-serif", fontWeight:"bold"}}>
                {

                    "Apple".toLowerCase().includes(this.props.filterText) ? <h2>iPhone IOS cep telefonu</h2> : 
                    "iPhone".toLowerCase().includes(this.props.filterText) ? <h2>iPhone IOS cep telefonu</h2> : 
                    "Samsung".toLowerCase().includes(this.props.filterText) ? <h2>Samsung cep telefonu</h2> :
                    "Xiaomi".toLowerCase().includes(this.props.filterText) ? <h2>Xiaomi cep telefonu</h2> :
                    "LG".toLowerCase().includes(this.props.filterText) ? <h2>LG cep telefonu</h2> : 
                    "General Mobile".toLowerCase().includes(this.props.filterText) ? <h2>General Mobile cep telefonu</h2> : ""
                    ||
                    "Apple".toUpperCase().includes(this.props.filterText) ? <h2>iPhone IOS cep telefonu</h2> : 
                    "iPhone".toUpperCase().includes(this.props.filterText) ? <h2>iPhone IOS cep telefonu</h2> : 
                    "Samsung".toUpperCase().includes(this.props.filterText) ? <h2>Samsung cep telefonu</h2> :
                    "Xiaomi".toUpperCase().includes(this.props.filterText) ? <h2>Xiaomi cep telefonu</h2> :
                    "LG".toUpperCase().includes(this.props.filterText) ? <h2>LG cep telefonu</h2> : 
                    "General Mobile".toUpperCase().includes(this.props.filterText) ? <h2>General Mobile cep telefonu</h2> : ""
                }
                <div className="hb-row" style={{justifyContent:'space-around'}}>
                    <div className="hb-column" style={{color: "#8686869c", width: "300px"}}>
                        Aranan Kelime: 
                    </div>
                    <div className="hb-column" data-test="test-filter-text">
                        {this.props.filterText}
                    </div>
                    <div className="hb-column" style={{marginLeft: "100px"}}>
                        <div className="hb-basket">
                            <label data-test="test-sort-select">
                                <h4>Sıralama</h4>
                                <select
                                className="hb-basket-button"
                                value={this.props.sort}
                                onChange={(event) => {
                                    this.props.sortProducts(
                                    this.props.filteredProducts,
                                    event.target.value
                                    );
                                }}
                                >
                                <option value="">Select</option>
                                <option value="lowestprice">En Düşük Fiyat</option>
                                <option value="highestprice">En Yüksek Fiyat</option>
                                <option value="theNewOneAtoZ">En Yeniler (A-Z)</option>
                                <option value="theNewOneZtoA">En Yeniler (Z-A)</option>
                                </select>
                            </label>
                            </div>
                        </div>
                </div>
                
            </div>
            
        )
    }
}

const mapStateToProps = (state) => ({
    filterText: state.products.filterText,
    sort: state.products.sort,
    filteredProducts: state.products.filteredItems,
});

TopBar.propTypes = {
    filterText: PropTypes.string,
    sort: PropTypes.string,
    filteredProducts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            color: PropTypes.string,
            mark: PropTypes.string,
            price: PropTypes.number,
        })
    )
  };  

export default connect(mapStateToProps, {filterProductsByName, sortProducts})(TopBar);
