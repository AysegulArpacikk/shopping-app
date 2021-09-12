import React, { Component } from "react";
import { connect } from "react-redux";
import {
  filterProducts,
  sortProducts,
  filterProductsByMark,
  filterProductsByName,
  fetchProducts,
  filterProductsByPriceOrTitle
} from "../actions/productActions";
import { fetchColors, changeColor } from "../actions/colorActions";
import { fetchMarks, changeMark } from "../actions/markAction";
import PropTypes from "prop-types";
import "../css/filter.css";

class Filter extends Component {
  state = {
    isColorClicked: false,
    isMarkClicked: false,
    isSelectSort: false,
    colorCount: [],
    markCount: [],
    markItems: [],
    colorItems: [],
    sortData: [
      {
        id: 1,
        name: "En Düşük Fiyat",
        value: "lowestprice",
        active: false
      },
      {
        id: 2,
        name: "En Yüksek Fiyat",
        value: "highestprice",
        active: false
      },
      {
        id: 3,
        name: "En Yeniler (A-Z)",
        value: "theNewOneAtoZ",
        active: false
      },
      {
        id: 4,
        name: "En Yeniler (Z-A)",
        value: "theNewOneZtoA",
        active: false
      },
    ],
    colors: [
      {
        id: 1,
        name: "Beyaz",
        active: false
      },
      {
        id: 2,
        name: "Lacivert",
        active: false
      },
      {
        id: 3,
        name: "Sarı",
        active: false
      },
      {
        id: 4,
        name: "Siyah",
        active: false
      }
    ],
    marks: [
      {
        id: 1,
        name: "Samsung",
        active: false
      },
      {
        id: 2,
        name: "Nokia",
        active: false
      },
      {
        id: 3,
        name: "Apple",
        active: false
      },
      {
        id: 4,
        name: "LG",
        active: false
      },
      {
        id: 5,
        name: "Huawei",
        active: false
      },
      {
        id: 6,
        name: "Xiaomi",
        active: false
      },
      {
        id: 7,
        name: "General Mobile",
        active: false
      }
    ]
  };

  componentDidMount() {
    this.props.fetchColors();
    this.props.fetchMarks();
    // this.state.colors.map((color) => {
    //   var colorCount = this.props.filteredProducts.filter(e => e.color === color.name).length
    //   this.state.colorCount.push(colorCount)
    //   this.setState({colorCount: colorCount});
    // })
    // console.log("COLOR COUNT = ", this.state.colorCount)

  }

  selectColor = (event) => {
    this.props.changeColor(event.currentTarget.innerText);
    this.props.filterProducts(
      this.props.products,
      event.currentTarget.innerText
    ); 
    this.setState({ isColorClicked: !this.state.isColorClicked });
  };

  selectMark = (event) => {
    this.props.changeMark(event.currentTarget.innerText);
    this.props.filterProductsByMark(
      this.props.products,
      event.currentTarget.innerText
    );
  }

  selectSort = (event, sortItem) => {
    this.props.filterProductsByPriceOrTitle(event.target.innerText);
    this.props.sortProducts(
      this.props.filteredProducts,
      sortItem.value
    );
    if(event.target.innerText === sortItem.name) {
      this.setState({isSelectSort: true})
    } else {
      this.setState({isSelectSort: false})
    }
  }

  toggleStateOfSort = (sortItem) => {
    let updatedList = this.state.sortData.map(data => {
      if (data.id === sortItem.id && !data.active) {
        data.active = true;
      } else {
        data.active = false;
      }

      return data;
    });

    this.props.sortProducts(
      this.props.filteredProducts,
      sortItem.value
    );

    this.setState({
      contactList: updatedList
    });
  };

  toggleStateOfColor = (color, colorCount) => {
    console.log(this.state.colors)
    let updatedList = this.state.colors.map(data => {
      if (data.id === color.id && !data.active) {
        data.active = true;
      } else {
        data.active = false;
      }

      return data;
    });

    this.props.filterProducts(
      this.props.products,
      color.active ?color.name:"",
      this.state
    ); 

    this.setState({
      contactList: updatedList,
      colorCount: colorCount
    });
  };

  toggleStateOfMark = (mark, markCount) => {
    let updatedList = this.state.marks.map(data => {
      if (data.id === mark.id  && !data.active) {
        data.active = true;
      } else {
        data.active = false;
      }

      return data;
    });

    let items = this.props.filterProductsByMark(
      this.props.products,
      mark.active?mark.name:"",
      this.state
    ); 

    this.setState({
      contactList: updatedList,
      markCount: markCount,
      markItems: items
    });
  };

  render() {

    return (
      <div>
          <div data-test="test-sort">
            <h4>Sıralama</h4>
            {
              this.state.sortData.map((sortItem) => {
                let classNames = [];
                if (sortItem.active) {
                  classNames.push("active");
                }
                return(
                  <p
                  key={sortItem.id}
                  className={classNames.join(" ")}
                  value={this.props.sort}
                  onClick={() => {
                    this.toggleStateOfSort(sortItem)
                  }}
                >
                  {sortItem.name}
                </p>
                
                )
              }
              )
            }
          </div>
        
           <div data-test="test-color">
              <h4>Renk</h4>
              {
                this.state.colors.map((color) => {
                  var colorCount = this.props.filteredProducts.filter(e => e.color === color.name).length
                  let classNames = [];
                  if (color.active) {
                    classNames.push("active");
                  }
                  return(
                    <p
                    key={color.id}
                    className={classNames.join(" ")}
                    value={this.props.color}
                    onClick={() => {
                      this.toggleStateOfColor(color, colorCount)
                    }}
                  >
                    {color.name} {colorCount > 0 ? (colorCount) : ""}
                  </p>
                  )
                })
              }
           </div>
          <div data-test="test-mark">
              <h4>Marka</h4>
              {
                this.state.marks.map((mark) => {
                  var markCount = this.props.filteredProducts.filter(e => e.mark === mark.name).length
                  let classNames = [];
                  if (mark.active) {
                    classNames.push("active");
                  }
                  return(
                    <p
                    key={mark.id}
                    className={classNames.join(" ")}
                    value={this.props.mark}
                    onClick={() => {
                      this.toggleStateOfMark(mark, markCount)
                    }}
                  >
                    {mark.name} {markCount > 0 ? (markCount) : ""}
                  </p>
                  )
                })
              }
           </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.products.items,
  filteredProducts: state.products.filteredItems,
  color: state.colorReducer,
  sort: state.products.sort,
  colors: state.colors,
  marks: state.marks,
});

Filter.propTypes = {
  color: PropTypes.string,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  marks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

export default connect(mapStateToProps, {
  filterProducts,
  filterProductsByName,
  filterProductsByMark,
  fetchColors,
  fetchMarks,
  sortProducts,
  changeColor,
  fetchProducts,
  changeMark,
  filterProductsByPriceOrTitle
})(Filter);
