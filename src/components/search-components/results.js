import React from 'react';

export default class Results extends React.Component{


    render(){
        let items;
        let category;
        let filtered;

        console.log(this.props)


        if (this.props.category!=null){
            category = this.props.category.value

            console.log(category)
            console.log(this.props.allData)

            items = this.props.allData[category]["items"].map((item,index)=>{return <div><li key={index}>{item}</li><a href = "#">Add to list</a></div>})

            console.log(items)

            }

        if (this.props.filter != null){

            filtered = this.props.filter.map((item,index)=>{return <li key={index}>{item}</li>})
        }



        return( <div>
            <ul>
                {items}
                {filtered}
            </ul>
        </div>
        )
    }

}