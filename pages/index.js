import styled from 'styled-components'
import db from '../db.json'

import Widget from '../src/components/Widget'

// Montando componente a partir do styled component
const Background = styled.div`
    background-image: url(${db.bg});
    flex: 1;
    background-size: cover;
    background-position: center;
`;

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

// Montando componente a partir de uma função JS
// function Title(props){ //Propcidade/propriedades
//   return (
//     <h1>
//       {props.children}
//     </h1>
//   )
// }

export default function Home() {
  return (
    <Background>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Pokemon</h1>
          </Widget.Header>

          <Widget.Content>
            <p>Hello World! Hello World! Hello World! Hello World! </p>
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
      </QuizContainer>
    </Background>
  );
}
