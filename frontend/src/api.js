import axios from 'axios'

const API_URL = "http://192.168.100.31:8000";

const pollData = async () => {
    try{
        const response = await axios.get(`${API_URL}/api/poll`);
        return response.data;
    } catch (error) {
        console.error('Fetch poll data error', error)
        throw error
    }
}

export { pollData }