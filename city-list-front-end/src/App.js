import './App.css';
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import CityListRouter from "./components/CityListRouter";
import {Container, Box, Paper} from "@mui/material";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getCurrentUser} from "./redux/actions/authActions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return (
        <Container maxWidth="lg">
            <Box>
                <Paper sx={{ mb: 2, mt: 2, p: 2 }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/citylist/*" element={<CityListRouter />} />
                            <Route path="*" element={<Navigate to="/citylist" />} />
                        </Routes>
                    </BrowserRouter>
                </Paper>
            </Box>
        </Container>
    );
}

export default App;
