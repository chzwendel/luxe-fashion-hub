import blackTshirt from "@/assets/products/black-tshirt.jpg";
import whiteHoodie from "@/assets/products/white-hoodie.jpg";
import beigePants from "@/assets/products/beige-pants.jpg";
import grayJacket from "@/assets/products/gray-jacket.jpg";
import blackSneakers from "@/assets/products/black-sneakers.jpg";
import navyOvercoat from "@/assets/products/navy-overcoat.jpg";
import leatherBelt from "@/assets/products/leather-belt.jpg";
import whiteShirt from "@/assets/products/white-shirt.jpg";
import whitePolo from "@/assets/products/white-polo.jpg";
import navyJogger from "@/assets/products/navy-jogger.jpg";
import graySweatshirt from "@/assets/products/gray-sweatshirt.jpg";
import whiteSneakers from "@/assets/products/white-sneakers.jpg";
import leatherBag from "@/assets/products/leather-bag.jpg";
import silverWatch from "@/assets/products/silver-watch.jpg";
import blackSunglasses from "@/assets/products/black-sunglasses.jpg";
import blackBeanie from "@/assets/products/black-beanie.jpg";
import denimJacket from "@/assets/products/denim-jacket.jpg";
import blackWallet from "@/assets/products/black-wallet.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  valor_venda: number;
  marca: string;
  codigo_barras: string;
  image: string;
  category: "menswear" | "accessories";
  sizes: string[];
  colors: string[];
  stock: number;
  id_estoque: string;
  discontinued: boolean;
  description: string;
  rating: number;
};

