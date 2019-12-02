import React from 'react';
import Grid from '@material-ui/core/Grid';
import ImgMediaCard from './card.js'

export default class ResultsItem extends React.Component{





    render(){
        let categoryItems;
        let itemItems
        let category;
          console.log('HELLO PROPS')

        console.log(this.props.itemFilter)//array of objects

        if (this.props.itemFilter!=null){

            itemItems = this.props.itemFilter.map((item,index)=>{
                return (<div key={index} style = {{marginRight:10, marginTop:10}}>

                <ImgMediaCard item = {item.value} onClick = {this.props.list}/>

                    </div>
                )
            })

        }





        return( <div>
         <Grid container justify="center">

                {itemItems}


        </Grid>
        </div>
        )
    }

}