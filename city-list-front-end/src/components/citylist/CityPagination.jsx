import {useDispatch, useSelector} from "react-redux";
import {cityListPaginationSelector, getCityListInProgressFilter} from "../../redux/selectors";
import {useCallback} from "react";
import {TablePagination} from "@mui/material";
import {getCityList} from "../../redux/actions/citylistActions";

const CityPagination = () => {
    const dispatch = useDispatch();

    const pagination = useSelector(cityListPaginationSelector);
    const getCityListInProgress = useSelector(getCityListInProgressFilter);

    const changePageHandler = useCallback((event, page) => {
        dispatch(getCityList(page));
    }, [dispatch]);

    return (
        <TablePagination
            count={pagination.totalElements}
            page={pagination.page}
            rowsPerPage={pagination.pageSize}
            rowsPerPageOptions={[pagination.pageSize]}
            component="div"
            onPageChange={changePageHandler}
            nextIconButtonProps={{disabled: (getCityListInProgress || pagination.last)}}
            backIconButtonProps={{disabled: (getCityListInProgress || pagination.first)}}/>
    )
};

export default CityPagination;
