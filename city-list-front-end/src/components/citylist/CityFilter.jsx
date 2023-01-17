import {useDispatch, useSelector} from "react-redux";
import {cityListFilterSelector} from "../../redux/selectors";
import {Box, TextField} from "@mui/material";
import {useCallback} from "react";
import {changeFilter} from "../../redux/actions/citylistActions";
import {useTranslation} from "react-i18next";

const CityFilter = () => {
    const {t} = useTranslation('common');
    const dispatch = useDispatch();

    const filter = useSelector(cityListFilterSelector);

    const changeFilterHandler = useCallback((event) => {
        dispatch(changeFilter(event.target.name, event.target.value));
    }, [dispatch]);

    return (
        <Box sx={{ mb: 2 }}>
            <TextField
                label={t('citylist.filter.title')}
                variant="outlined"
                value={filter.name || ''}
                onChange={changeFilterHandler}
                name="name"
                fullWidth/>
        </Box>
    );
};

export default CityFilter;
