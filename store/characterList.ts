import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from "../interfaces/marvelTypes";
import MarvelService from "../services/marvelService";
import type { AppState } from './store';

export interface CharacterListState
{
    characters: Character[];
    searchText: string;
    isLoading: boolean;
    hasMoreData: boolean;
    init: boolean;
}

const initialState: CharacterListState = {
    characters: [],
    searchText: "",
    isLoading: false,
    hasMoreData: true,
    init: false,
}

export const loadNextData = createAsyncThunk(
    'characterList/loadNextData',
    async ( limit: number, thunkApi ) =>
    {
        const state = thunkApi.getState() as AppState;

        const characters = state.characterList.characters;
        const searchText = state.characterList.searchText;

        const marvelService = new MarvelService();
        const response = await marvelService.getList( characters.length, limit, searchText );

        thunkApi.dispatch( updateHasMoreData( ( characters.length + response.count ) < response.total ) );

        return response.results;
    }
)

export const slice = createSlice( {
    name: 'characterList',
    initialState,
    reducers: {
        appendCharacters: ( state, action: PayloadAction<Character[]> ) =>
        {
            state.characters.push( ...action.payload );
        },
        reset: ( state ) =>
        {
            state.characters = [];
        },
        updateSearchText: ( state, action: PayloadAction<string> ) =>
        {
            state.searchText = action.payload;
        },
        updateHasMoreData: ( state, action: PayloadAction<boolean> ) =>
        {
            state.hasMoreData = action.payload;
        },
        init: ( state ) =>
        {
            state.init = true;
        }
    },
    extraReducers: ( builder ) =>
    {
        builder
            .addCase( loadNextData.pending, ( state ) =>
            {
                state.isLoading = true;
            } )
            .addCase( loadNextData.fulfilled, ( state, action ) =>
            {
                state.isLoading = false;
                state.characters.push( ...action.payload );
            } )
    },
} )

export const { appendCharacters, reset, updateSearchText, updateHasMoreData, init } = slice.actions;

export const selectCharacters = ( state: AppState ) => state.characterList.characters;
export const selectCharacterById = ( state: AppState, id: number ) => state.characterList.characters.find( character => character.id === id );
export const selectSearchText = ( state: AppState ) => state.characterList.searchText;
export const selectLoading = ( state: AppState ) => state.characterList.isLoading;
export const selectHasMoreData = ( state: AppState ) => state.characterList.hasMoreData;
export const selectInit = ( state: AppState ) => state.characterList.init;

export default slice.reducer
