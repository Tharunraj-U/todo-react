import React, { useEffect, useState } from 'react';

const Todo = () => {
    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [isEditing, setIsEditing] = useState(null);
    const [editTask, setEditTask] = useState("");

    // Load tasks from local storage when the component mounts
    useEffect(() => {
        const storedTasks = localStorage.getItem('todos');
        if (storedTasks) {
            try {
                setTask(JSON.parse(storedTasks));
            } catch (error) {
                console.error('Error parsing local storage data:', error);
            }
        }
    }, []);

    // Save tasks to local storage whenever the task state changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(task));
    }, [task]);

    // Function to add a new task
    const addList = () => {
        if (newTask.trim() !== "") {
            setTask(prev => [...prev, newTask]);
            setNewTask("");
        }
    };

    // Function to delete a task
    const delList = (id1) => {
        setTask(task.filter((_, id) => id !== id1));
    };

    // Function to move a task up
    const moveUP = (id) => {
        if (id === 0) return;
        const newarray = [...task];
        [newarray[id - 1], newarray[id]] = [newarray[id], newarray[id - 1]];
        setTask(newarray);
    };

    // Function to move a task down
    const moveDown = (id) => {
        if (id === task.length - 1) return;
        const newarray = [...task];
        [newarray[id + 1], newarray[id]] = [newarray[id], newarray[id + 1]];
        setTask(newarray);
    };

    // Function to start editing a task
    const startEditing = (id) => {
        setIsEditing(id);
        setEditTask(task[id]);
    };

    // Function to update a task after editing
    const updateList = (id) => {
        if (editTask.trim() !== "") {
            const newarray = [...task];
            newarray[id] = editTask;
            setTask(newarray);
            setIsEditing(null);
            setEditTask("");
        }
    };


    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <div className='flex items-center border-b border-gray-300 pb-4 mb-4'>
                <input
                    id='input'
                    className='rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-gray-100 w-full'
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                />
                <button onClick={addList} className='p-4 rounded-r-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none'>Add</button>
            </div>
            <div>
                <ul className="divide-y divide-gray-200">
                    {task.map((val, id) => (
                        <li key={id} className="py-4 flex items-center justify-between">
                            {isEditing === id ? (
                                <input
                                    value={editTask}
                                    onChange={e => setEditTask(e.target.value)}
                                    className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-gray-100 w-full"
                                />
                            ) : (
                                <span className="inline-block max-w-xs overflow-hidden overflow-ellipsis bg-gray-100 rounded-lg text-gray-700 px-4 py-2">
                                {val}
                              </span>
                              
                              
                            )}
                            <div className="flex gap-2">
                                <button onClick={() => delList(id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none">Delete</button>
                                <button onClick={() => moveUP(id)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">UP</button>
                                <button onClick={() => moveDown(id)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none">Down</button>
                                {isEditing === id ? (
                                    <button onClick={() => updateList(id)} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none">Save</button>
                                ) : (
                                    <button onClick={() => startEditing(id)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none">Edit</button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todo;
