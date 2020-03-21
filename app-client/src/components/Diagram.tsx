import React from "react";
import {Mermaid} from "./Mermaid"
import { Typography, Grid, Paper } from "@material-ui/core";

interface DiagramProps {
    ms?: any;
}

const Diagram = (props: DiagramProps) => {
    return (
        <Grid spacing={3} container>
            <Grid item xs={12}>
                <Typography variant="h5">
                    {props.ms.name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Mermaid
                    chart={
                        props.ms.boundedContext} />
                </Paper>
            </Grid>
            
                  </Grid>          
        
    );
}

export default Diagram;