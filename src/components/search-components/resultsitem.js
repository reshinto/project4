import React from 'react';
import Grid from '@material-ui/core/Grid';

export default class ResultsItem extends React.Component{

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


             <ul>
                {itemItems}
            </ul>

        </Grid>
        </div>
        )
    }

}