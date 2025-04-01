"use client";

import { useState, useEffect } from "react";
import CharacterCard from "@/components/CharacterCard";
import { fetchCharacters } from "@/actions/characters";
import Navbar from "@/components/Navbar";
import CharacterCardSkeleton from "@/components/CharacterCardSkeleton";
import { fetchPlanet } from "@/actions/planets";
import Footer from "@/components/Footer";

type Character = {
  name: string;
  gender: string;
  homeWorld: string;
  birthYear: string;
  height: number;
  mass: number;
  hairColor: string;
  id: string;
  url: string;
  onAddToFavorites: () => void;
};

type Planet = {
  name: string;
  url: string;
};

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Map<string, string>>(new Map());
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCharacters = async () => {
      setIsLoading(true);
      try {
        const dataCharacters = await fetchCharacters(page);
        const planetNames: Map<string, string> = new Map();

        const planetRequests = dataCharacters.results.map(async (char: any) => {
          if (!planetNames.has(char.homeworld)) {
            const planetData = await fetchPlanet(char.homeworld);
            planetNames.set(char.homeworld, planetData.name);
          }
        });

        await Promise.all(planetRequests);

        setCharacters(
          dataCharacters.results.map((char: any, index: number) => ({
            name: char.name,
            gender: char.gender,
            homeWorld: planetNames.get(char.homeworld) || "Unknown",
            birthYear: char.birth_year,
            height: char.height,
            mass: char.mass,
            hairColor: char.hair_color,
            id: `${page}-${index}`,
            url: char.url,
            onAddToFavorites: () => console.log(`${char.name} added to favorites`),
          }))
        );

        setPlanets(planetNames);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacters();
  }, [page]);

  return (
    <div className="min-w-screen min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="mt-20 flex flex-col justify-start">
        <div className="font-bold text-xl text-black p-4">
          Star Wars Characters
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full p-4">
          {isLoading ? (
            [...Array(10)].map((_, i) => <CharacterCardSkeleton key={i} />)
          ) : (
            characters.map((char) => <CharacterCard key={char.id} {...char} />)
          )}
        </div>

        <div className="flex justify-center items-center gap-4 mt-4 mb-20">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-black">Page {page}</span>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
