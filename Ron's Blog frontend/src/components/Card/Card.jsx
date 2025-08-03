import { useEffect, useState } from "react";
import api from "../../service/api.js";
import styles from "./Card.module.css";
import Coment from "./Coment/Coment.jsx";

function Card(props){
    const [ativo, setAtivo] = useState(false);
    const [coment, setComent] = useState(props.coments); 

    const [like, setLike] = useState();
    const [deixeiLike, setDeixeiLike] = useState(false);
    const [salveiCard, setSalveiCard] = useState(false);

    useEffect(() => {
        setLike(props.likes.length);
        const pegarUser = async () => {
        try {
            const res = await api.get(`${import.meta.env.VITE_URL_API}/users/getUser`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

                const usuario = res.data;


                for (let i = 0; i < props.likes.length; i++) {
                    if(props.likes[i]== usuario){
                        setDeixeiLike(true);
                    }
                }

                for (let i = 0; i < props.save.length; i++) {
                    if(props.save[i]== usuario){
                        setSalveiCard(true);
                    }
                }

                
                
            } catch (err) {
                console.error("Erro ao buscar o usuário:", err);
            }
        };

        pegarUser();

    },[props.likes])

    const novoComents = (e) => {
        setComent(e.coments)
    }

    const deixarLike = async() => {
        const like = await api.post(`${import.meta.env.VITE_URL_API}/posts/likedPost/${props.chave}`,{},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setLike(like.data.newPost.likes.length)
        deixeiLike? setDeixeiLike(false):setDeixeiLike(true);
    }

    const salvarCard = async() => {
        await api.post(`${import.meta.env.VITE_URL_API}/posts/savePost/${props.chave}`,{},{
                headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        salveiCard?setSalveiCard(false):setSalveiCard(true);
    }



    return (
        <div>
            <div className={styles.card}>
                <div className={styles.cardHead}>
                    <div className={styles.personInformations}>
                        <div className={styles.person}>
                            <i className="bi bi-person"></i>
                        </div>
                        <div className={styles.personInformationsHead}>
                            <h3>{props.dono.email}</h3>
                            <p><i className="bi bi-calendar-check-fill"></i>{props.dataComent}</p>
                        </div>
                    </div>
                    <div className={styles.links}>
                        <button onClick={()=> deixarLike()}><i className={deixeiLike? "bi bi-heart-fill": "bi bi-heart"}></i>{like}</button>
                        <button onClick={()=> ativo ? setAtivo(false) : setAtivo(true)}><i className={ativo? "bi bi-chat-fill":"bi bi-chat"}></i></button>
                        <button onClick={()=> salvarCard()}><i className={salveiCard? "bi bi-bookmark-fill": "bi bi-bookmark"}></i></button>
                    </div>
                </div>

                <div className={styles.cardBody}>
                    <h3>{props.title}</h3>
                    <h4>Comentário:</h4>
                    <p>{props.content}</p>
                </div>
            </div>
            
            {ativo? (
                <div>
                    <Coment idPost={props.chave} coments={coment} novoComent={(e) => novoComents(e)}/>
                </div>
            ):""}
        </div>
    )
}

export default Card;