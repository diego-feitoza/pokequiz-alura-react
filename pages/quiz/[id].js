import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno, id }) {
  return (
    <div>
      <ThemeProvider theme={dbExterno.theme}>
        <QuizScreen
          externalQuestions={dbExterno.questions}
          externalBg={dbExterno.bg}
        />
        {/* <pre style={{color: 'black'}}>
                {id + '\n'}
                {JSON.stringify(dbExterno, null, 4) // Stringify adaptado
              </pre> */}        
      </ThemeProvider>
    </div>
  );
}

export async function getServerSideProps(context) {
  // console.log('Informações Next: ', context.query.id);
  const [projectName, githubUser] = context.query.id.split('___')

  const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
    .then(async (resposta) => {
      if (resposta.ok) {
        return resposta.json();
      }

      throw new Error('Falha em carregar os dados');
    })
    .then((respostaConvertida) => respostaConvertida)
    .catch((err) => {
      console.log('Erro: ', err);
      //redirect??
      //context.res... tratamento por status
    });

  // console.log('dbExterno: ', dbExterno);
  console.log('id: ', projectName);
  // console.log('name: ', context.query.name); //Caso queira usar o query para cada valor
  return {
    props: {
      dbExterno,
      id: projectName,
      name: githubUser,
    },
  };
}
