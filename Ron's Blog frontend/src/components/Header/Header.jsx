import styles from "./Header.module.css";
import logo from "../../assets/1.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header(props){

    return(
        <header className={styles.header}>
            <img src={logo} className={styles.logo}/>
            <div>
                <nav className={styles.menu}>
                    <ul>
                        <li><Link to={props.to1}>{props.link1}</Link></li>
                        <li><Link to={props.to2}>{props.link2}</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header; 