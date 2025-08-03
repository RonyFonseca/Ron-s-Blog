import styles from "./Input.module.css";

function Input(props){
    
    return(
        <div className={styles.container}>
            <i className={props.iconName}></i>
            <input className={styles.input} type="text" name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onchange}/>
        </div>
    )

}

export default Input; 