import PropTypes from "prop-types";
import {Grid, TextField} from "@mui/material";
import {Fragment, useCallback} from "react";
import {useTranslation} from "react-i18next";

const CityForm = ({city, onPropertyChange}) => {
    const {t} = useTranslation('common');

    const changeTextHandler = useCallback((event) => {
        const name = event.target.name;
        const value = event.target.value;
        onPropertyChange(name, value);
    }, [onPropertyChange]);

    return (
        <Fragment>
            <Grid item xs={12}>
                <TextField
                    label={t('city.form.city')}
                    variant="outlined"
                    value={city.name || ''}
                    onChange={changeTextHandler}
                    name="name"
                    fullWidth
                    required
                    inputProps={{ maxLength: 255 }}
                    error={!city.name}/>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label={t('city.form.photo')}
                    variant="outlined"
                    value={city.photo || ''}
                    onChange={changeTextHandler}
                    name="photo"
                    fullWidth
                    inputProps={{ maxLength: 1000 }}/>
            </Grid>
        </Fragment>
    );
};

CityForm.propTypes = {
    city: PropTypes.object.isRequired,
    onPropertyChange: PropTypes.func.isRequired,
};

export default CityForm;
