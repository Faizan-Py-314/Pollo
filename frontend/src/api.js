import axios from 'axios'

const API_URL = "http://192.168.100.31:8000";
// const API_URL = "http://0.0.0.0:8000";

const loginUser = async (credentials) => {
    try {
        const params = new URLSearchParams();
        for (const key in credentials) {
            params.append(key, credentials[key])
        }

        const response = await axios.post(`${API_URL}/api/users/token`,
            params,
            {
                headers: { 'Content-Tpye': 'application/x-www-form-urlencoded' },
            }
        )
        return response.data
    } catch (error) {
        console.error('Login error', error);
        throw error
    }
}

const registerUser = async (userData) => {
    try{
        const response = await axios.post(`${API_URL}/api/users`, userData)
    } catch (error) {
        console.log('Registraition error', error);
        throw error
    }
}

const fetchUserInfo = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/api/users/me/`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        return response.data
    } catch (error) {
        console.error('Fetch user info error', error);
        throw error
    }
}

const pollsList = async () => {
    try {
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

export { loginUser, registerUser, fetchUserInfo, pollsList, FetchPoll }
