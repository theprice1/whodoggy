import React from 'react';

interface DogCardProps {
  name: string;
  breed: string;
  microchipId: string;
  imageUrl?: string;
  registry?: string;
}

const DogCard: React.FC<DogCardProps> = ({
  name,
  breed,
  microchipId,
  imageUrl,
  registry,
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md mx-auto">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${name}'s photo`}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
      )}
      <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      <p className="text-gray-600">Breed: {breed}</p>
      <p className="text-gray-600">Microchip ID: {microchipId}</p>
      {registry && (
        <p className="text-gray-500 text-sm mt-2">Registry: {registry}</p>
      )}
    </div>
  );
};

export default DogCard;
