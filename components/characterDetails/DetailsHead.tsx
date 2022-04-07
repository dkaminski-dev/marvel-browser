import styled from "styled-components";
import { Character } from "../../interfaces/marvelTypes";

interface Props
{
    character: Character;
}

const HeadContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;

const HeadBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

const HeadContentBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const HeadContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Portrait = styled.div<{ bgSrc: string }>`
    min-width: 168px;
    min-height: 252px;
    background-image: url( ${p => p.bgSrc} );
    height: fit-content;
`;

const DetailsHead = ( { character }: Props ) =>
{
    const getImageSrc = () =>
    {
        const thumbnail = character.thumbnail;
        return `${thumbnail.path}/${"portrait_fantastic"}.${thumbnail.extension}`;
    }

    return (
        <HeadContainer>
            <HeadBox>
                <Portrait bgSrc={getImageSrc()}></Portrait>
                <HeadContentBox>
                    <HeadContent>
                        <span>Name:</span>
                        <span >{character.name}</span>
                    </HeadContent>
                    <HeadContent>
                        <span>Modified:</span>
                        <span >{new Date( character.modified ).toLocaleString( "de-DE" )}</span>
                    </HeadContent>
                </HeadContentBox>
            </HeadBox>
            {character.description !== "" && <HeadContent>
                <span>Description</span>
                <span style={{ fontSize: "13px" }}>{character.description}</span>
            </HeadContent>}
        </HeadContainer>
    );
}

export default DetailsHead;