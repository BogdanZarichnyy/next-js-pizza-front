'use client';

import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

export interface GeocoderAutocompleteOptions {
  limit?: number;
  onPlaceSelect?: (value: any) => void
}

export const AddressInput: React.FC<GeocoderAutocompleteOptions> = ({ 
  limit = 5,
  onPlaceSelect,
}) => {
  return (
    <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOGRAFY_AUTOCOMPLETE_API_KEY}>
      <GeoapifyGeocoderAutocomplete 
        placeholder="Введіть адресу"
        filterByCountryCode={["ua"]} // Обмеження лише Україною
        lang="uk" // Пошук буде здійснюватися українською
        limit={limit}
        placeSelect={(value) => onPlaceSelect?.(value.properties.formatted)}
      />
    </GeoapifyContext>
  );
}