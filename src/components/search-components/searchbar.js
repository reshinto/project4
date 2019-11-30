import React from 'react';

export default class SearchBar extends React.Component{


    changeHandler = (event)=>{
        this.props.onChange(event)
    }

    render(){

        return (

          <div>
            <input onChange={this.changeHandler} name="query" type="text" placeholder="Search products..."/>
          </div>
        )
    }
}