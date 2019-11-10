import React, {Component} from 'react';
import './App.css';

import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

const apiKey = process.env.REACT_APP_API_KEY;
class App extends Component {
  state= {
    recipes: recipes,
    url: 'https://www.food2fork.com/api/search?key=',
    base_url: 'https://www.food2fork.com/api/search?key=',
    details_id: 35382,
    pageIndex: 1,
    search: '',
    query: '&q=',
    error: ''
  }

  async getRecipes() {
    try {
      const data = await fetch(`${this.state.url}${apiKey}`);
      const jsonData = await data.json();
      if(jsonData.recipes.length === 0) {
        this.setState(() => {
          return {error:'sorry, but your search did not return any result :('}
        },()=>{console.log(data.url)})
      } else {
        this.setState(() => {
          return {recipes:jsonData.recipes}
        });
      }
    } catch(err) {
      console.error(err);
    }
  }

  componentDidMount(){
    this.getRecipes();
  }

  displayPage = (index) => {
    switch(index) {
      default:
      case 1:
        return (
          <RecipeList 
            recipes={this.state.recipes} 
            handleDetails={this.handleDetails}
            value={this.state.search}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error={this.state.error}
          />
        );
      case 0:
        return(
          <RecipeDetails 
            id={this.state.details_id} 
            handleIndex={this.handleIndex} 
          />
        );
    }
  }

  handleIndex = index => {
    this.setState({
      pageIndex: index
    })
  }

  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    })
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {base_url, query, search} = this.state;
    this.setState(()=> {
      return {url:`${base_url}${apiKey}${query}${search}`, search:""}
    }, async () => {
      try {
        const data = await fetch(`${this.state.url}`);
        const jsonData = await data.json();
        if(jsonData.recipes.length === 0) {
          this.setState(() => {
            return {error:'sorry, but your search did not return any result :('}
          },()=>{console.log(data.url)})
        } else {
          this.setState(() => {
            return {recipes:jsonData.recipes}
          });
        }
      } catch(err) {
        console.error(err);
      }
    })
  }

  render() {
    return (
      <>
        {this.displayPage(this.state.pageIndex)}
      </>
    );
  }
}

export default App;
