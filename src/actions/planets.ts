
'use server'
import axios from "axios";

export const fetchPlanet = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching planet data:", error);
        return { name: "Unknown" };
    }
};

