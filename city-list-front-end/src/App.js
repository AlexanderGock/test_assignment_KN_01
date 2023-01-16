import './App.css';
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import CityListRouter from "./components/citylist/CityListRouter";
import {Container, Box, Paper} from "@mui/material";

function App() {
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
