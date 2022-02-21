import './login.css';

import {Component} from "react";
import {NavLink, Redirect, useNavigate} from "react-router-dom";
import {Navigate} from "react-router-dom";
// import {loggedId} from "../App";
import {backend, loggedIn} from "../App";
import {Alert, Box, Button, Grid, Link, TextField, Typography} from "@mui/material";
// import {Link} from "react-router-dom";
// import loggedIn from app

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "username": "", "password": "", "email": "", message: ""
        }
        this.loggedIn = loggedIn();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({message: ""})
        this.setState({[event.target.name]: event.target.value});
    }


    async handleSubmit(event) {
        event.preventDefault();
        let loginData;
        if (this.state.email === "") {
            loginData = {
                "password": this.state.password,
                "username": this.state.username
            }
        } else if (this.state.username === "") {
            loginData = {
                "password": this.state.password,
                "email": this.state.email
            }
        } else {
            loginData = {
                "password": this.state.password,
                "email": this.state.email
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(loginData)
        }

        // try{
        const response = await fetch(backend + 'login/', requestOptions).then(
            (res) => {
                if (!res.ok) {
                    return {
                        "ok": false,
                        "message": "Wrong email/password!"
                    };
                }
                return res.json()
            }
        );

        if ('ok' in response) {
            this.setState({
                message: "Wrong username/password!"
            });
        } else {
            localStorage.setItem("username", response.username);
            localStorage.setItem("password", this.state.password);
            localStorage.setItem("email", response.email);
            window.location.reload();
            // this.props.navigate("/tasks");
        }

    }


    render() {
        return (
            !this.loggedIn ?
                <div>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography component={"h1"}>
                            Log in
                        </Typography>
                        <Box component={"form"} onSubmit={this.handleSubmit}>
                            <TextField value={this.state.email} onChange={this.handleChange}
                                       margin="normal" required fullWidth id="email" name="email"
                                       label="email" type={"email"} autoFocus/>
                            <TextField value={this.state.password} onChange={this.handleChange}
                                       margin="normal" name="password"
                                       id={"password"} label={"password"}
                                       type={"password"}
                                       required fullWidth/>
                            {this.state.message === "" ? <div></div> :
                                <Alert severity={"error"}>{this.state.message}</Alert>}
                            <Button type={"submit"} fullWidth variant={"contained"}
                                    sx={{mt: 3, mb: 2}}> Log in</Button>

                            <Grid container>
                                <Grid item xs>
                                    {/*<Link href="#" variant="body2">*/}
                                    {/*    Forgot password?*/}
                                    {/*</Link>*/}
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" component={NavLink} to={"/signup"}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>

                        {/*<Typography component={"h1"}>*/}
                        {/*    {this.state.message}*/}
                        {/*</Typography>*/}
                    </Box>
                </div>
                : <Navigate to={"/tasks"}/>

        )
    }
}

// export function LoginWithNavigate(props) {
//     let navigate = useNavigate();
//     return <Login {...props} navigate={navigate}/>;
// }