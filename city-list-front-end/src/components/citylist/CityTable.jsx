import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useSelector} from "react-redux";
import {cityListSelector} from "../../redux/selectors";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from '@mui/material/TableCell';
import "./CityTable.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontWeight: 700,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const CityTable = () => {
    const citylist = useSelector(cityListSelector);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            City
                        </StyledTableCell>
                        <StyledTableCell>
                            Photo
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        citylist.map((city) =>
                            (
                                <StyledTableRow key={city.id}>
                                    <StyledTableCell>
                                        {city.name}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <img src={city.photo} alt={city.photo} className="image-preview"/>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CityTable;
