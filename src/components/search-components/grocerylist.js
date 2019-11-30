import React from 'react';

export default class GroceryList extends React.Component{



    render(){
         let items;

        if (this.props.list.length > null){


            items = this.props.list.map((item,index)=>{return <li key={index}>{item}</li>})

            }
        return( <div>
        <h1>Your Grocery Items</h1>
        <ul>
           {items}
        </ul>
        </div>
        )
    }

}