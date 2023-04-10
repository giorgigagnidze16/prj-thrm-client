import axios from "axios";
import {Token, UserDTO} from "../../model/utils";

class UserController {
    private readonly baseUrl: string = process.env.REACT_APP_PROXY_URL!;

    async register(args: UserDTO): Promise<Token | undefined> {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/register`, args);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async login(args: UserDTO): Promise<Token | undefined> {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/login`, args);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default UserController;