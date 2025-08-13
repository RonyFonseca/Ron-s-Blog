import styles from "./Home.module.css";
import Header from "../../components/Header/Header.jsx"; 

import {Link} from "react-router-dom";

import Card from "../../components/Card/Card.jsx";
import { useEffect,useState } from "react";

import api from "../../service/api.js";

import NotPost from "../../components/NotPost/NotPost.jsx"

function Home(){

    const [token] = useState(localStorage.getItem("token"));
    const [card, setCard] = useState([]);

    useEffect(() => {
        const chamarCards = async() => {
            const cards = await api.get(`${import.meta.env.VITE_URL_API}/posts/getAllPost`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCard(cards.data);
        }

        chamarCards();
    },[])

    const dataHora = (dataHora) => {
        const dataFormatada = new Date(dataHora); 

        const formatado = dataFormatada.toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        
        return formatado;
    }

    return (
        <div>
            <Header link1="Blog" link2="Dashboard" link3="Conta" to1="#" to2="/dash" to3="#" />
            <div className={styles.headerSearch}>
                <div className={styles.inputSearch}>
                    <input type="text" placeholder="Pesquisee um comentário ou nome"></input>
                    <i className="bi bi-search"></i>
                </div>
                <div className={styles.listSearch}>
                    <ul>
                        <i className="bi bi-arrow-up"><Link>Mais novo</Link></i>
                        <i className="bi bi-arrow-up"><Link>Mais antigo</Link></i>
                        <i className="bi bi-bookmarks-fill"><Link>Salvos</Link></i>
                        <i className="bi bi-trash2"><Link>Limpar</Link></i>
                    </ul>
                </div>
            </div>
            <div className={styles.cards}>
                {card.length==0? <NotPost msg="Ainda não existem posts"/> : card.map((e) => <Card key={e._id} dono={e.postOwner} title={e.title} dataComent={dataHora(e.createdAt)} content={e.content} coments={e.coments} chave={e._id} likes={e.likes} save={e.saved}/>)}
            </div>
        </div>
    )
}

export default Home;