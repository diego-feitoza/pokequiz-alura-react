import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import {QuizLogoPoke} from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

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
        <QuizLogoPoke />
        <Widget
          as={motion.section}
          transition={{ delay: 0.3, duration: 0.5 }}
          variants={{
            show: {opacity: 1, y: '0'},
            hidden: {opacity: 0, y: '100%'}
          }}
          animate="show"
          initial="hidden" //de acordo com as variant
        >
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
        <Widget
          as={motion.section}
          variants={{            
            show: {opacity: 1, y: '0'},
            hidden: {opacity: 0, y: '100%'}
          }}
          transition={{ delay: 0.5, duration: 0.3 }}
          animate="show"
          initial="hidden"
        >
          <Widget.Header>
            <h1>Quiz da Galera</h1>
          </Widget.Header>

          <Widget.Content>
            <ul>
              {db.external.map((linkQuiz, index) => {
                const [projectName, githubUser] = linkQuiz.replace(/\//g,'')
                                                          .replace('https:','')                                                        
                                                          .replace('.vercel.app','')
                                                          .split('.') 
                return (
                  <li key={`linkAlura__${index}`}>
                    {/* <Widget.Topic href={`/quiz/${projectName}?name=${githubUser}`} title={`Link_externo_${index}`}> */} {/* Minha Versão */}
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                      title={`Link_externo_${index}`}> {/* Versão Curso */}
                      {`${projectName}/${githubUser}`}
                    </Widget.Topic>
                  </li>
                )
              })}
            </ul>

          </Widget.Content>

        </Widget>
        <Footer 
          as={motion.footer}
          variants={{            
            show: {opacity: 1, y: '0'},
            hidden: {opacity: 0, y: '100%'}
          }}
          transition={{ delay: 0.8, duration: 0.2 }}
          animate="show"
          initial="hidden"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/diego-feitoza/pokequiz-alura-react" />
    </QuizBackground>
  );
}
