import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useSelector} from "react-redux";
import {cityListSelector, userSelector} from "../../redux/selectors";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from '@mui/material/TableCell';
import "./CityTable.css";
import EditIcon from "@mui/icons-material/Edit";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {isReadOnlyUser} from "../../utils/userUtils";

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
    const {t} = useTranslation('common');

    const citylist = useSelector(cityListSelector);
    const user = useSelector(userSelector);

    const readonly = isReadOnlyUser(user);
    const Icon = readonly ? FolderOpenIcon : EditIcon;

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            {t('citylist.table.header.city')}
                        </StyledTableCell>
                        <StyledTableCell>
                            {t('citylist.table.header.photo')}
                        </StyledTableCell>
                        <StyledTableCell padding="checkbox"/>
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
                                    <StyledTableCell>
                                        <Link to={city.id.toString()}>
                                            <IconButton color="primary">
                                                <Icon />
                                            </IconButton>
                                        </Link>
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
