import React, {useContext, useState} from "react";
import "./AuthPage.scss"
import {BrowserRouter, Switch, Link, Route, useHistory} from "react-router-dom"
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";

const AuthPage = () => {

    const history = useHistory()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const {login} = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            await axios.post('https://todoappmerncase.herokuapp.com/api/auth/registration', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const loginHandler = async () => {
        try {
            await axios.post('https://todoappmerncase.herokuapp.com/api/auth/login', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res=>{
                login(res.data.token, res.data.userId)
            })
        }  catch (e) {
            console.log(e)
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <div className="container">
                        <div className="auth-page">
                            <Route path="/login">
                                <h3>Авторизация</h3>
                                <form action="" className="form form-login" onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input type="email"
                                                   name="email"
                                                   onChange={changeHandler}
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input type="password"
                                                   name="password"
                                                   onChange={changeHandler}
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="waves-effect waves-light btn blue" onClick={loginHandler}>
                                            Войти
                                        </button>
                                    </div>
                                    <Link to="/registration" className={"btn-outline btn-reg"}>Нет аккаунта?</Link>
                                </form>
                            </Route>

                            <Route path="/registration">
                                <h3>Регистрация</h3>
                                <form action="" className="form form-login" onSubmit={e => e.preventDefault()}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input type="email"
                                                   name="email"
                                                   onChange={changeHandler}
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="input-field col s12">
                                            <input type="password"
                                                   name="password"
                                                   onChange={changeHandler}
                                            />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="waves-effect waves-light btn blue" onClick={registerHandler}>
                                            Регистрация
                                        </button>
                                    </div>
                                    <Link to="/login" className={"btn-outline btn-reg"}>Уже есть аккаунт?</Link>
                                </form>
                            </Route>
                        </div>
                    </div>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}

export default AuthPage