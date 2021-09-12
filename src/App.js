import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Products from './components/Products';
import Filter from './components/Filter';
import store from './store';
import './App.css';
import Header from './components/Header';
import TopBar from './components/TopBar';

class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <div className="app-container">
            <div className="hb-row divider">
                <Header/>
            </div>
            <div>
              <TopBar/>
            </div>  
            <div className="hb-row">
                <div className="hb-column" style={{width: "max-content"}}>
                    <Filter />
                </div>
                <div className="hb-column">
                    <Products />
                </div>
            </div>
      </div>
      </Provider>
    );
  }
}

export default App;
