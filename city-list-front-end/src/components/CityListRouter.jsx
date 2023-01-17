import {Route, Routes} from "react-router-dom";
import CityList from "./citylist/CityList";
import CityEdit from "./city/CityEdit";

const CityListRouter = () => {
    return (
        <Routes>
            <Route path="/:cityId" element={<CityEdit />}/>
            <Route path="*" element={<CityList />}/>
        </Routes>
    );
};

export default CityListRouter;