import React from 'react';

export default class GroceryList extends React.Component{


      clickHandler(event){
            console.log(event.target)
            console.log(event.target.value)
            this.props.remove(event)
        }

    render(){
         let items;

        if (this.props.list.length > 0){


            items = this.props.list.map((item,index)=>{
                return (<li key={index}>{item}<button value = {index} onClick={(event)=>{this.clickHandler(event)}}>remove</button></li>)
            })

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