  
import db from '../../db.json';

export default function handlerDB(req, res) {
  /* Tratamento do erro de CORS para requisição da API */
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  /* Resposta que vai ser exibida quando acessar a pagina de api/db para leitura do banco de dados */
  res.json(db);
}

/*
Exemplo de fetch 
fetch('http://localhost:3000/api/db').then( async(respostaDoServidor) => {
    const resposta = await respostaDoServidor.json()
    console.log(resposta)
})
*/