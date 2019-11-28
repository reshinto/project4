//loop through json file
//where category["name"] is equal to selected category
//return items array
//each item needs a link or a plus button to add to the grocery list
let category = this.props.category

//find the selected category object in the json file, and map out the items array
let items = this.props.allData[category]["items"].map{(item)=> return <li>{item}<li>}

export default function Results(){

    <ul>
        {items}
    </ul>
}