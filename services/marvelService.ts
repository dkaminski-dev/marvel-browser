import { MD5 } from "crypto-js";
import { Character, DataWrapper, DetailItem, DetailType } from "../interfaces/marvelTypes";
import { MarvelApiKeys } from "../shared/constants";

class MarvelService
{
    private baseUrl = "https://gateway.marvel.com/v1/public";

    private getAuthParams() 
    {
        const publicKey = MarvelApiKeys.PUBLIC_API_KEY;
        const privateKey = MarvelApiKeys.PRIVATE_API_KEY;

        let auth = `&apikey=${publicKey}`;

        // Assume this is a server-side call if private key is available
        if ( privateKey )
        {
            const ts = Date.now();
            const hash = MD5( `${ts}${privateKey}${publicKey}` ).toString();
            auth += `&ts=${ts}&hash=${hash}`;
        }

        return auth;
    }

    public async getList( offset: number, limit: number = 20, nameStartsWith = "" )
    {
        let url = `${this.baseUrl}/characters?offset=${offset}&limit=${limit}${this.getAuthParams()}`;

        if ( nameStartsWith !== "" )
        {
            url += `&nameStartsWith=${nameStartsWith}`;
        }

        const response = await fetch( url );
        const result = ( await response.json() as DataWrapper<Character> );

        if ( result.code === 200 )
        {
            return result.data;
        }

        throw new Error( result.status );
    }

    public async getCharacter( id: number )
    {
        const url = `${this.baseUrl}/characters/${id}?${this.getAuthParams()}`;

        const response = await fetch( url );
        const result = ( await response.json() as DataWrapper<Character> );

        if ( result.code === 200 )
        {
            return result.data;
        }

        throw new Error( result.status );
    }

    public async getDetailDataForViewType( id: number, viewType: DetailType, offset: number, limit: number = 20 )
    {
        const url = `${this.baseUrl}/characters/${id}/${viewType}?offset=${offset}&limit=${limit}&${this.getAuthParams()}`;

        const response = await fetch( url );
        const result = ( await response.json() as DataWrapper<DetailItem> );

        if ( result.code === 200 )
        {
            return result.data;
        }

        throw new Error( result.status );
    }
}

export default MarvelService;