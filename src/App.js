
import './App.css';
import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";


const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");//titulo
  const [time, setTime] = useState("");//tempo da duração da tarefa
  const [todos, setTodos] = useState([]);//lista para inserir tarefas, começa vazia
  const [loading, setLoading] = useState(false);//carregar os dados e exibir carregamento para usuário

  //carregar os dados da API + endpoint
  useEffect(() => {
  const loadData = async() => {
    setLoading(true)

    //promise base
    //padrão já é get, nao precisa configurar parametros 
    const res = await fetch( API + "/todos:")
    .then((res) => res.json())
    .then((data) => data) //retorna os dados em um array de objetos
    .catch((err) => console.log(err));

    setLoading(false) //garantir que já carregou

    setTodos(res);//dados transformados

    };
    loadData();//recebendo os dados
}, []);


  const handleSubmit = async(e) => {
    //evento
    e.preventDefault();
    //parar o envio do formulario e deixar ele no fluxo da SPA

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

    await fetch(API + "/todos:", {
      //parametro da requisição
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
      //mandar objeto que foi criado como uma string
    });
   //fazer envio para API
   // console.log(todo);
    setTitle("");
    setTime("");

  };

  return (
    <div className="App">
      <div className="todo-header">
        <h1>To do</h1>
      </div>
      <div className="form-todo">
        <h2>Form: insira sua tarefa</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor="title">O que você vai fazer?</label>
            <input type="text" name="title" placeholder='Título da tarefa'
              onChange={(e) =>
                setTitle(e.target.value)}
              value={title || ""}
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor="time">Duração:</label>
            <input type="text" name="time" placeholder='tempo estimado em horas'
              onChange={(e) =>
                setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>
          <input type="submit" value="criar tarefa" />
        </form>
      </div>
      <div className="list-todo">
        <p>List:</p>
        {todos.length === 0 && <p> Crie sua primeira tarefa :) </p>}
      </div>

    </div>
  );
}

export default App;
