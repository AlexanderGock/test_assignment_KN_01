import {AppBar, Box, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useSelector} from "react-redux";
import {userSelector} from "../redux/selectors";
import {logout} from "../redux/actions/authActions";

const Header = () => {
    const user = useSelector(userSelector);

    return (
        <Box>
            <AppBar position="fixed">
                <Toolbar>
                    {
                        !!user &&
                        (
                            <Grid container>
                                <Grid item xs={10} md={11} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                    <Typography variant="h6" color="inherit" component="div" >{user.username}</Typography>
                                </Grid>
                                <Grid item xs={2} md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                        <IconButton color="inherit" onClick={logout}>
                                            <LogoutIcon />
                                        </IconButton>
                                </Grid>
                            </Grid>
                        )
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
