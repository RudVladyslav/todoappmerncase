import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

const Navbar = () => {
    const {logout, isLogin} = useContext(AuthContext)


    return (
        <nav>
            <div className="nav-wrapper cyan darken-2">
                <a href="/" className="brand-logo center">ToDoApp</a>
                {isLogin
                    ? <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a href="/" onClick={logout}>Выйти</a></li>
                    </ul>
                    :<ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a href="/">Войти</a></li>

                    </ul>
                }
            </div>
        </nav>
    )
}

export default Navbar