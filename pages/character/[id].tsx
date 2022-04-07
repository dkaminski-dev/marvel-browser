import { GetServerSideProps } from "next";
import { useState } from "react";
import DetailList from "../../components/characterDetails/DetailList";
import DetailsHead from "../../components/characterDetails/DetailsHead";
import NavigationTabs from "../../components/characterDetails/NavigationTabs";
import { Character, DetailType } from "../../interfaces/marvelTypes";
import MarvelService from "../../services/marvelService";

interface Props
{
    character: Character;
    viewType: DetailType;
}

const ViewTypeIndexMap = new Map<DetailType, number>();
ViewTypeIndexMap.set( "comics", 0 );
ViewTypeIndexMap.set( "stories", 1 );
ViewTypeIndexMap.set( "events", 2 );
ViewTypeIndexMap.set( "series", 3 );

export const getServerSideProps: GetServerSideProps<Props> = async ( context ) =>
{
    const id = context.query[ "id" ] as string;
    const viewType = context.query[ "viewType" ] as DetailType;

    const idNumber = Number.parseInt( id );

    if ( Number.isNaN( idNumber ) )
    {
        return {
            props: {
                character: {} as Character,
                viewType: "",
            },
            notFound: true,
        }
    }

    const marvelService = new MarvelService();
    const result = await marvelService.getCharacter( idNumber );

    return {
        props: {
            character: result.results[ 0 ],
            viewType: viewType ?? "",
        }
    }
}

const Page = ( { character, viewType }: Props ) =>
{
    const [ selectedIndex, setSelectedIndex ] = useState( ViewTypeIndexMap.get( viewType ) ?? 0 );

    return (
        <>
            <DetailsHead character={character} />
            <NavigationTabs selectedIndex={selectedIndex} onSelectedIndexChanged={index => setSelectedIndex( index )} />
            {selectedIndex === 0 && character.comics.returned > 0 &&
                <DetailList key={"comics"} type="comics" characterId={character.id} />
            }
            {selectedIndex === 1 && character.stories.returned > 0 &&
                <DetailList key={"stories"} type="stories" characterId={character.id} />
            }
            {selectedIndex === 2 && character.events.returned > 0 &&
                <DetailList key={"events"} type="events" characterId={character.id} />
            }
            {selectedIndex === 3 && character.series.returned > 0 &&
                <DetailList key={"series"} type="series" characterId={character.id} />
            }
        </>
    );
}

export default Page;
