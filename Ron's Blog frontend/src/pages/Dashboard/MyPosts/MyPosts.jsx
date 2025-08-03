import Header from "../../../components/Header/Header.jsx";
import styles from "./MyPosts.module.css";
import api from "../../../service/api.js";
import { useEffect, useState } from "react";

function MyPosts () {

    const [cards, setCards] = useState([]);

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

    return (
        <div>
            <Header link1="Blog" link2="Dashboard" to1="/blog" to2="/dash"/>
            {cards.map((card, index) => 
                <div key={index} className={styles.card}>

                    <div className={styles.cardHeader}> 
                        <div>
                            <h1>{card.title}</h1>
                            <p>{card.content}</p>
                        </div>
                        <div className={styles.buttonsCard}>
                            <button>Editar</button>
                            <button>Remover</button>
                        </div>
                    </div>

                    <h4>Data da postagem: <i className="bi bi-calendar-event-fill"></i> {data(card.createdAt)}</h4>
                    <h4>Hora da postagem: <i className="bi bi-clock-fill"></i> {horas(card.createdAt)}</h4>
                    <div>
                        <h5>Informações do post:</h5>
                        <ul>
                            <li>Curtidas:{card.likes.length}</li>
                            <li>Comentários:{card.coments.length}</li>
                            <li>Salvos:{card.saved.length}</li>
                        </ul>
                    </div>
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
    )
}

export default MyPosts; 