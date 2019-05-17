import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {
    secondaryBar: {
        zIndex: 0,
        marginBottom: "10px",
    },
    root: {
        flexGrow: 1,
    },
};

const team = ['Jomana Abd El-Rahman', 'Khaled Soliman', 'Omar Helmy'];
const NavBar = (props) => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className="mt-5" variant="h4" color="inherit" gutterBottom>
                        Micro Project Simulation
                    </Typography>
                </Toolbar>
            </AppBar>
            <AppBar component="div" className={classes.secondaryBar} position="static">
                <Toolbar>
                    {team.map((member) => {
                        return (
                            <Typography style={{paddingLeft: '20px'}}variant="subtitle1" color="inherit">
                                {member}
                            </Typography>
                        )})}

                    <Typography style={{paddingLeft: '20px'}}variant="subtitle1" color="inherit">
                        {"Supervised By: Dr. Cherif Salama"}
                    </Typography>
                    </Toolbar>
            </AppBar>
        </div>
    )
};
export default withStyles(styles)(NavBar);