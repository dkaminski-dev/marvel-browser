import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Input } from "@mui/material";
import styled from "styled-components";
import { loadNextData, reset, selectSearchText, updateSearchText } from "../../store/characterList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const InputBox = styled.div`
    display: flex;
    justify-content: center;
    padding: 12px;
`;

const SearchBox = () =>
{
    const dispatch = useAppDispatch();

    const searchText = useAppSelector( selectSearchText );

    const onTextChange = ( text: string ) =>
    {
        dispatch( updateSearchText( text ) );

        if ( text === "" )
        {
            onApplySearch();
        }
    }

    const onApplySearch = () =>
    {
        dispatch( reset() )
        dispatch( loadNextData( 20 ) );
    }

    return (
        <InputBox>
            <Input autoFocus placeholder="Search your hero..." value={searchText} onChange={e => onTextChange( e.currentTarget.value )} fullWidth type="search"></Input>
            <IconButton onClick={onApplySearch} type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </InputBox>
    );
}

export default SearchBox;