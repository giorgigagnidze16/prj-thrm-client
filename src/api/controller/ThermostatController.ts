import axios from "axios";
import {headerWithName} from "../../model/utils";
import {Thermostat} from "../../model/device";

class ThermostatController {
    private readonly baseUrl: string = process.env.REACT_APP_PROXY_URL!;

    async save(args: Thermostat): Promise<Thermostat | undefined> {
        try {
            const response = await axios.put(`${this.baseUrl}/thermostat`, args, {
                headers: headerWithName()
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getUserThermostats(): Promise<Thermostat[] | undefined> {
        try {
            const response = await axios.get(`${this.baseUrl}/thermostat/all`,
                {
                    headers: headerWithName()
                });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async findById(args: { id: number }): Promise<Thermostat | undefined> {
        try {
            const response = await axios.get(`${this.baseUrl}/thermostat/${args.id}`,
                {
                    headers: headerWithName()
                });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteById(args: { id: number }): Promise<void> {
        try {
            const response = await axios.delete(`${this.baseUrl}/thermostat/${args.id}`,
                {
                    headers: headerWithName()
                });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async updateThermostat(args: Thermostat): Promise<Thermostat | undefined> {
        try {
            const response = await axios.post(`${this.baseUrl}/thermostat`, args,
                {
                    headers: headerWithName()
                });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default ThermostatController;