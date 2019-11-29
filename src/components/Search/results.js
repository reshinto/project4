import React from 'react';

export default class Results extends React.Component{


    render(){
        let items;
        let category;


        if (this.props.category!=null){
            category = this.props.category.value

            items = this.props.allData[category]["items"].map((item,index)=>{return <li key={index}>{item}</li>})
            }

        return( <div>
            <ul>
                {items}
            </ul>
        </div>
        )
    }

}