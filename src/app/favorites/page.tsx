'use client';
import React, { useEffect, useState } from "react";
import { useFavoritesStore } from "@/store/useFavorites"; // Make sure removeFavorite is defined here
import CharacterCard from "@/components/CharacterCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from "@/components/ui/Button"; // Assuming Button component exists

export default function Favorites() {
    const { favorites, removeFavorite } = useFavoritesStore(); // Assuming you have a removeFavorite function in your store
    const [favoriteCharacters, setFavoriteCharacters] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null); // Selected character for editing
    const [modalOpen, setModalOpen] = useState<boolean>(false); // Modal visibility
    const [height, setHeight] = useState<number | string>(""); // Editable height
    const [gender, setGender] = useState<string>(""); // Editable gender
    const router = useRouter();

    useEffect(() => {
        const fetchFavorites = async () => {
            if (favorites.length === 0) return;

            setLoading(true);

            try {
                const responses = await Promise.all(
                    favorites.map((url) => fetch(url).then((res) => res.json()))
                );
                setFavoriteCharacters(responses);
            } catch (error) {
                console.error("Error fetching favorite characters:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [favorites]);

    const openModal = (character: any) => {
        setSelectedCharacter(character);
        setHeight(character.height); // Set current height to modal field
        setGender(character.gender); // Set current gender to modal field
        setModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedCharacter(null);
    };

    const saveChanges = () => {
        if (selectedCharacter) {
            // Update the selected character with the new height and gender
            selectedCharacter.height = height;
            selectedCharacter.gender = gender;

            // Handle saving logic (e.g., send the updated data to an API)
            console.log("Updated character:", selectedCharacter);

            closeModal(); // Close the modal after saving
        }
    };

    // Function to handle removal of a character from favorites
    const handleRemove = (url: string) => {
        // Call removeFavorite function to update the store
        removeFavorite(url); // Assuming removeFavorite takes the URL of the character to remove
        setFavoriteCharacters(prevState => prevState.filter(char => char.url !== url)); // Remove character from local state
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <div className="mt-20 px-4 py-6 flex-grow">
                <h2 className="text-2xl font-bold text-center mb-6 text-black">My Favorite Characters</h2>

                {loading ? (
                    <div className="flex justify-center items-center">
                        <CircularProgress />
                    </div>
                ) : favoriteCharacters.length === 0 ? (
                    <div className="flex flex-col items-center text-center">
                        <FavoriteIcon className="text-red-600 mb-4" fontSize="large" />
                        <p className="text-gray-600 mb-2">No favorite characters added yet</p>
                        <p className="text-gray-600 mb-4">Add characters to your favorites list and they'll show up here.</p>
                        <Button onClick={() => router.push('/')} variant="primary">Browse Characters</Button>
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favoriteCharacters.map((char) => (
                                <CharacterCard key={char.url} {...char}>
                                    <div className="flex justify-between mt-4">
                                        <Button onClick={() => openModal(char)} variant="primary">Edit</Button>
                                        <Button onClick={() => handleRemove(char.url)} variant="secondary">Remove</Button>
                                    </div>
                                </CharacterCard>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />

            {/* Modal for editing character */}
            <Modal
                open={modalOpen}
                onClose={closeModal}
                className="flex justify-center items-center"
            >
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full backdrop-blur-md">
                    <button className="absolute top-2 right-2 text-black" onClick={closeModal}>X</button>
                    {selectedCharacter && (
                        <div>
                            <h3 className="text-xl font-bold text-center mb-4">Edit {selectedCharacter.name}</h3>

                            <div className="mb-4">
                                <TextField
                                    label="Height"
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    fullWidth
                                />
                            </div>

                            <div className="mb-4">
                                <Select
                                    label="Gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button onClick={saveChanges} variant="primary">Confirm</Button>
                                <Button onClick={closeModal} variant="secondary">Cancel</Button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
}
