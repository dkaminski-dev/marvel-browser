import { CircularProgress, TableContainer } from "@mui/material";
import { useRef } from "react";
import styled from "styled-components";
import { useInfiniteScrolling } from "../hooks/useInfiniteScrolling";

interface Props
{
    onNextDataRequested: () => Promise<void>;
    isLoading: boolean;
    hasMoreData: boolean;
    hasData: boolean;
    children: React.ReactNode;
}

const Center = styled.div`
    display: flex;
    justify-content: center;
`;

const InfiniteList = ( { onNextDataRequested, isLoading, hasMoreData, hasData, children }: Props ) =>
{
    const scrollRef = useRef<HTMLDivElement>( null );

    useInfiniteScrolling( scrollRef, 20, async () =>
    {
        if ( hasMoreData && !isLoading )
        {
            await onNextDataRequested();
        }
    } )

    return (
        <TableContainer style={{ margin: 'auto', height: '100%' }} ref={scrollRef}>
            {children}
            {isLoading === true &&
                <Center>
                    <CircularProgress />
                </Center>
            }
            {isLoading === false && hasData === false &&
                <Center>
                    No results found :-(
                </Center>
            }
        </TableContainer>
    );
}

export default InfiniteList;