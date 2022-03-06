import { useState } from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Food Shopping',
        day: 'Feb 6th at 10:29',
        reminder: true,
    },
    {
        id: 2,
        text: 'Meeting',
        day: 'Feb 6th at 10:29',
        reminder: true,
    },
    {
        id: 3,
        text: 'Dating',
        day: 'Feb 6th at 10:29',
        reminder: true,
    },

])

//add task
const addTask = (task) =>{
  const id = Math.floor(Math.random()*10000) + 1
  const newTask = {id, ...task}
  setTasks([...tasks, newTask])
}

//delted task
const deleteTask = (id) =>{
      setTasks(tasks.filter((tasks) => tasks.id !==id))
}

//toggle reminder
const toggleReminder = (id) => {
  setTasks(tasks.map((tasks) => tasks.id === id ? {...tasks, reminder: !tasks.reminder} : tasks))
}

  return (
    <Router>
      <div className='container'>
        <Header title='Task Tracker'
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
