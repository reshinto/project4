import React from 'react';

export default class Results extends React.Component{

    clickHandler(event){
            console.log(event.target)
            this.props.list(event)
        }

    render(){
        let items;
        let category;

        if (this.props.category!=null){
            category = this.props.category.value

            console.log(category)
            console.log(this.props.allData)

            items = this.props.allData[category]["items"].map((item,index)=>{return <div key={index}><li>{item}</li><button value = {item} onClick = {(event)=>{this.clickHandler(event)}}>Add to list</button></div>})

            console.log(items)

            }




        return( <div>
            <ul>
                {items}

            </ul>
        </div>
        )
    }

}