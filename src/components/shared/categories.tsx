'use client';

import { cn } from "@/lib/utils"
import { useCategoryStore } from "@/store/category";

interface Props {
  className?: string
}

const categories = [
  { id: 1, name: 'Піцци' },
  { id: 2, name: 'Комбо' },
  { id: 3, name: 'Закуски' },
  { id: 4, name: 'Коктейлі' },
  { id: 5, name: 'Кава' },
  { id: 6, name: 'Напої' },
  { id: 7, name: 'Десерти' },
  { id: 8, name: 'Десерти' },
];

export const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
      {
        categories.map(({ id, name }, index) => (
          <a key={index}
            className={cn("flex items-center font-bold h-11 rounded-2xl px-5", 
              categoryActiveId === id && "bg-white shadow-md shadow-gray-200 text-primary" // 2:26:33
            )}
            href={`/#${name}`}
          >
            <button type="button">{name}</button>
          </a>
        ))
      }
    </div>
  );
}