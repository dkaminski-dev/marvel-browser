import styled from "styled-components";
import CharacterList from "../../components/characterList/CharacterList";
import SearchBox from "../../components/characterList/SearchBox";

const FullScreenPage = styled.div`
    height: calc(100vh);

    @media (max-width: 768px) {
        height: calc(90vh);
    }

    display: flex;
    flex-direction: column;
`;

const List = () =>
{
    return (
        <FullScreenPage>
            <SearchBox></SearchBox>
            <CharacterList />
        </FullScreenPage>
    )
}

export default List;