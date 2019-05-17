import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});


function CircuitTable(props) {
    const {classes} = props;
    const rows = props.data;
    return (
        <Paper className={classes.root}>
            <p>Transistor Count: {props.count}</p>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <CustomTableCell >Transistor Name</CustomTableCell>
                        <CustomTableCell >Source</CustomTableCell>
                        <CustomTableCell >Drain</CustomTableCell>
                        <CustomTableCell >Gate</CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows != null && rows.map((row,i) => {
                    return (
                        <TableRow key={i}>
                        <CustomTableCell component="th" scope="row">
                        {row.name}
                        </CustomTableCell>
                        <CustomTableCell >{row.source}</CustomTableCell>
                        <CustomTableCell >{row.drain}</CustomTableCell>
                        <CustomTableCell >{row.gate}</CustomTableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(CircuitTable);
