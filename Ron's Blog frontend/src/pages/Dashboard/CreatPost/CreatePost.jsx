import styles from "./CreatePost.module.css";
import Header from "../../../components/Header/Header.jsx";
import api from "../../../service/api.js";
import { useState } from "react";

function CreatePost (){

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        const res = await api.post(`${import.meta.env.VITE_URL_API}/posts/createPost`,{
            title,
            content,
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setContent("");
        setTitle("");
    }

    return(
        <div>
            <Header link1="Blog" link2="Dashboard" to1="/blog" to2="/dash"/>
            <form onSubmit={handleSubmit} id={styles.formPost}>
                <h2>Crie seu comentário</h2>
                <input type="text" placeholder="Digite o titulo" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <div>
                    <button type="submit">Publicar</button>
                </div>
                <p id={styles.atention}><span className="colorTheme">Atenção:</span> Comentários ofensivos, conteúdos impróprios ou desrespeitosos não serão tolerados e poderão ser removidos. Mantenha o respeito!</p>
            </form>
        </div>
    )
}

export default CreatePost;