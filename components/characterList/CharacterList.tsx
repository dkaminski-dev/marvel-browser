import { useCallback, useEffect } from "react";
import { init, loadNextData, selectCharacters, selectHasMoreData, selectInit, selectLoading } from "../../store/characterList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import InfiniteList from "../InfiniteList";
import ListItem from "../ListItem";

const CharacterList = () =>
{
    const dispatch = useAppDispatch();

    const characterList = useAppSelector( selectCharacters );
    const isLoading = useAppSelector( selectLoading );
    const hasMoreData = useAppSelector( selectHasMoreData );
    const isInit = useAppSelector( selectInit );

    const loadNext = useCallback( () =>
    {
        if ( hasMoreData )
        {
            dispatch( loadNextData( 20 ) );
        }
    }, [ dispatch, hasMoreData ] );

    useEffect( () =>
    {
        if ( isInit === false )
        {
            dispatch( init() )
            dispatch( loadNextData( 20 ) );
        }
    }, [ dispatch, isInit ] );

    return (
        <InfiniteList hasData={characterList.length > 0} isLoading={isLoading} hasMoreData={hasMoreData} onNextDataRequested={async () =>
        {
            loadNext();
        }}>
            {characterList.map( character => (
                <ListItem id={character.id.toString()} key={character.id} text={character.name} description={character.description} thumbnail={`${character.thumbnail.path}/${"portrait_small"}.${character.thumbnail.extension}`} />
            ) )}
        </InfiniteList>
    );
}

export default CharacterList;
