import { DetailListsState } from "../store/detailLists";

export interface MarvelSummary
{
    resourceURI: string;
    name: string;
}

export interface MarvelList<T>
{
    available: number;
    returned: number;
    collectionURI: string;
    items: T[];
}

export interface MarvelUrl
{
    type: string;
    url: string;
}

export interface Image
{
    extension: string;
    path: string;
}

export interface Character
{
    id: number;
    name: string;
    description: string;
    modified: Date;
    resourceURI: string;
    urls: MarvelUrl[];
    thumbnail: Image;
    comics: MarvelList<DetailItem>;
    stories: MarvelList<DetailItem>;
    events: MarvelList<DetailItem>;
    series: MarvelList<DetailItem>;
}

export interface DetailItem
{
    id: number;
    title?: string;
    description: string;
    name?: string;
}

export interface DataContainer<T>
{
    offset: number
    limit: number;
    total: number;
    count: number;
    results: T[];
}

export interface DataWrapper<T>
{
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: DataContainer<T>;
    etag: string;
}

export type DetailType = keyof DetailListsState;