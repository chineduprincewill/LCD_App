import axios from "../api/axios";

export const loginUser = async ( data, setSuccess, setError, setLoggingIn ) => {

    setLoggingIn(true);

    try{
        const response = await axios.post('login',
            data,
            {
                headers: { 'Accept' : 'application/json' }
            }
        );
        
        setSuccess(response.data);
        console.log(response.data);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data?.error);
        }
    }

    setLoggingIn(false);
    
}