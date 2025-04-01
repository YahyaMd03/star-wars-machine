'use client'
import React from "react";

const CharacterCardSkeleton = () => {
    return (
        <div className="w-full bg-white border p-4 rounded-lg shadow-md animate-pulse">
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
                {[...Array(6)].map((_, i) => (
                    <React.Fragment key={i}>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </React.Fragment>
                ))}
            </div>

            <div className="mt-4">
                <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
        </div>
    );
};

export default CharacterCardSkeleton;