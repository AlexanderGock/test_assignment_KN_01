import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCityList} from "../../redux/actions/cityActions";
import {cityListSelector} from "../../redux/selectors";

const CityList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCityList());
    }, [dispatch]);

    const citylist = useSelector(cityListSelector);

    return citylist.map(city => (city.name + ', '));
};

export default CityList;
