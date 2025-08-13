import styles from "./NotPost.module.css"
import { Link } from "react-router-dom";

function NotPost(props){
    return (
        <p className={styles.notPosts}>{props.msg},<Link to="/createPost" className="colorTheme">Criar postagem</Link></p>
    )
}

export default NotPost; 