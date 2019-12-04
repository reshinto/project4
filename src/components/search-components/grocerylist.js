import React from 'react';
import Select from 'react-select';

export default class GroceryList extends React.Component{


      clickHandler(event){
            console.log(event.target)
            console.log(event.target.value)
            this.props.remove(event)
        }

    render(){
         let items;
         console.log(this.props.list)

        if (this.props.list.length > 0){

            items = this.props.list.map((item,index)=>{
                return (<div><li key={index} style = {{marginTop:10}}>{item.name}<button value = {index} onClick={(event)=>{this.clickHandler(event)}} style = {{marginLeft:5}}>remove</button></li></div>)
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