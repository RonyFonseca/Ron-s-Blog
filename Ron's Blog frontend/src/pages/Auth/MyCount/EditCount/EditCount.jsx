import { useEffect, useState } from "react";
import styles from "./EditCount.module.css";
import api from "../../../../service/api";
import { useNavigate } from "react-router-dom";

function EditCount(){

    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const pegarUser = async() =>  {
            const res = await api.get(`${import.meta.env.VITE_URL_API}/users/getUser`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setName(res.data.name);
            setAge(res.data.age)
        }

        pegarUser();
    },[])

    const atualizarUser = async(e) => {
        e.preventDefault();

        const res = await api.put(`${import.meta.env.VITE_URL_API}/users/editUser`, {
            name, 
            age
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(res.statusText == "Created"){
            navigate("/myCount");
        }
    
    }

    return (
        <div id={styles.editCount}>
            <button onClick={() => navigate("/myCount")}><i className="bi bi-arrow-bar-left"></i></button>
            <form onSubmit={(e) => atualizarUser(e)} id={styles.editCountForm}>
                <h3>Edite sua informações</h3>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label>Idade:</label>
                    <input type="text" value={age} onChange={(e) => setAge(e.target.value)}></input>
                </div>
                <button type="submit">Atualizar</button>
            </form>
        </div>
    )
}

export default EditCount;