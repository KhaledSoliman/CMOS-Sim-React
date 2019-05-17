import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/es/CardHeader/CardHeader";
import Highlight from "react-highlight";
import CircuitTable from "./CircuitTable"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        maxWidth: "95%",
        margin: 'auto',
        overflow: 'hidden',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    card: {
        float: 'left',
        margin: '10%',
    },
    actionBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    block: {
        display: 'block',
    },
});

class Content extends  React.Component {
    state = {
        signals: {}
    }

    handleChange = name => event => {
        this.state.signals[name] = event.target.checked;
    };

    render() {
        const {classes, syntaxHighlight, code, handleStartSimulation, handleCreateCircuit, simResponse, response} = this.props;

        return (
            <Paper className={classes.paper}>
                <AppBar className={classes.actionBar} position="static" elevation={0}>
                    <Toolbar>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Button color="secondary" variant="contained" onClick={() => {
                                    handleCreateCircuit(code);
                                }}>
                                    Build Circuit
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="Simulation Input" subheader="
    Format of Input Boolean Expression :
    ~(~(A+B).C+~D)
    ~(SUM1 + SUM2)
    Symbols : ~ (NOT), . (AND), + (OR)">
                            </CardHeader>
                            <CardContent>
                                <Grid container spacing={16}>
                                    <Grid item xs={12}>
                                        <Card>
                                            <CardHeader title="Boolean Expression">
                                            </CardHeader>
                                            <CardContent>
                                                <Highlight
                                                    className="c++">{code !== "" ? code : 'No input provided.'}</Highlight>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card>
                                            <CardHeader title="Input"
                                                        subheader="Input boolean expression formatted">
                                            </CardHeader>
                                            <CardContent>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Expression"
                                                    multiline
                                                    rows="2"
                                                    fullWidth
                                                    placeholder="Enter boolean expression..."
                                                    className={classes.textField}
                                                    margin="normal"
                                                    variant="filled"
                                                    onChange={(e) => syntaxHighlight(e.target.value)}
                                                    helperText="This is where you can enter the program"
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                            </CardActions>
                        </Card>
                    </Grid>
                    {response != null &&
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="Circuit Building Output" subheader="These tables show the output">
                            </CardHeader>
                            <CardContent>
                                <Grid container spacing={16}>
                                    <Grid item xs={8}>
                                        <Card>
                                            <CardHeader title="PMOS">
                                            </CardHeader>
                                            <CardContent>
                                                <CircuitTable data={response ? response.PMOSMap : null} count={response ? response.PMOSCount : 0}/>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Card>
                                            <CardHeader title="Signals">
                                            </CardHeader>
                                            <CardContent>
                                                <FormGroup row>
                                                    {response != null && response.inputSymbols.map((signal, i) => {
                                                        return (
                                                            <FormControlLabel key={i}
                                                                              control={
                                                                                  <Switch
                                                                                      onChange={this.handleChange(signal)}
                                                                                      color="secondary"
                                                                                  />
                                                                              }
                                                                              label={signal}
                                                            />
                                                        );
                                                    })}
                                                    <Button color="secondary" variant="contained" onClick={() => {
                                                        handleStartSimulation(response, this.state.signals);
                                                    }}>
                                                        Start Simulation
                                                    </Button>
                                                </FormGroup>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Card>
                                            <CardHeader title="NMOS">
                                            </CardHeader>
                                            <CardContent>
                                                <CircuitTable data={response ? response.NMOSMap : null} count={response ? response.NMOSCount : 0}/>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    {simResponse != null &&
                                    <Grid item xs={4}>
                                        <Card>
                                            <CardHeader title="Simulation Output">
                                            </CardHeader>
                                            <CardContent>
                                                <p>PMOS Output: {simResponse.PMOSOutput}</p>
                                                <p>NMOS Output: {simResponse.NMOSOutput}</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    }
                                </Grid>
                            </CardContent>
                            <CardActions>
                            </CardActions>
                        </Card>
                    </Grid>
                    }
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Content);