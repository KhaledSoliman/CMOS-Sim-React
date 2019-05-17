import React, {Component} from 'react';

import NavBar from "./Components/NavBar";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Content from "./Components/Content";
import axios from "axios";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#0b0b0c"
        },
        secondary: {
            main: "#004D40"
        }
    },
    typography: {
        button: {
            fontWeight: 400,
            textAlign: 'capitalize'
        },
        useNextVariants: true,
    },
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {uploaded: false, code: ""};
    }

    componentDidMount() {

    }

    syntaxHighlight = (code) => {
        this.setState({code: code});
    };


    handleStartSimulation = (response, signals) => {
        console.log(response);
        let inputSymbols = {}
        response.inputSymbols.forEach((symbol) => {
           inputSymbols[symbol] = signals[symbol] != undefined ? signals[symbol] : false;
           inputSymbols['-' + symbol] = !inputSymbols[symbol];
        });
        const request = {
            inputSymbols: inputSymbols,
            PMOSMap: response.PMOSMap,
            NMOSMap: response.NMOSMap
        };
        console.log(request);
        axios.post(`http://localhost:8000/simsim/`, request).then(res => {
                console.log(res);
                console.log(res.data);
                this.setState({simResponse: res.data});
        });
    };

    handleCreateCircuit = (booleanExpression) => {
        console.log(booleanExpression);
        const request = {
            booleanExpression: booleanExpression,
        };
        console.log(request);
        axios.post(`http://localhost:8000/sim/`, request).then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({response: res.data});
        });
    };

    /*F1F6F9*/
    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <React.Fragment>
                    <CssBaseline/>
                    <NavBar/>
                    <Content code={this.state.code}
                             response={this.state.response ? this.state.response:null}
                             simResponse={this.state.simResponse ? this.state.simResponse:null}
                             syntaxHighlight={this.syntaxHighlight}
                             handleStartSimulation={this.handleStartSimulation}
                             handleCreateCircuit={this.handleCreateCircuit}
                    />
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

export default App;
