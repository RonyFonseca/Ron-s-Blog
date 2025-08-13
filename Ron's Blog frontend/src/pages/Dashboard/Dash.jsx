import styles from "./Dash.module.css";
import Header from "../../components/Header/Header";

import snowBoard from "../../assets/snowboard.jpg";
import sea from "../../assets/sea.jpg";
import sea2 from "../../assets/sea2.jpg";

import { Link, useNavigate } from "react-router-dom";

import noProfile from "../../assets/1.png"

function Dash(){

    const navigate = useNavigate();

    return (
        <div>
            <Header link1="Blog" link2="Dashboard" link3="Conta" to1="/blog" to2="/dash" to3="#" />

            <div id={styles.dashBody}>
                <div id={styles.cards}>
                    <div className={styles.card}>
                        <Link to="/createPost"><img className={styles.cardImage} src={snowBoard} alt="Imagem de homem nas neves"/></Link>
                        <div>
                            <h3>Criar Postagens</h3>
                            <p>Crie novas postagens, ganhe novas curtidas e seja notado.</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <Link to="/myPosts"><img className={styles.cardImage} src={sea} alt="Imagem de homem mergulhando"/></Link>
                        <div>
                            <h3>Meus Posts</h3>
                            <p>Reveja suas postagens, edite ou remova, fique livre para inovar.</p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <Link to="/savedPost"><img className={styles.cardImage} src={sea2} alt="Imagem da natureza"/></Link>
                        <div>
                            <h3>Posts Salvos</h3>
                            <p>Relembre ideias antigas, viagens ou até mesmo piadas.</p>
                        </div>
                    </div>
                </div>
                
                <button id={styles.countEdit} onClick={() => navigate("/myCount")}>
                    <i className="bi bi-person"></i>
                    <p>Editar informações do perfil</p>
                </button>
            </div>
        </div>
    )
}

export default Dash