import axios from "axios";

let endpoint = "http://localhost:5000";

interface accountInformation {
    email: string,
    username: string,
    password: string
}

interface RegisterResponse {
    success: boolean;
    message: string;
}


const RegisterAccount = async (accountInformation: accountInformation): Promise<RegisterResponse> => {
    try {
        const response = await axios.post(`${endpoint}/register`, accountInformation, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data as RegisterResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('There was an error with the request:', error.response);
            return error.response?.data as RegisterResponse;
        } else {
            console.error('An unexpected error occurred:', error);
            throw error;
        }
    }
}

export default RegisterAccount;