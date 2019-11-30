import React from 'react';
import Grid from '@material-ui/core/Grid';

export default class Results extends React.Component{

    clickHandler(event){
            console.log(event.target)
            this.props.list(event)
        }



    render(){
        let categoryItems;
        let itemItems
        let category;
          console.log('HELLO PROPS')

        console.log(this.props.itemFilter)//array of objects

        if (this.props.category!=null){
            category = this.props.category.value

            console.log(category)
            console.log(this.props.allData)

            categoryItems = this.props.allData[category]["items"].map((item,index)=>{return <div key={index}><li>{item}</li><button value = {item} onClick = {(event)=>{this.clickHandler(event)}}>Add to list</button></div>})



            }

        if (this.props.itemFilter!=null){

            itemItems = this.props.itemFilter.map((item,index)=>{
                return (<div key={index}>
                <li>{item.value}</li>
                <button value = {item.value} onClick = {(event)=>{this.clickHandler(event)}}>Add to list </button>
                    </div>
                )
            })

        }





        return( <div>
         <Grid container>

            <Grid item xs = {6}>
             <ul>
                {itemItems}
            </ul>
            </Grid>

             <Grid item xs = {6}>
            <ul>
                {categoryItems}
            </ul>
            </Grid>

        </Grid>
        </div>
        )
    }

}