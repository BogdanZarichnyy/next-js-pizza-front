import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiltersProps } from "./use-filters";
import qs from 'qs';

export const useQueryFilters = (filters: FiltersProps) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMounted.current) { // це потрібно, щоб useEffect не перезаписував searchParams в URL
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients)
      }

      const queryStringUrl = qs.stringify(params, { arrayFormat: 'comma' });

      router.push(`?${queryStringUrl}`, { scroll: false });
    }

    isMounted.current = true;
  // }, [filters.pizzaTypes, filters.sizes, filters.prices, filters.selectedIngredients]);
  }, [filters]);
}