import React from 'react';

export default class GroceryList extends React.Component{



    render(){
         let items;

        if (this.props.list.length > 0){


            items = this.props.list.map((item,index)=>{return <li key={index}>{item}</li>})

            } else {
                items = "No items yet!"
            }
        return( <div>

        <ul>
           {items}
        </ul>
        </div>
        )
    }

}