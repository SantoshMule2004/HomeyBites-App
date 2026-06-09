export type LocationIQAddress = {
  name?: string;
  house_number?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  city_district?: string;
  city?: string;
  county?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
  // Index signature to safely catch any unexpected geographic fields 
  // without throwing TypeScript errors
  [key: string]: string | undefined;
};


export type LocationIQAutocompleteResult = {
  place_id: string;
  osm_id?: string;
  osm_type?: string;

  lat: string;
  lon: string;

  boundingbox?: [string, string, string, string];

  class?: string;
  type?: string;

  // Display fields
  display_name: string;
  display_place?: string;
  display_address?: string;

  address?: LocationIQAddress;
};

export type LocationIQReverseResult = {
  place_id: string;
  osm_id?: string;
  osm_type?: string;
  
  lat: string;
  lon: string;
  
  display_name: string;
  
  address: LocationIQAddress;
  
  boundingbox?: [string, string, string, string]; 
  
  distance?: number; 
};

export type Add = {
  display_name: string;
  display_place?: string;
  display_address?: string;
  lat: string;
  lon: string;
}