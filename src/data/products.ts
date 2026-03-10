import blackTshirt from "@/assets/products/black-tshirt.jpg";
import whiteHoodie from "@/assets/products/white-hoodie.jpg";
import beigePants from "@/assets/products/beige-pants.jpg";
import grayJacket from "@/assets/products/gray-jacket.jpg";
import blackSneakers from "@/assets/products/black-sneakers.jpg";
import navyOvercoat from "@/assets/products/navy-overcoat.jpg";
import leatherBelt from "@/assets/products/leather-belt.jpg";
import whiteShirt from "@/assets/products/white-shirt.jpg";
import blackDress from "@/assets/products/black-dress.jpg";
import whiteBlouse from "@/assets/products/white-blouse.jpg";
import beigeTrousers from "@/assets/products/beige-trousers.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "menswear" | "womenswear" | "accessories";
  sizes: string[];
  colors: string[];
  stock: number;
  discontinued: boolean;
};

export const products: Product[] = [
  { id: "1", name: "Camiseta Essencial Preta", price: 89.90, image: blackTshirt, category: "menswear", sizes: ["P", "M", "G", "GG"], colors: ["black"], stock: 12, discontinued: false },
  { id: "2", name: "Moletom Oversized Nuvem", price: 249.90, image: whiteHoodie, category: "menswear", sizes: ["M", "G", "GG"], colors: ["white"], stock: 5, discontinued: false },
  { id: "3", name: "Calça Cargo Utilitária", price: 199.90, image: beigePants, category: "menswear", sizes: ["P", "M", "G"], colors: ["beige"], stock: 0, discontinued: false },
  { id: "4", name: "Jaqueta Bomber Tech", price: 399.90, image: grayJacket, category: "menswear", sizes: ["M", "G", "GG"], colors: ["gray"], stock: 8, discontinued: false },
  { id: "5", name: "Tênis Stealth Runner", price: 349.90, image: blackSneakers, category: "menswear", sizes: ["P", "M", "G", "GG"], colors: ["black"], stock: 3, discontinued: false },
  { id: "6", name: "Sobretudo Lã Marinho", price: 599.90, image: navyOvercoat, category: "menswear", sizes: ["M", "G"], colors: ["black"], stock: 2, discontinued: false },
  { id: "7", name: "Cinto Couro Premium", price: 149.90, image: leatherBelt, category: "accessories", sizes: ["M", "G"], colors: ["black"], stock: 15, discontinued: false },
  { id: "8", name: "Camisa Linho Camp Collar", price: 179.90, image: whiteShirt, category: "menswear", sizes: ["P", "M", "G", "GG"], colors: ["white"], stock: 7, discontinued: false },
];
