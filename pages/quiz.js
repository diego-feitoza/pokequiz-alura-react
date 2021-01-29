/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
// import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import GitHubCorner from '../src/components/GitHubCorner';
import Button from '../src/components/Button';

const LoadingWidget = () => {
  return(
    <Widget>
      <Widget.Header>
        Pokequiz
      </Widget.Header>
      <Widget.Content>
        <p>
          Loading...
        </p>
      </Widget.Content>
    </Widget>
  )
}

const ResultQuiz = () => {
  return(
    <Widget>
      <Widget.Header>
        Pokequiz
      </Widget.Header>
      <Widget.Content>
        <p>
          Parabéns! Você acertou X questões
        </p>
      </Widget.Content>
    </Widget>
  )
}


const QuesionWidget = ({
  question, 
  totalQuestion,
  questionId,
  onSubmit
}) => {
  const questionName = `querstionName__${questionId}`;
  return(
    <Widget>
        <Widget.Header>
          {/* <BackLinkArrow href="/" /> */}
      <h2>
        {`Pergunta ${questionId+1} de ${totalQuestion}`}
      </h2>
        </Widget.Header>
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />
        <Widget.Content>
          <h2>
              {question.title}
          </h2>
          <p>
            {question.description}
          </p>
            <form onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            >
            {question.alternatives.map((alternative, alternativeIndex) => {
              // console.log(alternative)
              const alternativeId = `alternative__${alternativeIndex}`
              return (
                <Widget.Topic
                  as="label"
                  htmlFor={alternativeId}
                >
                  <input 
                    // style={{display:'none'}}
                    id={alternativeId}
                    name={questionName}
                    type="radio"
                    />   
                  {alternative}                   
                </Widget.Topic>        
              );
            })} 
            <Button type="submit">
              Confirmar
            </Button>  
          </form>  
        </Widget.Content>
      </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

// [Ciclo de vida do ReactJS || React chama de Efeitos : Effects]
// useEffect() - é o nascer do componente
// assim que nasce === didMount
// quando for ser atualizado === willUpdate
// quando vai morrer === willUnmount

export default function QuizPage() {    
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    // console.log('Perguntas criadas: ', db.questions);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionId = currentQuestion;
    const question = db.questions[questionId];
    const totalQuestion = db.questions.length;
  
    // const name = routes.query.name; //Nome user do query
  
    React.useEffect(() => {
      //fetch() ...
      setTimeout(() => {
        setScreenState(screenStates.QUIZ);
      },1 * 1000)
      //nasce === didMount
    },[]) //callback);

    function handleSubmitQuiz() {
      const nextQuestion = questionId + 1;
      if (nextQuestion < totalQuestion) {
        setCurrentQuestion(nextQuestion);
      } else {
        setScreenState(screenStates.RESULT);
      }
    }

    return(
        <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuesionWidget
            question={question}
            totalQuestion={totalQuestion}
            questionId={questionId}
            onSubmit={handleSubmitQuiz}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultQuiz />}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/diego-feitoza/pokequiz-alura-react" />
    </QuizBackground>
    );
}