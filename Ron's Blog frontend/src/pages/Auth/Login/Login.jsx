import Input from "../../../components/Input/Input.jsx";
import Header from "../../../components/Header/Header.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

import api from "../../../service/api.js";

function Login(){
    const [valueEmail, setValueEmail] = useState("");
    const [valuePassword, setValuePassword] = useState("");

    const navigate = useNavigate();

    const handleValue = (e) => {
        e.preventDefault(); 

        const logar = async() => {
            try{
                const res = await api.post(`${import.meta.env.VITE_URL_API}/users/loginUser`,{
                email: valueEmail, 
                password: valuePassword
                },{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const token = res.data.Token
                localStorage.setItem('token', token.split(' ')[1]);
                navigate('/');
            }catch(err){
                navigate('/login');
            }
        }

        logar()
    }

    return (
        <div>
            <Header/>
            <div className={styles.login}>
                <h2>Login</h2>
                <form onSubmit={handleValue} className={styles.form}>
                    <Input iconName="bi bi-envelope" name="email" placeholder="Digite seu email" value={valueEmail} onchange={(e) => setValueEmail(e.target.value)}/>
                    <Input iconName="bi bi-lock" name="password" placeholder="Digite sua senha" value={valuePassword} onchange={(e) => setValuePassword(e.target.value)}/>
                    <div className={styles.infosForm}>
                        <p>Eu não tem <Link to="/create" className="colorTheme">uma conta!</Link></p>
                        <input type="submit" value="Acessar"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login