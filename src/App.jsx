import AddTask from "./components/AddTask";
import Tasks   from "./components/Tasks";
import './App.css'

import { useEffect, useState } from "react";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState( JSON.parse(localStorage.getItem("tasks")) || []);
  // [
  //   {
  //     id : 1,
  //     title : "Estudar programação",
  //     description : "Estudar programação para se tornar um desenvolvedor full stack",
  //     isCompleted : false
  //   },
  //   {
  //     id : 2,
  //     title : "Estudar inglês",
  //     description : "Estudar inglês para se tornar fluente",
  //     isCompleted : false
  //   },
  //   {
  //     id : 3,
  //     title : "Estudar matemática",
  //     description : "Estudar matemática para se evoluir meu nivel tecnico de resolução de problemas",
  //     isCompleted : false
  //   }
  // ]
  // );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);

  // useEffect(() =>{

  //   const fetchTask = async () => {

  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

  //     const data = await response.json();
      
      
  //     setTasks(data);

  //   };
  //   fetchTask();
  // }, [])

  function onTaskClick(taskId) {
    const newTasks = tasks.map(task => {

      // PRECISO ATUALIZAR ESSA TAREFA
      if(task.id === taskId){
        return { ...task, isCompleted: !task.isCompleted }
      }

      return task;
    });
    setTasks(newTasks);
  }

  function OnDeleteTaskClick(taskId) {
    const newTask = tasks.filter(task => task.id !== taskId)
    setTasks(newTask)
  }

  function OnAddTaskSubmit(title, description) {
    const newTask = {
      id          : v4(),
      title       : title,
      description : description,
      isCompleted : false
    }
    setTasks([...tasks, newTask])
  }

  return (
    <>
      <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
        <div className="w-[500px] space-y-4">
          <h1 className="text-3xl text-slate-100 font-bold text-center py-3">Gerenciador de Tarefas</h1>
          <AddTask OnAddTaskSubmit={OnAddTaskSubmit} />
          <Tasks tasks={tasks} onTaskClick={onTaskClick} OnDeleteTaskClick={OnDeleteTaskClick}/>
        </div>
      </div>
    </>
  )
}

export default App;
