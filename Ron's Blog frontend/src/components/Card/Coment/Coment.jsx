import { useEffect, useState } from "react";
import api from "../../../service/api"
import styles from "./Coment.module.css";

function Coment(props){

    const [message, setMessage] = useState("");
    const [comentarios, setComentario] = useState(props.coments);


    const handleSubmit = async(e) => {
        e.preventDefault(); 

        const comentario = await api.post(`${import.meta.env.VITE_URL_API}/posts/comentPost/${props.idPost}`,{contentComent: message},
            {headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
        );

        setComentario(comentario.data.newPost.coments);
        props.novoComent(comentario.data.newPost);
        setMessage("");

    }
    
    return (
        <div className={styles.coments}>
        {comentarios.map((e, index) => (<div key={index} className={styles.coment}>

            <p className={styles.titleComent}>@{e.userEmail}</p>
            <p className={styles.bodyComent}>{e.contentComent}</p>

        </div>))}
            <form id={styles.inputComent} onSubmit={(e) => handleSubmit(e)}>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <div>
                    <button type="submit">Comentar</button>
                    <nav>
                        <button type="button" onClick={() => setMessage(message+"📚")}>📚</button>
                        <button type="button" onClick={() => setMessage(message+"💻")}>💻</button>
                        <button type="button" onClick={() => setMessage(message+"👏")}>👏</button>
                        <button type="button" onClick={() => setMessage(message+"😎")}>😎</button>
                        <button type="button" onClick={() => setMessage(message+"👍")}>👍</button>
                    </nav>
                </div>
            </form>
        </div>
    )
}

export default Coment;