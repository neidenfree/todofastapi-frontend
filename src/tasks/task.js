import {Component} from "react";


export default class Task extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <h1>{this.props.name}</h1>
            </div>
        )
    }
}