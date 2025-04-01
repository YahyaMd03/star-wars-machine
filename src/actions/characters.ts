'use server'
import axios from "axios";


export const fetchCharacters = async (page = 1) => {
    const { data } = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
    return data;
};

export const fetchCharacterDetails = async (id: string) => {
    const { data } = await axios.get(`https://swapi.dev/api/people/${id}`);
    return data;
};