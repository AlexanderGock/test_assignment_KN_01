import {Route, Routes} from "react-router-dom";
import CityList from "./CityList";
import CityEdit from "./CityEdit";

const CityListRouter = () => {
    return (
        <Routes>
            <Route path="/:cityId" element={<CityEdit />}/>
            <Route path="*" element={<CityList />}/>
        </Routes>
    );
};

export default CityListRouter;