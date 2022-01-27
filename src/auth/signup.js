import Login from "./login";
import {Box, Button, Grid, Link, TextField, Typography} from "@mui/material";
import {Navigate, NavLink} from "react-router-dom";
// import {useNavigate} from "react-router-dom";


export default class Signup extends Login {
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({password2: ""});
        if (this.state.password !== this.state.password2) {
            alert("Пароли не совпадают!");
        }
        alert("А вот хуй тебе на рыло");
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
                            Sign up
                        </Typography>
                        <Box component={"form"} onSubmit={this.handleSubmit}>
                            <TextField value={this.state.username} onChange={this.handleChange}
                                       margin="normal" required fullWidth id="username" name={"username"}
                                       label="Username" autoFocus/>
                            <TextField value={this.state.email} onChange={this.handleChange}
                                       margin="normal" required fullWidth id="email" name="email" label="Email"/>
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
                            <Button type={"submit"} fullWidth variant={"contained"}
                                    sx={{mt: 3, mb: 2}}> Log in</Button>

                            <Grid container>
                                <Grid item xs>

                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" component={NavLink} to={"/login"}>
                                        {"Already have an account? Log in"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        <Typography component={"h1"}>
                            {this.state.message}
                        </Typography>
                    </Box>
                </div>
                : <Navigate to={"/tasks"}/>

        )
    }
}


// export default function SignupWithNavigate(props) {
//     let navigate = useNavigate();
//     return <Signup {...props} navigate={navigate}/>;
// }