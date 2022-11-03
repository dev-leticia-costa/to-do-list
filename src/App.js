
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
      //mandar objeto que foi criado como uma string, aqui os dados foram adicionados com sucesso
        });
   //fazer envio para API 
   // previews state: estado anterior do argumento no front end, para não precisar dar refresh
 
   setTodos((prevState) => [...prevState, todo]);
    setTitle("");
    setTime("");
  };

  const handleEdit = async (todo) => {
  todo.done = !todo.done;
  const data = await fetch(API + "/todos:"+ todo.id, {
      //parametro da requisição
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },

      });
      //front
      setTodos((prevState) => prevState.map((t) => (t.id ===data.id ? (t=data) : t)));
      //pegar todos os todo e comparar apra ver se foi deletado
             
  };

  const handleDelete = async (id) => {
    //delete method (back)

     await fetch(API + "/todos:"+ id, {
      //parametro da requisição
      method: "DELETE"
      });
      //front
      setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
      //pegar todos os todo e comparar apra ver se foi deletado
             
  };

  if (loading) {
    return <p> Só mais uns instantes...</p>
  }

  return (
    <div className="App">
      <div className="todo-header">
        <h1>To do</h1>
      </div>
      <div className="form-todo">
        <h2>Crie sua tarefa</h2>
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
        <h2>List:</h2>
        {todos.length === 0 && <p> Crie sua primeira tarefa :) </p>}
        {todos.map((todo) => (
          <div className='todo.key' key={todo.id}>
            <h3 className= {todo.done ? "todo-done" : ""}>{todo.title}</h3>
            <p>Duração: {todo.time}</p>
            <div className= "actions">
            <span onClick = {() => handleEdit(todo)}>
              {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill></BsBookmarkCheckFill>}
            </span>
            <BsTrash onClick = {() => handleDelete(todo.id)}/>
            </div>
      </div>
        ))}
    </div>
    </div>
  );
}

export default App;
