// import App from "../App";
// import './login.css'
import {Component} from "react";
import {Navigate, NavLink, useHistory, useNavigate} from "react-router-dom";
import {backend, logOut} from "../App";
import {loggedIn} from "../App";
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box,
    Button,
    Container,
    Fab,
    Grid,
    Link,
    Modal,
    SpeedDial,
    SpeedDialAction,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Task from "./task";
import TaskForm from "./taskForm";


export default class TaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            email: localStorage.getItem("email"),
        }
        this.smoothAddHandler = this.smoothAddHandler.bind(this);
        this.smoothDeleteHandler = this.smoothDeleteHandler.bind(this);
        this.smoothDoneHandler = this.smoothDoneHandler.bind(this);
        this.smoothEditHandler = this.smoothEditHandler.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);

    }

    getTasks() {
        let loginData = {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            email: localStorage.getItem("email")
        }

        const requestOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(loginData)
        }

        fetch(backend + "tasks", requestOptions).then(
            res => {
                return res.json();
            }
        ).then(res => {
                this.setState({tasks: res});
            }
        );
    }

    componentDidMount() {
        this.getTasks();
    }

    smoothAddHandler(task) {
        let tasks = this.state.tasks;
        tasks.push(task);
        this.setState({
            tasks: tasks
        })
    }

    smoothDeleteHandler(taskId) {
        console.log('taskId = ', taskId)
        let tasks = this.state.tasks;
        let number = tasks.findIndex(task => task.task_id === taskId);
        tasks.splice(number, 1);
        this.setState({
            tasks: tasks
        });
    }

    handleRedirect(to) {
        this.setState({
                redirect: to
            }
        );
    }

    smoothDoneHandler(taskId) {
        let t = this.state.tasks;
        console.log('taskId = ', taskId);
        let number = t.findIndex(task => task.task_id === taskId);
    }

    smoothEditHandler(task) {
        let tasks = this.state.tasks;
        let index = tasks.findIndex(t => t.task_id === task.task_id);
        tasks[index] = task;
        this.setState({
            tasks: tasks
        });
    }

    render() {
        if (this.state.redirect){
            return (<Navigate to={this.state.redirect}/>);
        }

        return (
            loggedIn() ? <div>
                    <Container maxWidth="sm">

                        <Typography>Welcome to neidenToDo,
                            <NavLink to={'/settings'}>{this.state.username}</NavLink>
                            !</Typography>
                        <br/>

                        <TaskForm smoothAddHandler={this.smoothAddHandler}/>

                        <Stack spacing={2}>
                            {this.state.tasks.map(task => {
                                return (<Task key={task.task_id} title={task.title} description={task.description}
                                              done={task.done}
                                              smoothEditHandler={this.smoothEditHandler}
                                              smoothDoneHandler={this.smoothDoneHandler}
                                              taskId={task.task_id} smoothDeleteHandler={this.smoothDeleteHandler}/>);
                            })}
                        </Stack>

                        <SpeedDial sx={{position: "fixed", bottom: '50px', right: '50px'}}
                                   ariaLabel={"Speed dial"}>
                            <SpeedDialAction
                                onClick={() => {
                                    this.handleRedirect('/settings')
                                }}
                                key={"Settings"} icon={<SettingsIcon/>}
                                tooltipTitle={"Settings"}>
                            </SpeedDialAction>
                        </SpeedDial>
                    </Container>
                </div> :
                <Navigate to={"/login"}/>
        );
    }
}