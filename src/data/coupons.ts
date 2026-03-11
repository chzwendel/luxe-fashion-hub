export type Coupon = {
  code: string;
  discount: number; // percentage
  minValue: number;
  description: string;
};

export const coupons: Coupon[] = [
  { code: "URBAN10", discount: 10, minValue: 0, description: "10% de desconto" },
  { code: "URBAN20", discount: 20, minValue: 300, description: "20% de desconto em compras acima de R$300" },
  { code: "PRIMEIRACOMPRA", discount: 15, minValue: 0, description: "15% de desconto na primeira compra" },
];
