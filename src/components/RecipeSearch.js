import React, { Component } from 'react';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from '../img/logo2.png';

export default class RecipeSearch extends Component {
  render() {
    const {
      value, 
      handleSubmit, 
      handleChange
    } = this.props;

    return (
      <>
      <div className="search-area">
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-8 my-5 text-center">
            <img src={Logo} alt="logo" style={{height: "80px"}}/>
              <h1 className="text-slanted text-capitalize">
              <strong className="text-warning">MOGU MOGU RECIPE!</strong>
              </h1>
              <form className="mt-4" onSubmit={handleSubmit}>
                <label htmlFor="search">
                  type recipes separated by comma
                </label>
                <div className="input-group">
                  <input 
                    type="text" 
                    name="search" 
                    placeholder="chicken, onion,carrots" 
                    className="form-control"
                    value={value}
                    onChange={handleChange}
                  />
                  <div className="input-group-append">
                    <button 
                      type="submit" 
                      className="btn btn-dark"
                      
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
}
