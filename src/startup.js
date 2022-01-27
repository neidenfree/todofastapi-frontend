// import App from "../App";
// import './login.css'
import {Component} from "react";
import {Link} from "react-router-dom";


export default class Startup extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to my site!</h1>
                {/*<Link to={"/ss"}>Start</Link>*/}
                <Link to={"/login"}>Login</Link>
                <Link to={"/signup"}>Signup</Link>
            </div>
    );
    }

    // eslint-disable-next-line no-useless-constructor
    // constructor(props) {
    //     super(props);
    // }
}