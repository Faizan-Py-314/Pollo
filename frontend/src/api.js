import axios from 'axios'

const API_URL = "http://192.168.100.31:8000";
// const API_URL = "http://0.0.0.0:8000";

const pollsList = async () => {
    try{
        const response = await axios.get(`${API_URL}/api/polls`);
        return response.data;
    } catch (error) {
        console.error('Fetch poll data error', error)
        throw error
    }
}

const FetchPoll = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/polls/${id}`)
        return response.data
        console.log(data);
        
    } catch (error) {
        console.error("Failed to fetch the poll");
        throw error
    }
}

export { pollsList, FetchPoll }