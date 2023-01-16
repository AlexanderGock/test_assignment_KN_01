import {useDispatch} from "react-redux";
import {Fragment, useEffect} from "react";
import {getCityList} from "../../redux/actions/citylistActions";
import CityFilter from "./CityFilter";
import CityTable from "./CityTable";
import CityPagination from "./CityPagination";

const CityList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCityList());
    }, [dispatch]);

    return (
        <Fragment>
            <CityFilter/>
            <CityTable/>
            <CityPagination/>
        </Fragment>
    );
};

export default CityList;
