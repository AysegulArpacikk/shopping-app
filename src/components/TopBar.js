import React, { Component } from 'react'
import { connect } from 'react-redux';
import { filterProductsByName } from '../actions/productActions';
import { sortProducts } from '../actions/productActions';
import PropTypes from 'prop-types';
import '../css/basket.scss';

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
            <div className="flex-container" style={{fontFamily: 'sans-serif', fontWeight: 'bold'}}>

                <div className="hb-row">
                    <div className="hb-column">
                        <div className="hb-row">
                            <h2>iPhone IOS cep telefonu</h2>
                        </div>
                        <div className="hb-row" data-test="test-filter-text">
                            Aranan Kelime: <span style={{color: 'black'}}>{this.props.filterText}</span>
                        </div>

                    </div>
                    <div className="hb-column-2"></div>
                    <div className="hb-column-2"></div>
                    <div className="hb-column-2"></div>
                    <div className="hb-column-2"></div>
                    <div className="hb-column">
                        <div className="hb-basket" style={{marginTop: "10px"}}>
                            <label data-test="test-sort-select">
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
                                    <option value="">Sıralama</option>
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
