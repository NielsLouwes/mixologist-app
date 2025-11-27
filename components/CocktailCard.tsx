import { Drink } from "@/types/global-types";
import Image from "next/image";
import Link from "next/link";

const CocktailCard = ({ drink }: { drink: Drink }) => {
  return (
    <Link href={`/cocktail/${drink.idDrink}`}>
      <li
        key={drink.idDrink}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 line-clamp-2">
            {drink.strDrink}
          </h3>
        </div>
      </li>
    </Link>
  );
};

export default CocktailCard;
