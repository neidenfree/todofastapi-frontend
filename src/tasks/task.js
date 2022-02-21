import {Component} from "react";
import {Box, Button, Card, CardContent, Grid, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import TaskForm from "./taskForm";
import TaskEditForm from "./taskEditForm";
import {backend} from "../App";


export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: this.props.done,
            open: false
        }
        this.handleDone = this.handleDone.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.parentHandleClose = this.parentHandleClose.bind(this);

    }

    handleDelete(taskId) {

        if (!taskId) {
            return null;
        }
        let deleteTaskData = {
            task_id: taskId,
            username: localStorage.getItem("username"),
            email: localStorage.getItem("email"),
            password: localStorage.getItem("password")
        };

        const requestOptions = {
            method: 'DELETE', headers: {'content-type': 'application/json'}, body: JSON.stringify(deleteTaskData)
        }
        fetch(backend + "task", requestOptions).then(res => res.json()).then(() => {
            this.props.smoothDeleteHandler(taskId)
        });
    }

    handleDone(taskId) {
        // event.preventDefault();
        let done = !this.state.done;
        this.setState({
            done: done
        });
        console.log(this.state);
        let newTaskData = {
            user: {
                username: localStorage.getItem("username"),
                email: localStorage.getItem("email"),
                password: localStorage.getItem("password")
            }, task: {
                task_id: this.props.taskId,
                title: this.props.title,
                description: this.props.description,
                done: done
            }
        }

        const requestOptions = {
            method: 'PUT', headers: {'content-type': 'application/json'}, body: JSON.stringify(newTaskData)
        }

        fetch("http://localhost:8888/task", requestOptions).then(res => res.json()).then(res => console.log(res))
            .then(() => {
                this.props.smoothDoneHandler(taskId)
            });
    }


    handleEdit(taskId) {
        console.log('taskId edit = ', taskId);
        this.setState({
            open: true
        });
        console.log(this.state);
    }

    parentHandleClose() {
        this.setState({open: false});
    }

    openForm() {
        return (this.state.open ? <TaskEditForm
                done={this.state.done}
                description={this.props.description}
                title={this.props.title}
                parentHandleClose={this.parentHandleClose}
                taskId={this.props.taskId}
                smoothEditHandler={this.props.smoothEditHandler}

            />
            : <div></div>);
    }

    render() {
        return (
            <Card variant={"outlined"}>
                <CardContent>
                    {this.openForm()}

                    <Grid container spacing={2}>
                        <Grid item>
                            <Button onClick={() => {
                                this.handleDone(this.props.taskId)
                            }}><CheckIcon/></Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => {
                                this.handleDelete(this.props.taskId)
                            }}><DeleteIcon/></Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => {
                                this.handleEdit(this.props.taskId)
                            }}><EditIcon/></Button>
                        </Grid>
                    </Grid>
                    {this.state.done ? <Typography variant={"h5"} sx={{'textDecoration': 'line-through'}}>
                        {this.props.title}
                    </Typography> : <Typography variant={"h5"} sx={{'textDecoration': 'none'}}>
                        {this.props.title}
                    </Typography>}

                    <Typography>
                        {this.props.description}
                    </Typography>

                </CardContent>
            </Card>)
    }
}