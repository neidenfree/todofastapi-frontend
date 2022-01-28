import {Component} from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";


export default class Task extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <Card variant={"outlined"}>
                <CardContent>
                    <Typography variant={"h5"}>
                        {this.props.title}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}