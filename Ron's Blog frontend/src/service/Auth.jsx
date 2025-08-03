import { Children, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api.js";

function Auth({children}){

    const [loading, setLoading] = useState(true);
    const [token] = useState(localStorage.getItem('token'));
    const [loged, setLoged] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const user = async() => {
            try{

                const res = await api.get("http://localhost:4000/users/getUser", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if(res.status==200){
                setLoged(true);
                }else{
                    navigate('/login')
                }
            }catch(err){
                navigate('/login')
            }finally{
                setLoading(false);
            }
        };

        user(); 
    },[navigate])

    if(loading){
        return <div>Verificando seção...</div>
    }

    if(!loged){
        return null
    }

    return (
        <>{children}</>
    )
}

export default Auth;