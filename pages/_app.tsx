import type { AppProps } from 'next/app';
import { Provider } from "react-redux";
import styled from "styled-components";
import store from "../store/store";
import '../styles/globals.css';

const PageBox = styled.div`
    display: flex;
    justify-content: center;
`;

const PageContent = styled.div`
    display: flex;
    flex-direction: column;

    width: 61%;

     @media (max-width: 768px) {
        width: 100%;
    }
`;

function MyApp( { Component, pageProps }: AppProps )
{
    return (
        <Provider store={store}>
            <PageBox>
                <PageContent>
                    <Component {...pageProps} />
                </PageContent>
            </PageBox>
        </Provider>
    );
}

export default MyApp
