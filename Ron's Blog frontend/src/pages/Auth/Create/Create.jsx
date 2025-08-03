import styles from "./Create.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Header from "../../../components/Header/Header";
import Input from "../../../components/Input/Input";

import api from "../../../service/api.js";

function Create(){

    const [valueName, setValueName] = useState("");
    const [valueEmail, setValueEmail] = useState("");
    const [valueAge, setValueAge] = useState(0);
    const [valuePassword, setValuePassword] = useState("");
    const [valueConfirmPassword, setValueConfirmPassword] = useState("");

    const navigate = useNavigate()
    
    const handleValue = (e) => {
        e.preventDefault();

        const logar = async() => {
            try{
                const res = await api.post(`${import.meta.env.VITE_URL_API}/users/createUser`,{
                    name: valueName, 
                    email: valueEmail, 
                    age: valueAge,
                    password: valuePassword,
                    confirmPassword: valueConfirmPassword,
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
            <Header link1="Blog" link2="Logar" to1="/blog" to2="/login"/>
            <div className={styles.create}>
                <h2>Criar conta</h2>
                <form onSubmit={handleValue} className={styles.form}>
                    <Input iconName="bi bi-person-fill" name="name" placeholder="Digite o nome do usuário" value={valueName} onchange={(e) => setValueName(e.target.value)}/>
                    <Input iconName="bi bi-envelope" name="email" placeholder="Digite o E-mail" value={valueEmail} onchange={(e) => setValueEmail(e.target.value)}/>
                    <Input iconName="bi bi-envelope" name="age" placeholder="Digite sua idade" value={valueAge} onchange={(e) => setValueAge(e.target.value)}/>
                    <Input iconName="bi bi-lock" name="password" placeholder="Digite a senha" value={valuePassword} onchange={(e) => setValuePassword(e.target.value)}/>
                    <Input iconName="bi bi-lock" name="password" placeholder="Confirme a senha" value={valueConfirmPassword} onchange={(e) => setValueConfirmPassword(e.target.value)}/>
                    <div className={styles.infosForm}>
                        <p>Eu já tenho <Link to="/login" className="colorTheme">uma conta!</Link></p>
                        <input type="submit" value="Criar"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create