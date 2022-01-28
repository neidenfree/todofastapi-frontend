import Login from "./login";
import {Alert, Box, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Navigate, NavLink} from "react-router-dom";


export default class ChangePassword extends Login {

    componentDidMount() {
        this.setState({
            oldPassword: "",
            password: "",
            password2: "",
            message: "",
            matchedPasswords: true
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        if (this.state.oldPassword !== localStorage.getItem("password")) {
            this.setState({message: "Old password is incorrect!"});
            return null;
        }

        if (this.state.password !== this.state.password2) {
            this.setState({message: "New passwords don't match!"});
            return null;
        }

        let changeData = {
            username: localStorage.getItem("username"),
            password: this.state.oldPassword,
            email: localStorage.getItem("email"),
            new_password: this.state.password
        }
        console.log(changeData);

        const requestOptions = {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(changeData)
        }

        // try{
        const response = await fetch('http://localhost:8888/change-password/', requestOptions).then(
            (res) => {
                return res.json()
            }
        );
        if (!response.ok){
            console.log(response)
            this.setState({message: response.message});
        } else {
            // localStorage.setItem("username", this.state.username);
            localStorage.setItem("password", this.state.password);
            // localStorage.setItem("email", response.email);

            window.location.reload();
        }

    }

    handleChange(event) {
        super.handleChange(event);
    }

    render() {
        return (
            this.loggedIn ?
                <div>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography component={"h1"}>
                            Change password
                        </Typography>
                        <Box component={"form"} onSubmit={this.handleSubmit}>
                            <TextField value={this.state.oldPassword} onChange={this.handleChange}
                                       margin="normal" name="oldPassword"
                                       id={"oldPassword"} label={"Old password"}
                                       type={"password"}
                                       required fullWidth/>
                            <TextField value={this.state.password} onChange={this.handleChange}
                                       margin="normal" name="password"
                                       id={"password"} label={"Password"}
                                       type={"password"}
                                       required fullWidth/>
                            <TextField value={this.state.password2} onChange={this.handleChange}
                                       margin="normal" name="password2"
                                       id={"password2"} label={"Repeat password"}
                                       type={"password"}
                                       required fullWidth/>
                            {this.state.matchedPasswords === true ? <div></div> :
                                <Alert severity={"error"}>Passwords don't match</Alert>}
                            {this.state.message === "" ? <div></div> :
                                <Alert severity={"error"}>{this.state.message}</Alert>}
                            <Button type={"submit"} fullWidth variant={"contained"}
                                    sx={{mt: 3, mb: 2}}>Change password</Button>

                            <Grid container>
                                <Grid item xs>

                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" component={NavLink} to={"/tasks"}>
                                        {"Back to main page"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </div>
                : <Navigate to={"/tasks"}/>

        )
    }

}