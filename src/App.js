import './App.css';
import React, { useState, useEffect } from "react";

// a function to create an item on the to do list
function Item(props) {
  // each item will change color based on its 'done' state
  const itemColor = props.done ? 'lightgreen' : 'lightpink'

  return (
    <div style={{ backgroundColor: itemColor, width: '500px', height: '100px' }} onClick={props.handleDone}>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <p>{props.deadline}</p>
    </div>
  )
}

// a function that displays the title of the webpage
function Title() {
  return (
    <h1>Todo List App</h1>
  )
}

// a global list variable that contains information for each task
const TASKS = [
  {
    title: 'laundry',
    description: 'wash clothes',
    deadline: 'tomorrow',
    done: 'false',
  }, {
    title: 'dishes',
    description: 'pots and pans',
    deadline: 'oct 30',
    done: 'false',
  },
  {
    title: 'taxes',
    description: 'dont get audited',
    deadline: 'nov 1',
    done: 'false',
  },
]

function App() {
  // the light or dark mode toggle
  const [mode, setMode] = useState('light');
  // the states of all tasks
  const [tasks, setTasks] = useState(TASKS);

  // a function that takes an index to indicate which item on the list should it modify
  // and flips the 'done' state of that item
  const handleDone = (index) => {
    // create a copy of all current tasks
    const newTasks = [...tasks];
    // flip the 'done' state of the item at index in this copy created
    newTasks[index].done = !newTasks[index].done;
    // set tasks to this copy
    setTasks(newTasks);
  }

  // a function that flips the light or dark mode based on current mode
  const switchMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else if (mode === 'dark') {
      setMode('light');
    }
  }

  // a variable that dictates the text color based on the light or dark mode
  const textColor = mode === 'light' ? 'black' : 'white';
  // a variable that dictaes the background color based on the light or dark mode
  const bgColor = mode === 'light' ? 'white' : 'darkgrey';

  // prints the current mode to console whenever the mode changes
  useEffect(() => {
    console.log(mode);
  }, [mode]);

  return (
    <div style={{ backgroundColor: bgColor, color: textColor }}>
      <Title />
      <button onClick={switchMode}>Dark Mode</button>
      <h2>Tasks to do for today</h2>
      <ul>
        { // for each task in the list of tasks, based on itself and its index,
        // create an Item in accordance to its fields
        tasks.map((task, index) => {
          return (
            // the handleDone value needs to be a function, thus the lambda expression instead of simply calling handleDone(index), which is what the function returns
            <Item title={task.title} description={task.description} deadline={task.deadline} done={task.done} handleDone={() => handleDone(index)} />
          )
        })}
      </ul>
    </div>
  );
}

export default App;
