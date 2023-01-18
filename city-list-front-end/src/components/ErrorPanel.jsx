import {Box} from "@mui/material";
import {Alert} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {errorSelector} from "../redux/selectors";
import {cleanError} from "../redux/actions/errorActions";
import {useCallback} from "react";

const ErrorPanel = () => {
    const dispatch = useDispatch();
    const error = useSelector(errorSelector);

    const closeIconClickHandler = useCallback(() => {
        dispatch(cleanError());
    }, [dispatch]);

    if (!error) {
        return null;
    }

    return (
        <Box position="fixed" sx={{bottom: '1rem', left: '1rem', width: 'calc(100% - 2rem)' }}>
            <Alert severity="error" variant="filled" onClose={closeIconClickHandler}>
                {`${error.status}: ${error.error || error.statusText}`}
            </Alert>
        </Box>
    );
};

export default ErrorPanel;
