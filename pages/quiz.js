import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function QuizPage() {
    const routes = useRouter();   
    const name = routes.query.name;
    return(
        <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>
                Olá =] {name}                 
            </h1>
          </Widget.Header>
          <Widget.Content>
            <h2>
                Vamos jogar?
            </h2>
            <p>
                Mussum Ipsum, cacilds vidis litro abertis. Detraxit consequat et quo num tendi nada. Cevadis im ampola pa arma uma pindureta. Pra lá , depois divoltis porris, paradis. Manduma pindureta quium dia nois paga.
            </p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/diego-feitoza/pokequiz-alura-react" />
    </QuizBackground>
    );
}