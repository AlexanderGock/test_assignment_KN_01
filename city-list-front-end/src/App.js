import './App.css';
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import CityListRouter from "./components/CityListRouter";
import {Container, Box, Paper} from "@mui/material";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getCurrentUser} from "./redux/actions/authActions";
import Header from "./components/Header";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Header/>
            <Container maxWidth="lg">
                <Box>
                    <Paper sx={{ mb: 2, mt: 10, p: 2 }}>
                        <Routes>
                            <Route path="/citylist/*" element={<CityListRouter />} />
                            <Route path="*" element={<Navigate to="/citylist" />} />
                        </Routes>
                    </Paper>
                </Box>
            </Container>
        </BrowserRouter>
    );
}

export default App;
