import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Search from './search'
import Typography from '@material-ui/core/Typography'
import MovieIcon from '@material-ui/icons/Movie';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
    },
    logo: {
        color: "#fff"
    },
    button: {

    }
}));


export default function Header(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.title}>
                        <Button onClick={props.onLogoClick}>
                            <Typography variant="h4" className={classes.logo}><MovieIcon fontSize="medium" /> RMNG</Typography>
                        </Button>
                    </div>
                    <Search onSearch={props.onSearch} />
                </Toolbar>
            </AppBar>
        </div>
    );
}