import './App.css';
import {BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import CityListRouter from "./components/citylist/CityListRouter";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/citylist/*" element={<CityListRouter />} />
                <Route path="*" element={<Navigate to="/citylist" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
