import axios from "../api/axios"

export const allDonations = async ( token, setDonations, setError, setFetching ) => {

    setFetching(true);

    try{
        const response = await axios.get('group-donations',
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        console.log(response.data.donations);
        setDonations(response.data.donations);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data?.message);
        }
    }

    setFetching(false);
    
}


export const filterDonations = async ( token, data, setSuccess, setError, setFiltering) => {

    setFiltering(true);

    try{
        const response = await axios.post('filter-donations',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        setSuccess(response.data.donations);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data.error);
            setError(err.response.data.error);
        }
    }

    setFiltering(false);
}


export const createDonation = async ( token, data, setSuccess, setError, setSubmitting) => {

    setSubmitting(true);

    try{
        const response = await axios.post('create-donation',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        setSuccess(response.data.success);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data.error);
            setError(err.response.data.error);
        }
    }

    setSubmitting(false);
}


export const totalPledge = (data) => {

    let total = 0;

    data.length > 0 && (
        data.map(dt => {
            return total = total + parseInt(dt.donation)
        })
    )

    return total
}


export const totalPaid = (data) => {

    let total = 0;

    data.length > 0 && (
        data.map(dt => {
            return total = total + parseInt(dt.redeemed)
        })
    )

    return total
}


export const result = async ( token, data, setResults, setError, setFiltering ) => {

    setFiltering(true);

    try{
        const response = await axios.post('result',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        console.log(response.data.result);
        setResults(response.data.result);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data?.message);
        }
    }

    setFiltering(false);
    
}


export const importDonations = async ( token, data, setSuccess, setError, setImporting ) => {

    setImporting(true);

    try{
        const response = await axios.post('import-donations',
            data,
            {
                headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
            }
        );
        
        console.log(response.data.success);
        setSuccess(response.data.success);

    }
    catch (err) {
        if (!err?.response) {
            setError('No Response from Server');
        } else {
            console.log(err.response.data);
            setError(err.response.data);
        }
    }

    setImporting(false);
    
}