import React, {useState, useContext, useCallback, useEffect} from "react";
import "./MainPage.scss"
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";

const MainPage = () => {
    const [text, setText] = useState('')
    const {userId} = useContext(AuthContext)
    const [todos, setTodos] = useState([])

    const getTodo = useCallback(async () => {
        try {
            await axios.get('https://todoappmerncase.herokuapp.com/api/todo', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
                .then((res) => setTodos(res.data))
        } catch (e) {
            console.log(e)
        }
    }, [userId])


    const createToDo = useCallback(async () => {
        if (!text) return null
        try {
            await axios.post('https://todoappmerncase.herokuapp.com/api/todo/add', {text, userId}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                setTodos([...todos], res.data)
                getTodo()
                setText('')
            })
        } catch (e) {
            console.log(e)
        }
    }, [text, userId, todos, getTodo])

    const removeTodo = useCallback(async (id) => {
        try {
            await axios.delete(`https://todoappmerncase.herokuapp.com/api/todo/delete/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            }).then(() => getTodo())
        } catch (e) {
            console.log(e)
        }
    }, [])

    const completedTodo = useCallback(async id => {
        try {
            await axios.put(`https://todoappmerncase.herokuapp.com/api/todo/complete/${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                setTodos([...todos], res.data)
                getTodo()
            })
        } catch (e) {
            console.log(e)
        }
    }, [getTodo, todos])

    const importantTodo = useCallback(async id => {
        try {
            await axios.put(`https://todoappmerncase.herokuapp.com/api/todo/important//${id}`, {id}, {
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                setTodos([...todos], res.data)
                getTodo()
            })
        } catch (e) {
            console.log(e)
        }
    }, [getTodo, todos])

    useEffect(() => {
        getTodo()
    }, [getTodo])

    return (
        <div className='container'>
            <div className="main-page">
                <h4>Добавить задачу</h4>
                <form action="" className="form form-login" onSubmit={e => e.preventDefault()}>
                    <div className="input-field col s12">
                        <input
                            type="text"
                            id="text"
                            name="input"
                            value={text}
                            onChange={event => {
                                setText(event.target.value)
                            }}

                        />
                        <label htmlFor="input">Задача:</label>
                    </div>
                    <div className="row">
                        <button className="waves-effect waves-light btn btn cyan darken-2"
                                onClick={createToDo}>Добавить
                        </button>
                    </div>
                </form>
                <h3>Активные задачи:</h3>
                <div className="todos">
                    {todos.map((todo, index) => {
                        let cls = ['row flex todos-item']
                        if (todo.completed) {
                            cls.push('completed')
                        }
                        if (todo.important) {
                            cls.push('important')
                        }
                        return (
                            <div className={cls.join(' ')} key={index}>
                                <div className="col todos-num">{index + 1}</div>
                                <div className="col todos-text">{todo.text}</div>
                                <div className="todos-buttons col">
                                    <i className="material-icons cyan-text"
                                       onClick={() => completedTodo(todo._id)}>check</i>
                                    <i className="material-icons orange-text"
                                       onClick={() => importantTodo(todo._id)}>warning</i>
                                    <i className="material-icons red-text"
                                       onClick={() => removeTodo(todo._id)}>delete</i>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MainPage

