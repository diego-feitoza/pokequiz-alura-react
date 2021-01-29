import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

// Montando componente a partir do styled component
// const Background = styled.div`
//     background-image: url(${db.bg});
//     flex: 1;
//     background-size: cover;
//     background-position: center;
// `;


export default function Home() {  
  const router = useRouter();
  let [name, setName] = React.useState('');
  // console.log(`useState: ${name}`)

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Pokemon</h1>
          </Widget.Header>

          <Widget.Content>
            <form onSubmit={(e) => {
              e.preventDefault();
              // console.log('Submit React');
              
              router.push(`/quiz?name=${name}`);
              //Router para a proxima pagina
            }}
            >
              <Input
                name="nomeUsuario"
                placeholder="Fala teu nome ai =]" 
                onChange={(e) => {
                  // name = e.target.value
                  setName(e.target.value)
                }}
              />
              <Button
                type="submit"
                disabled={!name}>
                Jogar
                {name ? ` | ${name}` : ``}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Quiz da Galera</h1>
          </Widget.Header>

          <Widget.Content>
            <p>Hello World! Hello World! Hello World! Hello World! </p>
          </Widget.Content>

        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/diego-feitoza/pokequiz-alura-react" />
    </QuizBackground>
  );
}