export const products: Product[] = [
  { id: "1", name: "Camiseta Essencial Preta", price: 89.90, valor_venda: 89.90, marca: "Urban Styles", codigo_barras: "7891234560001", image: blackTshirt, category: "menswear", sizes: ["P", "M", "G", "GG"], colors: ["black"], stock: 12, id_estoque: "e1", discontinued: false, description: "Camiseta básica em algodão pima premium, corte regular com acabamento reforçado.", rating: 4.5 },
  { id: "2", name: "Moletom Oversized Nuvem", price: 249.90, valor_venda: 249.90, marca: "Urban Styles", codigo_barras: "7891234560002", image: whiteHoodie, category: "menswear", sizes: ["M", "G", "GG"], colors: ["white"], stock: 5, id_estoque: "e2", discontinued: false, description: "Moletom oversized em algodão fleece, capuz ajustável e bolso canguru.", rating: 4.8 },
  { id: "3", name: "Calça Cargo Utilitária", price: 199.90, valor_venda: 199.90, marca: "Urban Styles", codigo_barras: "7891234560003", image: beigePants, category: "menswear", sizes: ["P", "M", "G"], colors: ["beige"], stock: 0, id_estoque: "e3", discontinued: false, description: "Calça cargo com bolsos laterais funcionais, tecido ripstop resistente.", rating: 4.2 },
  { id: "4", name: "Jaqueta Bomber Tech", price: 399.90, valor_venda: 399.90, marca: "Urban Styles", codigo_barras: "7891234560004", image: grayJacket, category: "menswear", sizes: ["M", "G", "GG"], colors: ["gray"], stock: 8, id_estoque: "e4", discontinued: false, description: "Jaqueta bomber com forro térmico, zíper YKK e punhos elásticos.", rating: 4.7 },
  { id: "5", name: "Tênis Stealth Runner", price: 349.90, valor_venda: 349.90, marca: "StepUp", codigo_barras: "7891234560005", image: blackSneakers, category: "menswear", sizes: ["P", "M", "G", "GG"], colors: ["black"], stock: 3, id_estoque: "e5", discontinued: false, description: "Tênis esportivo com solado em EVA, cabedal em malha respirável.", rating: 4.6 },
  { id: "6", name: "Sobretudo Lã Marinho", price: 599.90, valor_venda: 599.90, marca: "Urban Styles", codigo_barras: "7891234560006", image: navyOvercoat, category: "menswear", sizes: ["M", "G"], colors: ["black"], stock: 2, id_estoque: "e6", discontinued: false, description: "Sobretudo em lã italiana, forrado, corte clássico com botões de chifre.", rating: 4.9 },
  { id: "7", name: "Cinto Couro Premium", price: 149.90, valor_venda: 149.90, marca: "Urban Styles", codigo_barras: "7891234560007", image: leatherBelt, category: "accessories", sizes: ["M", "G"], colors: ["black"], stock: 15, id_estoque: "e7", discontinued: false, description: "Cinto em couro legítimo com fivela em metal escovado, largura 3,5cm.", rating: 4.4 },
  { id: "8", name: "Camisa Linho Camp Collar", price: 179.90, valor_venda: 179.90, marca: "Urban Styles", codigo_barras: "7891234560008", image: whiteShirt, category: "menswear", sizes: ["P", "M", "G", "GG"], colors: ["white"], stock: 7, id_estoque: "e8", discontinued: false, description: "Camisa em linho puro com gola camp, perfeita para o verão.", rating: 4.3 },
  { id: "9", name: "Polo Classic Branca", price: 129.90, valor_venda: 129.90, marca: "Urban Styles", codigo_barras: "7891234560009", image: whitePolo, category: "menswear", sizes: ["P", "M", "G", "GG"], colors: ["white"], stock: 10, id_estoque: "e9", discontinued: false, description: "Polo em piquet de algodão, gola e punhos com acabamento canelado.", rating: 4.1 },
  { id: "10", name: "Calça Jogger Marinho", price: 169.90, valor_venda: 169.90, marca: "Urban Styles", codigo_barras: "7891234560010", image: navyJogger, category: "menswear", sizes: ["P", "M", "G", "GG"], colors: ["black"], stock: 9, id_estoque: "e10", discontinued: false, description: "Jogger em moletom leve com elástico nos tornozelos e cordão ajustável.", rating: 4.5 },
  { id: "11", name: "Moletom Crewneck Cinza", price: 189.90, valor_venda: 189.90, marca: "Urban Styles", codigo_barras: "7891234560011", image: graySweatshirt, category: "menswear", sizes: ["M", "G", "GG"], colors: ["gray"], stock: 6, id_estoque: "e11", discontinued: false, description: "Moletom gola careca em french terry, conforto máximo para o dia a dia.", rating: 4.6 },
  { id: "12", name: "Tênis Canvas Branco", price: 229.90, valor_venda: 229.90, marca: "StepUp", codigo_barras: "7891234560012", image: whiteSneakers, category: "menswear", sizes: ["P", "M", "G", "GG"], colors: ["white"], stock: 11, id_estoque: "e12", discontinued: false, description: "Tênis em canvas premium com solado vulcanizado, estilo atemporal.", rating: 4.4 },
  { id: "13", name: "Jaqueta Jeans Clássica", price: 289.90, valor_venda: 289.90, marca: "Urban Styles", codigo_barras: "7891234560013", image: denimJacket, category: "menswear", sizes: ["P", "M", "G", "GG"], colors: ["black"], stock: 7, id_estoque: "e13", discontinued: false, description: "Jaqueta jeans em denim 100% algodão, lavagem média e bolsos frontais.", rating: 4.3 },
  { id: "14", name: "Bolsa Crossbody Couro", price: 279.90, valor_venda: 279.90, marca: "Urban Styles", codigo_barras: "7891234560014", image: leatherBag, category: "accessories", sizes: ["M"], colors: ["beige"], stock: 4, id_estoque: "e14", discontinued: false, description: "Bolsa transversal em couro legítimo com zíper e alça ajustável.", rating: 4.7 },
  { id: "15", name: "Relógio Prata Cronógrafo", price: 459.90, valor_venda: 459.90, marca: "TimeLine", codigo_barras: "7891234560015", image: silverWatch, category: "accessories", sizes: ["M"], colors: ["gray"], stock: 3, id_estoque: "e15", discontinued: false, description: "Relógio em aço inoxidável com cronógrafo funcional e vidro safira.", rating: 4.8 },
  { id: "16", name: "Óculos Aviador Classic", price: 199.90, valor_venda: 199.90, marca: "Urban Styles", codigo_barras: "7891234560016", image: blackSunglasses, category: "accessories", sizes: ["M"], colors: ["black"], stock: 8, id_estoque: "e16", discontinued: false, description: "Óculos de sol aviador com lentes polarizadas e proteção UV400.", rating: 4.5 },
  { id: "17", name: "Gorro Beanie Preto", price: 69.90, valor_venda: 69.90, marca: "Urban Styles", codigo_barras: "7891234560017", image: blackBeanie, category: "accessories", sizes: ["M", "G"], colors: ["black"], stock: 20, id_estoque: "e17", discontinued: false, description: "Gorro em tricô canelado de acrílico macio, aba dobrável.", rating: 4.2 },
  { id: "18", name: "Carteira Couro Preta", price: 119.90, valor_venda: 119.90, marca: "Urban Styles", codigo_barras: "7891234560018", image: blackWallet, category: "accessories", sizes: ["M"], colors: ["black"], stock: 14, id_estoque: "e18", discontinued: false, description: "Carteira slim em couro legítimo com porta-cartões e compartimento para notas.", rating: 4.6 },
];
