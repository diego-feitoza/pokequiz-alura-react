import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head'; // Adicionando dados ao head html - Metadados
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      /* New styles */
      display: flex;
      flex-direction: column;
      font-family: 'Lato', sans-serif;
      // Deixa branco no começo
      color: ${({ theme }) => theme.colors.contrastText};
    }
    html, body {
      min-height: 100vh;
    }
    #__next {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokechat - Imersão React Alura </title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
