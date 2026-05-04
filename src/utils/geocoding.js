/**
 * Geocoding utility using OpenStreetMap Nominatim
 * Free geocoding for city search and coordinates
 */

// Indian cities database for offline fallback
const INDIAN_CITIES = [
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.076, lon: 72.8777, tz: 5.5 },
  { name: 'Delhi', state: 'Delhi', lat: 28.7041, lon: 77.1025, tz: 5.5 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946, tz: 5.5 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.385, lon: 78.4867, tz: 5.5 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707, tz: 5.5 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639, tz: 5.5 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567, tz: 5.5 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714, tz: 5.5 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873, tz: 5.5 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462, tz: 5.5 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311, tz: 5.5 },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lon: 80.3319, tz: 5.5 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882, tz: 5.5 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577, tz: 5.5 },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lon: 77.4126, tz: 5.5 },
  { name: 'Patna', state: 'Bihar', lat: 25.6093, lon: 85.1376, tz: 5.5 },
  { name: 'Vadodara', state: 'Gujarat', lat: 22.3072, lon: 73.1812, tz: 5.5 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lon: 83.2185, tz: 5.5 },
  { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0168, lon: 76.9558, tz: 5.5 },
  { name: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241, lon: 76.9366, tz: 5.5 },
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lon: 76.2673, tz: 5.5 },
  { name: 'Guwahati', state: 'Assam', lat: 26.1445, lon: 91.7362, tz: 5.5 },
  { name: 'Chandigarh', state: 'Chandigarh', lat: 30.7333, lon: 76.7794, tz: 5.5 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lon: 82.9739, tz: 5.5 },
  { name: 'Mysore', state: 'Karnataka', lat: 12.2958, lon: 76.6394, tz: 5.5 },
  { name: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lon: 85.3096, tz: 5.5 },
  { name: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lon: 73.0243, tz: 5.5 },
  { name: 'Amritsar', state: 'Punjab', lat: 31.634, lon: 74.8723, tz: 5.5 },
  { name: 'Raipur', state: 'Chhattisgarh', lat: 21.2514, lon: 81.6296, tz: 5.5 },
  { name: 'Dehradun', state: 'Uttarakhand', lat: 30.3165, lon: 78.0322, tz: 5.5 },
  { name: 'Vijayawada', state: 'Andhra Pradesh', lat: 16.5062, lon: 80.6480, tz: 5.5 },
  { name: 'Mangalore', state: 'Karnataka', lat: 12.9141, lon: 74.8560, tz: 5.5 },
  { name: 'Hubli', state: 'Karnataka', lat: 15.3647, lon: 75.1240, tz: 5.5 },
  { name: 'Belgaum', state: 'Karnataka', lat: 15.8497, lon: 74.4977, tz: 5.5 },
  { name: 'Tirupati', state: 'Andhra Pradesh', lat: 13.6288, lon: 79.4192, tz: 5.5 },
  { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lon: 78.0081, tz: 5.5 },
  { name: 'Ujjain', state: 'Madhya Pradesh', lat: 23.1765, lon: 75.7885, tz: 5.5 },
  { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lon: 77.1734, tz: 5.5 },
  { name: 'Goa', state: 'Goa', lat: 15.2993, lon: 74.124, tz: 5.5 },
  { name: 'Rishikesh', state: 'Uttarakhand', lat: 30.0869, lon: 78.2676, tz: 5.5 },
];

/**
 * Search for a city using Nominatim API (online)
 */
export async function searchCity(query) {
  if (!query || query.length < 2) return [];

  // Try offline first
  const offlineResults = INDIAN_CITIES.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.state.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8);

  // Try online search
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=8&countrycodes=in`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'VedicAstrologyApp/1.0' }
    });
    if (response.ok) {
      const data = await response.json();
      const results = data.map(item => ({
        name: item.display_name.split(',')[0],
        fullName: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        tz: 5.5, // IST default
      }));
      return results.length > 0 ? results : offlineResults;
    }
  } catch (e) {
    // Offline fallback
  }

  return offlineResults;
}

/**
 * Get timezone offset for a location (simplified — uses IST for India)
 */
export function getTimezoneOffset(lat, lon) {
  // For India, always IST (+5:30)
  if (lat >= 6 && lat <= 37 && lon >= 68 && lon <= 98) {
    return 5.5;
  }
  // Rough estimate based on longitude for other locations
  return Math.round(lon / 15);
}

export { INDIAN_CITIES };
