import React, { useState, useEffect } from 'react';
import { db, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from '../firebaseConfig';
import { query, where } from 'firebase/firestore';
import { useAuth } from './authProvider'; // Assurez-vous d'importer le contexte correctement
import "./todo.css"

const TodoList = () => {
    const { userId } = useAuth(); // Récupération de l'UID de l'utilisateur
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editing, setEditing] = useState(null);
    const [editTodoTitle, setEditTodoTitle] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            if (userId) {
                const q = query(collection(db, 'todos'), where('userId', '==', userId));
                const querySnapshot = await getDocs(q);
                setTodos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }
        };

        fetchTodos();
    }, [userId]);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (!newTodo) return;
        const docRef = await addDoc(collection(db, 'todos'), { title: newTodo, completed: false, userId });
        setTodos([...todos, { id: docRef.id, title: newTodo, completed: false, userId }]);
        setNewTodo('');
    };

    const handleUpdateTodo = async (id, updatedFields) => {
        const todoRef = doc(db, 'todos', id);
        await updateDoc(todoRef, updatedFields);
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, ...updatedFields } : todo)));
    };

    const handleDeleteTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id));
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <h2>Todo List</h2>
            <form onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New Todo"
                    required
                />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {editing === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTodoTitle}
                                    onChange={(e) => setEditTodoTitle(e.target.value)}
                                    placeholder="Edit Todo"
                                    required
                                />
                                <button onClick={() => handleUpdateTodo(todo.id, { title: editTodoTitle })}>Save</button>
                                <button className='delete' onClick={() => { setEditing(null); setEditTodoTitle(''); }}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {todo.title}
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleUpdateTodo(todo.id, { completed: !todo.completed })}
                                />
                                <button onClick={() => { setEditing(todo.id); setEditTodoTitle(todo.title); }}>Edit</button>
                                <button className='delete' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
