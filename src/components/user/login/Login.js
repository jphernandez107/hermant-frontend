import React, { useEffect, useState, useContext } from "react";
import "./Login.scss";
import Button from "components/button/Button";
import Input from "components/input/Input";
import { useNavigate } from "react-router-dom";
import { UserContext } from "context/Context";

const api = require("api/Api").default;

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [animation, setAnimation] = useState(false);

    const handleError = (error) => {
        console.error(error);
        setErrorMessage("Invalid username or password");
        localStorage.removeItem('token'); // Ensure we clear token on login fail
        localStorage.removeItem('user');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        startAnimation();
        try {
            const body = {
                dni: username.toString(),
                password: password.toString()
            }
            const response = await api.postSignIn(body)   
            if (!response) return handleError()

            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
            setUser(response.user);
            navigate('/')
        } catch (error) {
            handleError(error)
        }
        stopAnimation()
    };

	return (
		<div className="login-page-wrapper">
            <div className="left-container">
                <div className="image-container">
                    <img
                        className="nav-footer-avatar"
                        src="/dist/img/signin-logo.png"
                        alt=""
                    />
                </div>
                <p className="brand-text">Administrá tus equipos de la mejor manera</p>
            </div>

            <div className="right-container">
                <div className="login-container">
                    <h2>Sign In</h2>
                    <form>
                        <Input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorMessage &&
                            <div className="error-message-container">
                                <p className="error-message">* {errorMessage}</p>
                            </div>}
                        <Button onClick={handleSubmit} disabled={animation}>
                            {animation === false && <><i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In</>}
                            {animation === true && <><i className="fa-solid fa-spinner fa-spin-pulse"></i> Signing In</>}
                        </Button>
                    </form>
                    <a href="/forgot-password">Forgot password?</a>
                </div>
            </div>
		</div>
	);

    function startAnimation() {
        setAnimation(true);
    }

    function stopAnimation() {
        setAnimation(false);
    }
};

export default Login;