import axios from 'axios';

// export const geocodeAddress = async (address: string) => {
//     try {
//         const encodedAddress = encodeURIComponent(address);
//         const response = await axios.get(
//             `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`
//         );

//         if (!response || !Array.isArray(response.data) || response.data.length === 0) {
//             throw new Error('No results found for the address');
//         }

//         const { lat, lon } = response.data[0];
//         return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
//     } catch (error) {
//         console.error('Error during geocoding:', error);
//         return null;
//     }
// };

export const geocodeAddress = async (address: string) => {
    try {
        const encodedAddress = encodeURIComponent(address);
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch geocoding data');
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            return { latitude: lat, longitude: lng };
        } else {
            throw new Error('No results found for the address');
        }
    } catch (error) {
        console.error('Error during geocoding:', error);
        return null;
    }
};
