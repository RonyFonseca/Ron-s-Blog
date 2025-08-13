import { useEffect, useState } from "react";
import styles from "./Editar.module.css"; 
import api from "../../../../service/api.js"

import { useNavigate, useParams } from "react-router-dom";

function Editar() {

    const {id} = useParams(); 

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const post = async() => {
            const res = await api.get(`${import.meta.env.VITE_URL_API}/posts/getPost/${id}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setTitle(res.data.post.title);
            setContent(res.data.post.content); 
        }

        post();
    },[id])

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const res = await api.put(`${import.meta.env.VITE_URL_API}/posts/editPost/${id}`,{
            title,
            content,
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(res.status ==200){
            navigate("/myposts");
        } 
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit} id={styles.formPost}>
                <h2>Edite seu comentário</h2>
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

export default Editar; 