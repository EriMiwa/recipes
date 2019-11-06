import React, {Component} from 'react';
import './App.css';

import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
  state= {
    recipes: recipes,
    url: 'https://www.food2fork.com/api/search?key=3d272798685ca84d1aa93f726ed3dbaf',
    base_url: 'https://www.food2fork.com/api/search?key=3d272798685ca84d1aa93f726ed3dbaf',
    detail_id: 35382,
    pageIndex: 1,
    search: '',
    query: '&q='
  }

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      this.setState({
        recipes:jsonData.recipes
      });
    } catch(err) {
      console.error(err);
    }
  }

  // componentDidMount(){
  //   this.getRecipes();
  // }

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
      detail_id: id
    })
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    },
    () => {
      console.log(this.state.search);
    }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {base_url, query, search} = this.state;
    this.setState(()=> {
      return {url:`${base_url}${query}${search}`, search:""}
    },() => {
      this.getRecipes();
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
