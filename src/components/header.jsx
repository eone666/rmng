import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Search from './search'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 0,
        display: 'none',
        cursor: "pointer",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

export default function Header(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.title}>
                        <Button onClick={props.onLogoClick}>
                            <Typography color="textSecondary" variant="h4">RMNG</Typography>
                        </Button>
                    </div>
                    <Search onSearch={props.onSearch} />
                </Toolbar>
            </AppBar>
        </div>
    );
}