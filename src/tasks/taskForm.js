import {Component} from "react";
import Login from "../auth/login";


export default class TaskForm extends Login {


    render() {
        return (
            <div>
                <form>
                    <input type={"text"} value={""}/>
                </form>
            </div>
        )

    }

}