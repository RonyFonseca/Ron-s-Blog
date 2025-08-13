import Header from "../../../components/Header/Header.jsx";
import styles from "./MyPosts.module.css";
import api from "../../../service/api.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import NotPost from "../../../components/NotPost/NotPost.jsx";

function MyPosts () {

    const [cards, setCards] = useState([]);
    const [exibir, setExibir] = useState(false); 
    const [exibirAlerta, setExibirAlterta] = useState(false);
    const [idPostDelete, setIdPostDelete] = useState("");

    const navigate = useNavigate(); 

    useEffect(() => {
        const myPosts = async() => {
            const res = await api.get(`${import.meta.env.VITE_URL_API}/posts/myPosts`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setCards(res.data.myPosts);

        }

        myPosts();
    },[])

    const data = (data) => {
        const dataFormatada = new Date(data); 

        const formatado = dataFormatada.toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        
        return formatado;
    }

    const horas = (hora) => {
        const dataFormatada = new Date(hora); 

        const formatado = dataFormatada.toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            hour:"2-digit",
            minute:"2-digit",
        });
        
        return formatado;
    }

    const toggleComentarios = (postId) => {
        setExibir(exibir === postId ? null : postId);
    };

    const editar = (idPost) => {
        navigate(`/myPosts/editar/${idPost}`)
    }

    const deletar = (idPost) => {
        setExibirAlterta(true);
        setIdPostDelete(idPost);
    }

    const confirmarDelete = async() => {
        setExibirAlterta(false);
        await api.delete(`${import.meta.env.VITE_URL_API}/posts/deletePost/${idPostDelete}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        const newCards = cards.filter((card) => card._id !== idPostDelete);

        setCards(newCards); 
    }

    const cancelarDelete = () => {
        setIdPostDelete(""); 
        setExibirAlterta(false);
    }

    return (
        <div>
            <Header link1="Blog" link2="Dashboard" to1="/blog" to2="/dash"/>
            {exibirAlerta && (
                <div id={styles.alerta}>
                    <h2>Alerta !</h2>
                    <p>Caso você <span>delete</span> o post não terá volta, uma vez deletado nunca mais você terá acesso a ele, deseja continuar ?.</p>
                    <button onClick={() => confirmarDelete()} id={styles.alertSim}>Sim</button>
                    <button onClick={() => cancelarDelete()} id={styles.alertNao}>Não</button>
                </div>
            )}
            <div className={styles.cards}>
                {cards.length==0? <NotPost msg="Você ainda não fez uma postagem"/> : cards.map((card, index) => 
                    <div key={index} className={styles.card}>

                        <div className={styles.cardHeader}> 
                            <div>
                                <h1>{card.title}</h1>
                                <p>{card.content}</p>
                            </div>
                            <div className={styles.buttonsCard}>
                                <button onClick={() => editar(card._id)} className={styles.editar}>Editar</button>
                                <button onClick={() => deletar(card._id)} className={styles.remover}>Remover</button>
                            </div>
                        </div>

                        <div className={styles.cardInformations}>
                            <div className={styles.informationsPost}>
                                <h5>Informações do post:</h5>
                                <ul>
                                    <li><i className="bi bi-heart-fill"></i>{card.likes.length}</li>

                                    <li>
                                        <button onClick={() => toggleComentarios(card._id)}><i className="bi bi-chat-fill"></i>{card.coments.length}</button>
                                    </li>

                                    <li><i className="bi bi-bookmarks-fill"></i>{card.saved.length}</li>
                                </ul>
                            </div>
                            <div className={styles.informationsDate}>
                                <h4><i className="bi bi-calendar-event-fill"></i> {data(card.createdAt)}</h4>
                                <h4><i className="bi bi-clock-fill"></i> {horas(card.createdAt)}</h4>
                            </div>
                        </div>

                        {exibir === card._id && (
                            <div className={styles.coments}>
                                <p>Comentários:</p>
                                {card.coments.map((coment, index) => 
                                    <div key={index}>
                                        <h5>{coment.userEmail}</h5>
                                        <p>{coment.contentComent}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyPosts; 