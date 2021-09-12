import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { fetchProducts, filterProductsByName } from '../actions/productActions';
import '../css/product.scss';
import PropTypes from "prop-types";
import Pagination from './Pagination';

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hoveredCart:-1,
            products:[],
            totalRecords: '',
            totalPages: '',
            pageLimit: '',
            currentPage: '',
            startIndex: '',
            endIndex: '',
            isAddToBasketButtonVisible: false,
        };
    }

    componentDidMount() {
        this.props.fetchProducts();
        this.props.filterProductsByName();
        this.setState({
            totalRecords: this.props.products.length,
            products: this.props.products
        });
    }

    onChangePage = (data) => {
        this.setState({
            pageLimit: data.pageLimit,
            totalPages: data.totalPages,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex,
        });
    };

    showCartHandler = (i)=>{
            this.setState({hoveredCart: i})
    }
    
    hideCartHandler=()=>{
        this.setState({hoveredCart: -1})   
     }

    render() {
        var {products} = this.state;
        var {pageLimit, startIndex, endIndex} = this.state;
        var rowsPerPage = products;

        rowsPerPage = products.slice(startIndex, endIndex + 1);

        const productItems = this.props.products
            .filter(
                (product) =>
                    !this.props.filterText ||
                    product.title.toLowerCase().search(this.props.filterText.toLowerCase()) >= 0 || 
                    product.title.toUpperCase().search(this.props.filterText.toUpperCase()) >= 0 
            )
            .map((product, i) => (
                <div key={product.id}>
                    <div className="hb-product-container" onMouseLeave={this.hideCartHandler}
                     onMouseEnter={()=>this.showCartHandler(i)}>
                        <img className="product-item"
                             src={`phones/${product.image}.jpg`}
                             style={{width: 250}}
                             alt={product.title}
                        />
                        <p>{product.title}</p>
                        {
                           this.state.hoveredCart !== i ?
                            <div data-test="test-product-info">
                                 <p><strong>Marka: </strong>{product.mark}</p>
                                <p><strong>Renk: </strong>{product.color}</p>

                                <b>{product.price} TL</b>
                                <p>
                                    <del>{product.priceWithoutDiscount} TL</del>
                                </p>
                            </div> : <div className="hide-product-prop"></div>
                        }
                       <a
                            href={`#${product.id}`}
                            data-test="test-add-basket-button"
                            onClick={(e) =>
                                this.props.addToCart(this.props.cartItems, product)
                            }
                        >
                            {this.state.hoveredCart === i
                             && !this.props.cartItems.some(item => item.id === product.id) 
                             ? <button className="hb-add-to-basket-button">Sepete Ekle</button> 
                             : this.props.cartItems.some(item => item.id === product.id) 
                             && this.state.hoveredCart === i
                            ? <button className="hb-dont-add-to-basket-button">Bu ürünü sepete ekleyemezsiniz.</button> : ""}

                        </a>
                    </div>
                </div>
            )).slice(startIndex, endIndex + 1);


        return (
            <div>
                <div className="product-row" data-test="test-product-info">{productItems}</div>
                <Pagination
                    totalRecords={products.length}
                    pageLimit={pageLimit || 12}
                    initialPage={1}
                    pagesToShow={12}
                    onChangePage={this.onChangePage}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products.filteredItems,
    cartItems: state.cart.items,
    filterText: state.products.filterText,
});

Products.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            color: PropTypes.string,
            mark: PropTypes.string,
            price: PropTypes.number,
        })
    ),
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            color: PropTypes.string,
            mark: PropTypes.string,
            price: PropTypes.number,
        })
    ),
    filterText: PropTypes.string,
}

export default connect(mapStateToProps, {
    fetchProducts,
    filterProductsByName,
    addToCart,
})(Products);
