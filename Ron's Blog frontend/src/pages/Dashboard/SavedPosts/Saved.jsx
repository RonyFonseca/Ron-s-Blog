import styles from "./Saved.module.css"; 
import Header from "../../../components/Header/Header.jsx"
import { useEffect, useState } from "react";

import api from "../../../service/api";

function Saved(){

    const [mySaves, setMySaves] = useState([]);
    const [saved, setSaved] = useState(true); 

    useEffect(() => {
        const getPosts = async() => {
            const res = await api.get(`${import.meta.env.VITE_URL_API}/posts/mySaves`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                }
                
            })
            setMySaves(res.data.mySaves);
        }

        getPosts();
    },[])

    const salvar = async(idPost) => {
        await api.post(`${import.meta.env.VITE_URL_API}/posts/savePost/${idPost}`, {},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setSaved(saved? false:true); 
    }

    return (
        <div>
            <Header link1="Blog" link2="Dashboard" to1="/blog" to2="/dash"/>
            {mySaves.map((card, index) => (
                <div key={index} className={styles.cardSave}>
                    <h3>{card.title}</h3>
                    <p>{card.content}</p>
                    <div>
                        <h5><i className="bi bi-person"></i>{card.postOwner.email}</h5>
                    </div>
                    <button onClick={() => salvar(card._id)}><i className={saved? "bi bi-bookmark-fill":"bi bi-bookmark"}></i></button>
                </div>
            ))}
        </div>
    )
}

export default Saved; 