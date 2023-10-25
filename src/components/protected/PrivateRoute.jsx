import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('login')) === null){
            navigate('/login');
        }
    }, [navigate])
 
    return children; 
};
