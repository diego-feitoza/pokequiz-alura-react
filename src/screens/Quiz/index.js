/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import React from 'react';
// import { useRouter } from 'next/router';

import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import GitHubCorner from '../../components/GitHubCorner';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';

const LoadingWidget = () => {
  return(
    <Widget>
      <Widget.Header>          
        <BackLinkArrow href="/" />
        Pokequiz
      </Widget.Header>
      <Widget.Content>
        <img src="https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif" alt="Loading..." style={{'width':'285px'}}/>
      </Widget.Content>
    </Widget>
  )
}

const ResultQuiz = ({ results }) => {
  let somatorio = results.length ? results.filter((x) => x).length : 0;
  return(
    <Widget>
      <Widget.Header>          
        <BackLinkArrow href="/" />
        Resultado do Pokequiz
      </Widget.Header>
      <Widget.Content>
        <p>
          Parabéns! Você acertou 
          {' '}
          {/*results.reduce( (somatoriaAtual, resultAtual) => {
            const isAcero = resultAtual === true
            if(isAcero) return (somatoriaAtual + 1)
            
            return somatoriaAtual 
          }, 0)*/}
          {somatorio}
          {' '} 
          {somatorio > 1 ? `questões` : `questão`}
        </p>
        <ul>
          {/* No map é necessario usar a arrow function com um return .map(() => ()) */}
          {console.log('Results: ',results)}
          {results.map((result, index) => ( 
              <li key={`$resultado__${result}-#${('0'+(index+1)).slice(-2)}`}>
                {`#${('0'+(index+1)).slice(-2)} - ${result ? 'Acertou' : 'Errou'}`}
              </li>
            ))}
        </ul>
      </Widget.Content>
    </Widget>
  )
}


const QuesionWidget = ({
  question, 
  totalQuestion,
  questionId,
  onSubmit,
  addResult
}) => {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined)
  const questionName = `querstionName__${questionId}`;
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const isCorrect = selectedAlternative === question.answer //Estudar essa estrutura
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return(
    <Widget>
        <Widget.Header>
            <BackLinkArrow href="/" />
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
            <AlternativesForm onSubmit={(e) => {
              e.preventDefault();
              setIsQuestionSubmited(true);
              console.log('selectedAlternative: ', selectedAlternative)
              setTimeout(() => {   
                addResult(isCorrect);
                onSubmit();
                setIsQuestionSubmited(false);
                setSelectedAlternative(undefined); //Voltar input selecionado para o estado inicial  
                console.log('selectedAlternative: ', selectedAlternative) 
              }, 2000)
            }}
            >
            {question.alternatives.map((alternative, alternativeIndex) => {
              // console.log(alternative)
              const alternativeId = `alternative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
              const isSelected = selectedAlternative === alternativeIndex

              return (
                <Widget.Topic
                  as="label"
                  key={alternativeId}
                  htmlFor={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited ? alternativeStatus : ''}
                >
                  <input 
                    style={{display:'none'}}
                    id={alternativeId}
                    name={questionName}
                    onChange={() => { setSelectedAlternative(alternativeIndex) }}
                    type="radio"
                  />   
                  {alternative}                   
                </Widget.Topic>        
              );
            })} 
            <Button type="submit" disabled={!hasAlternativeSelected}>
              Confirmar
            </Button>  
            {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
            {isQuestionSubmited && !isCorrect && <p>Você errou!</p>} 
          </AlternativesForm>  
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

export default function QuizPage({ externalQuestions, externalBg }) {    
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    // console.log('Perguntas criadas: ', db.questions);
    const [results, setResults] = React.useState([]); //Um array pode ser usado para salvar true ou false caso erre
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionId = currentQuestion;
    const question = externalQuestions[questionId];
    const totalQuestion = externalQuestions.length;
    const bg = externalBg;
  
    // const name = routes.query.name; //Nome user do query

    const addResult = (result) => {
      setResults([
        ...results,
        result
      ])
    }
  
    React.useEffect(() => {
      // console.log('Quiz: ', question);
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
        <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuesionWidget
            question={question}
            totalQuestion={totalQuestion}
            questionId={questionId}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultQuiz results={results}/>}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/diego-feitoza/pokequiz-alura-react" />
    </QuizBackground>
    );
}