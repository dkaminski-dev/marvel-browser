import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, CircularProgress } from "@mui/material";
import { useCallback, useEffect } from "react";
import { DetailType } from "../../interfaces/marvelTypes";
import { loadNextData, selectDetails } from "../../store/detailLists";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Center } from "../layout/styled";
import ListItem from "../ListItem";

interface Props
{
    type: DetailType;
    characterId: number;
}

const DetailList = ( props: Props ) =>
{
    const dispatch = useAppDispatch();

    const detailList = useAppSelector( state => selectDetails( state, props.type ) );

    const loadNext = useCallback( () =>
    {
        dispatch( loadNextData( { characterId: props.characterId, details: props.type } ) );
    }, [ dispatch, props.characterId, props.type ] );

    useEffect( () =>
    {
        detailList.items.length === 0 && loadNext();
    }, [ detailList.items.length, loadNext ] );

    return (
        <>
            {detailList.items.map( data => (
                <ListItem key={props.type + data.id} text={data.name ?? data.title ?? ""} description={data.description}></ListItem>
            ) )}
            {detailList.isLoading === false && detailList.hasMoreData === true &&
                <Center>
                    <Button startIcon={<RefreshIcon />} variant="outlined" onClick={() => loadNext()}>Load more</Button>
                </Center>
            }
            {detailList.isLoading === true &&
                <Center>
                    <CircularProgress />
                </Center>
            }
        </>
    );
}

export default DetailList;