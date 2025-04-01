'use client';
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useRouter, usePathname } from "next/navigation";
import PublicIcon from "@mui/icons-material/Public";
import CakeIcon from "@mui/icons-material/Cake";
import WcIcon from "@mui/icons-material/Wc";
import Face2Icon from "@mui/icons-material/Face2";
import HeightIcon from "@mui/icons-material/Height";
import ScaleIcon from "@mui/icons-material/Scale";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Filled heart icon
import Tooltip from "@mui/material/Tooltip"; // MUI Tooltip
import { useFavoritesStore } from "@/store/useFavorites";

type Character = {
    name: string;
    gender: string;
    homeWorld: string;
    birthYear: string;
    height: number;
    mass: number;
    hairColor: string;
    url: string;
};

const CharacterCard = ({
    name,
    gender,
    homeWorld,
    birthYear,
    height,
    mass,
    hairColor,
    url
}: Character) => {
    const router = useRouter();
    const pathname = usePathname();
    const { favorites, toggleFavorite } = useFavoritesStore();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        setIsFavorite(favorites.includes(url));
    }, [favorites, url]);

    const addToFavorites = (url: string) => {
        toggleFavorite(url);
    };
    const handleViewDetail = () => {
        const characterId = url.split('/').pop();
        if (characterId) {
            router.push(`/character/${characterId}`);
        }
    };

    return (
        <div className="w-full bg-white border p-4 rounded-lg shadow-md hover:shadow-2xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-600">{name}</h2>

                <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
                    <button
                        onClick={() => addToFavorites(url)}
                        aria-label="Toggle Favorite"
                        className="cursor-pointer p-2 rounded-full transition duration-200 hover:bg-blue-100"
                    >
                        {isFavorite ? (
                            <FavoriteIcon className="text-blue-600" />
                        ) : (
                            <FavoriteBorderIcon className="text-blue-600" />
                        )}
                    </button>
                </Tooltip>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center space-x-2">
                    <PublicIcon className="text-blue-600" />
                    <span className="font-bold text-md text-black">Homeworld:</span>
                </div>
                <div className="text-black">{homeWorld}</div>

                <div className="flex items-center space-x-2">
                    <CakeIcon className="text-blue-600" />
                    <span className="font-bold text-md text-black">Birth Year:</span>
                </div>
                <div className="text-black">{birthYear}</div>

                <div className="flex items-center space-x-2">
                    <WcIcon className="text-blue-600" />
                    <span className="font-bold text-md text-black">Gender:</span>
                </div>
                <div className="text-black">{gender}</div>

                <div className="flex items-center space-x-2">
                    <Face2Icon className="text-blue-600" />
                    <span className="font-bold text-md text-black">Hair Color:</span>
                </div>
                <div className="text-black">{hairColor}</div>

                <div className="flex items-center space-x-2">
                    <HeightIcon className="text-blue-600" />
                    <span className="font-bold text-md text-black">Height:</span>
                </div>
                <div className="text-black">{height}</div>

                <div className="flex items-center space-x-2">
                    <ScaleIcon className="text-blue-600" />
                    <span className="font-bold text-md text-black">Mass:</span>
                </div>
                <div className="text-black">{mass}</div>
            </div>

            <div>
                {pathname === "/" && (
                    <Button onClick={handleViewDetail}>
                        View Details
                    </Button>
                )}

                {pathname === "/favorites" && (
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Button onClick={() => router.push(`/edit-character/${url}`)}>Edit</Button>
                        </div>
                        <div>
                            <Button onClick={() => toggleFavorite(url)} variant="secondary">
                                Remove
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CharacterCard;
