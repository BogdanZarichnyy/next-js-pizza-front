'use client';

import { Category } from "@prisma/client";
import { cn } from "../../lib/utils"
import { useCategoryStore } from "../../store/category";

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
      {
        items.map(({ id, name }, index) => (
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