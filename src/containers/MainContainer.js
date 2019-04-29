import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  // Do not need to add props here because...where are they coming from?

  constructor() {
    super()
    this.state = {
      allStocks: [],
      myPortfolio: [],
      selectedOption: ''
    }
    // this.addStockToPortfolio = this.addStockToPortfolio.bind(this);
  }

  // Using this in order to call the fetch. Could call this in the contructor,
  // another alternative.

  // Fetching the data here because both components that are imported here need to share
  // and edit same set of data. Aka they both need access to it.


  // STEP 1
  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(results => results.json())
    .then(data => this.setState({
        allStocks: data
    }))
  }

  // STEP 3
  removeStockFromPortfolio = (event) => {
    let stocks = [...this.state.myPortfolio]
    let index = stocks.indexOf(event)
    if (index > -1) {
      stocks.splice(index, 1)
      this.setState({
        myPortfolio: stocks
      })
    }
  }

  // STEP 2
  addStockToPortfolio = (event) => {
    let stocks = [...this.state.myPortfolio]
    let index = stocks.indexOf(event)
    if (index === -1 ) {
      this.setState({
        myPortfolio: [event, ...this.state.myPortfolio]
      })
    }
    console.log(event)
  }

  // STEP 5
  sortAlpha = () => {
    let stocks = this.state.allStocks.sort( (a,b) => (a.name > b.name) ? 1 : -1 )
    this.setState({
      allStocks: [...stocks],
      selectedOption: "Alphabetically"
    })
  }

  // STEP 6

  sortPrice = () => {
    let stocks = this.state.allStocks.sort( (a,b) => (a.price > b.price) ? 1 : -1 )
    this.setState({
      allStocks: [...stocks],
      selectedOption: "Price"
    })
  }

  // STEP 4
  updateRadioButton = (e) => {
    console.log(e)
    e === "Price" ? this.sortPrice() : this.sortAlpha()
  }
  
  // STEP 7
  filterStocks = async (event) => {
    console.log(event)
    await fetch('http://localhost:3000/stocks')
    .then(results => results.json())
    .then(data => this.setState({
        allStocks: data
    }))
    let stocks = this.state.allStocks.filter(stock => stock.type === event)
    await this.setState({
      allStocks: stocks
    })
  }

  render() {
    // console.log(this.state.selectedOption)
    return (
      <div>
        <SearchBar stocks={this.state.allStocks} selectedOption={this.state.selectedOption} updateRadioButton={this.updateRadioButton} filterStocks={this.filterStocks}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.allStocks} handleClick={this.addStockToPortfolio} />

            </div>
            <div className="col-4">
              { 
              <PortfolioContainer stocks={this.state.myPortfolio} handleClick={this.removeStockFromPortfolio} />
              }
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
