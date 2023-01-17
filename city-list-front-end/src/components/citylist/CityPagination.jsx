import {useDispatch, useSelector} from "react-redux";
import {cityListPaginationSelector, getCityListInProgressFilter} from "../../redux/selectors";
import {useCallback} from "react";
import {TablePagination} from "@mui/material";
import {getCityList} from "../../redux/actions/citylistActions";
import {useTranslation} from "react-i18next";

const CityPagination = () => {
    const {t} = useTranslation('common');
    const dispatch = useDispatch();

    const pagination = useSelector(cityListPaginationSelector);
    const getCityListInProgress = useSelector(getCityListInProgressFilter);

    const changePageHandler = useCallback((event, page) => {
        dispatch(getCityList(page));
    }, [dispatch]);

    const translateDisplayedRows = useCallback((displayedRowsProps) =>
        t('citylist.pagination.displayedrows', displayedRowsProps)
    , [t]);

    return (
        <TablePagination
            count={pagination.totalElements}
            page={pagination.page}
            rowsPerPage={pagination.pageSize}
            rowsPerPageOptions={[pagination.pageSize]}
            component="div"
            onPageChange={changePageHandler}
            nextIconButtonProps={{disabled: (getCityListInProgress || pagination.last), title: t('citylist.pagination.next')}}
            backIconButtonProps={{disabled: (getCityListInProgress || pagination.first), title: t('citylist.pagination.prev')}}
            labelDisplayedRows={translateDisplayedRows}/>
    )
};

export default CityPagination;
