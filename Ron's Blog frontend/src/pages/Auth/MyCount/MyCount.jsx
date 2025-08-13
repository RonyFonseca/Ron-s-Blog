import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Header.jsx";
import styles from "./MyCount.module.css";
import { useState } from "react";
import api from "../../../service/api.js";


function EditCount() {

    const navigate = useNavigate(); 
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");

    useState(() => {
        const pegarUser = async() =>  {
            const res = await api.get(`${import.meta.env.VITE_URL_API}/users/getUser`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setName(res.data.name);
            setAge(res.data.age);
            setEmail(res.data.email);
        }
        pegarUser();
    },[])

    const deslogar = () => {
        localStorage.removeItem('token'); 
        navigate("/login");
    }

    return (
        <div>
            <Header link1="Blog" link2="Dashboard" to1="/blog" to2="/dash"/>
            <main>
                <div id={styles.body}>
                    <div id={styles.headprofile}>
                        <i className="bi bi-person"></i>
                    </div>
                    <div id={styles.bodyProfile}>
                        <ul>
                            <li><i className="bi bi-person-fill"></i>Nome:<span>{name}</span></li>
                            <li><i className="bi bi-gift-fill"></i>Idade:<span>{age}</span></li>
                            <li><i className="bi bi-envelope-at-fill"></i>Email:<span>{email}</span></li>
                        </ul>
                    </div>
                </div>
                <div id={styles.buttons}>
                    <div>
                        <button onClick={() => navigate("/editCount")}>Editar</button>
                        <p>Aqui você poderá editar as informações de sua conta.</p>
                    </div>
                    <div>
                        <button onClick={() => deslogar()}>Deslogar</button>
                        <p>Caso deslogue você vai manter suas informações salvas, basta apenas logar novamente.</p>
                    </div>
                    <div>
                        <button>Deletar Conta</button>
                        <p>Em caso de deletar sua conta, você não poderá recuperala depois então pense muito bem antes de realizar essa ação.</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default EditCount; 