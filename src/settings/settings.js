import {Component} from "react";
import {Button, Container} from "@mui/material";
import {loggedIn, logOut} from "../App";
import {NavLink} from "react-router-dom";
import {Navigate} from "react-router-dom";


export default function Settings() {
    return (
        loggedIn() ?
        <Container>
            <Button variant={"contained"} onClick={logOut}>LogOut</Button>
            <Button variant={"contained"} component={NavLink} to={"/change-password"}>
                {"Change password"}
            </Button>
        </Container>
            : <Navigate to={"/login"}/>
    );
}