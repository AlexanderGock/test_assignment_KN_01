import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {changeCityProperty, getCity, editCity} from "../../redux/actions/cityActions";
import {cityChangedSelector, citySelector, saveInProgressSelector} from "../../redux/selectors";
import {Button, CircularProgress, Grid} from "@mui/material";
import {useParams, useNavigate} from "react-router-dom";
import CityForm from "./CityForm";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SaveIcon from "@mui/icons-material/Save";
import {LoadingButton} from "@mui/lab";

const CityEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {cityId} = useParams();

    useEffect(() => {
        dispatch(getCity(cityId));
    }, [dispatch, cityId]);

    const propertyChangeHandler = useCallback((name, value) => {
        dispatch(changeCityProperty(name, value));
    }, [dispatch]);

    const city = useSelector(citySelector);
    const isChanged = useSelector(cityChangedSelector);
    const saveInProgress = useSelector(saveInProgressSelector);

    const backButtonClickHandler = useCallback(() => {
        navigate('/citylist');
    }, [navigate]);

    const saveButtonClickHandler = useCallback(() => {
        dispatch(editCity())
    }, [dispatch]);

    if (!city) {
        return (
            <CircularProgress color="inherit" size={16} />
        );
    }

    const isValid = !!city.name;

    return (
        <Grid container spacing={2}>
            <CityForm city={city} onPropertyChange={propertyChangeHandler}/>
            <Grid item xs={2}>
                <Button
                    fullWidth
                    onClick={backButtonClickHandler}
                    variant="outlined"
                    color="primary"
                    disabled={false}
                    startIcon={<NavigateBeforeIcon/>}>
                    Back
                </Button>
            </Grid>
            <Grid item xs={8}/>
            <Grid item xs={2}>
                <LoadingButton
                    loading={saveInProgress}
                    loadingPosition="start"
                    fullWidth
                    onClick={saveButtonClickHandler}
                    variant="contained"
                    color="primary"
                    disabled={!isChanged || saveInProgress || !isValid}
                    startIcon={<SaveIcon/>}>
                    Save
                </LoadingButton>
            </Grid>
        </Grid>
    );
};

export default CityEdit;
