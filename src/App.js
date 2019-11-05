import React, {Component} from 'react';
import './App.css';

import {recipes} from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
  state= {
    recipes: recipes,
    url: 'https://www.food2fork.com/api/search?key=3d272798685ca84d1aa93f726ed3dbaf'
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

  componentDidMount(){
    this.getRecipes()
  }

  render() {
    console.log(this.state.recipes[0].image_url)
    return (
      <>
        <RecipeList recipes={this.state.recipes}/>
        <RecipeDetails/>
      </>
    );
  }
}

export default App;
