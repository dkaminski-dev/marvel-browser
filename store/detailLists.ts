import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DetailItem, DetailType } from "../interfaces/marvelTypes";
import MarvelService from "../services/marvelService";
import type { AppState } from './store';

interface DetailListState
{
    items: DetailItem[];
    isLoading: boolean;
    hasMoreData: boolean;
}

export interface DetailListsState
{
    comics: DetailListState;
    stories: DetailListState;
    events: DetailListState;
    series: DetailListState;
}

const initialState: DetailListsState = {
    comics: { items: [], isLoading: false, hasMoreData: true },
    stories: { items: [], isLoading: false, hasMoreData: true },
    events: { items: [], isLoading: false, hasMoreData: true },
    series: { items: [], isLoading: false, hasMoreData: true },
}

interface LoadProps
{
    details: DetailType;
    characterId: number;
}

export const loadNextData = createAsyncThunk(
    'detailsList/loadNextData',
    async ( { details, characterId }: LoadProps, thunkApi ) =>
    {
        const state = thunkApi.getState() as AppState;

        const items = state.detailList[ details ].items;
        const marvelService = new MarvelService();
        const response = await marvelService.getDetailDataForViewType( characterId, details, items.length, 20 );

        thunkApi.dispatch( updateHasMoreData( { detail: details, data: ( items.length + response.count ) < response.total } ) );

        return { result: response.results, details: details };
    }
)

type DetailPayloadAction<T> = PayloadAction<{ detail: DetailType, data: T }>;

export const slice = createSlice( {
    name: 'detailLists',
    initialState,
    reducers: {
        appendItems: ( state, action: DetailPayloadAction<DetailItem[]> ) =>
        {
            state[ action.payload.detail ].items.push( ...action.payload.data );
        },
        reset: ( state, action: DetailPayloadAction<never> ) =>
        {
            state[ action.payload.detail ].items = [];
        },
        resetAll: ( state ) =>
        {
            state.comics.items = [];
            state.stories.items = [];
            state.events.items = [];
            state.series.items = [];
        },
        updateHasMoreData: ( state, action: DetailPayloadAction<boolean> ) =>
        {
            state[ action.payload.detail ].hasMoreData = action.payload.data;
        }
    },
    extraReducers: ( builder ) =>
    {
        builder
            .addCase( loadNextData.pending, ( state, action ) =>
            {
                state.comics.isLoading = true;
                state.stories.isLoading = true;
                state.events.isLoading = true;
                state.series.isLoading = true;
            } )
            .addCase( loadNextData.fulfilled, ( state, action ) =>
            {
                state.comics.isLoading = false;
                state.stories.isLoading = false;
                state.events.isLoading = false;
                state.series.isLoading = false;

                state[ action.payload.details ].items.push( ...action.payload.result );
            } )
    },
} );

export const { appendItems, reset, updateHasMoreData, resetAll } = slice.actions;

export const selectDetails = ( state: AppState, type: DetailType ) => state.detailList[ type ];

export default slice.reducer;
