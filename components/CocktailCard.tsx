import { SimpleDrink } from "@/types/global-types";
import Image from "next/image";
import Link from "next/link";

const CocktailCard = ({ drink }: { drink: SimpleDrink }) => {
  return (
    <Link href={`/cocktail/${drink.idDrink}`}>
      <li
        key={drink.idDrink}
        className="group bg-white brutal-border brutal-shadow-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
      >
        <div className="relative aspect-square overflow-hidden brutal-border-b-6 border-black">
          <Image
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            className="object-cover"
          />
        </div>
        <div className="p-3 md:p-4 bg-[#FFD700]">
          <h3 className="text-sm md:text-base font-black uppercase tracking-tight line-clamp-2 h-12">
            {drink.strDrink}
          </h3>
        </div>
      </li>
    </Link>
  );
};

export default CocktailCard;
