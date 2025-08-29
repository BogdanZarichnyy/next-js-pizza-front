import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiltersProps } from "./use-filters";
import qs from 'qs';

export const useQueryFilters = (filters: FiltersProps) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients)
    }

    const queryStringUrl = qs.stringify(params, { arrayFormat: 'comma' });

    router.push(`?${queryStringUrl}`, { scroll: false });

  // }, [filters.pizzaTypes, filters.sizes, filters.prices, filters.selectedIngredients]);
  }, [filters]);
}