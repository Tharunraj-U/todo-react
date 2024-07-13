import React, { useEffect, useState } from 'react';
// Make sure you have the CSS file

const Todo = () => {
    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [isEditing, setIsEditing] = useState(null);
    const [editTask, setEditTask] = useState("");
    
    useEffect(() => {
        const storedTasks = localStorage.getItem('todos');
        console.log('Loaded tasks from local storage:', storedTasks);
        if (storedTasks) {
          setTask(JSON.parse(storedTasks));
        }
      }, []);
    
      // Save tasks to local storage whenever the task state changes
      useEffect(() => {
        console.log('Saving tasks to local storage:', task);
        localStorage.setItem('todos', JSON.stringify(task));
      }, [task]);

    function addList() {
        if (newTask.trim() !== "") {
            setTask(prev => [...prev, newTask]);
            setNewTask("");
        }
    }

    function delList(id1) {
        setTask(task.filter((_, id) => id !== id1));
    }

    function moveUP(id) {
        if (id === 0) return;
        const newarray = [...task];
        [newarray[id - 1], newarray[id]] = [newarray[id], newarray[id - 1]];
        setTask(newarray);
    }

    function moveDown(id) {
        if (id === task.length - 1) return;
        const newarray = [...task];
        [newarray[id + 1], newarray[id]] = [newarray[id], newarray[id + 1]];
        setTask(newarray);
    }

    function startEditing(id) {
        setIsEditing(id);
        setEditTask(task[id]);
    }

    function updateList(id) {
        if (editTask.trim() !== "") {
            const newarray = [...task];
            newarray[id] = editTask;
            setTask(newarray);
            setIsEditing(null);
            setEditTask("");
        }
    }

    return (
        <div className="todo-container">
            <div className='form'>
                <input 
                    id='input' 
                    value={newTask} 
                    onChange={e => setNewTask(e.target.value)}
                />
                <button onClick={addList}>ADD</button>
            </div>
            <div>
                <ul className="todo-list">
                    {task.map((val, id) => (
                        <li key={id}>
                            {isEditing === id ? (
                                <input
                                    value={editTask}
                                    onChange={e => setEditTask(e.target.value)}
                                />
                            ) : (
                                <span>{val}</span>
                            )}
                            <button onClick={() => delList(id)}>Delete</button>
                            <button onClick={() => moveUP(id)}>UP</button>
                            <button onClick={() => moveDown(id)}>Down</button>
                            {isEditing === id ? (
                                <button onClick={() => updateList(id)}>Save</button>
                            ) : (
                                <button onClick={() => startEditing(id)}>Update</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo;
