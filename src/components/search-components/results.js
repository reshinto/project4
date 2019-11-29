import React from 'react';

export default class Results extends React.Component{


    render(){
        let items;
        let category;
        let filtered;

        console.log(this.props)


        if (this.props.category!=null){
            category = this.props.category.value
            console.log('@@@@@@@@@@@@@@@@@@@@@@@')
            console.log(this.props.allData)
                for (let i=0;i<this.props.allData;i++){
                     console.log(this.props.allData[i][category])

                items = this.props.allData[i][category]["items"].map((item,index)=>{return <li key={index}>{item}</li>})
                }
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