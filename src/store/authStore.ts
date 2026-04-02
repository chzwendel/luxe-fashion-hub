import { create } from "zustand";

export interface User {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  createdAt: string;
}

export interface Pedido {
  id: string;
  numero_pedido: string;
  status_pedido: "pendente" | "confirmado" | "enviado" | "entregue" | "cancelado";
  valor_total: number;
  frete: number;
  desconto: number;
  forma_pagamento: "pix" | "cartao" | "boleto";
  id_usuarios: string;
  items: { produto_nome: string; quantidade: number; valor_unitario: number; tamanho: string; cor: string }[];
  createdAt: string;
}

export interface Avaliacao {
  id: string;
  id_produto: string;
  id_usuarios: string;
  usuario_nome: string;
  estrelas: number;
  comentario: string;
  curtida: "S" | "N";
  createdAt: string;
}

interface AuthStore {
  user: User | null;
  users: User[];
  pedidos: Pedido[];
  avaliacoes: Avaliacao[];
  login: (email: string, senha: string) => boolean;
  register: (data: Omit<User, "id" | "createdAt">) => { success: boolean; error?: string };
  logout: () => void;
  addPedido: (pedido: Omit<Pedido, "id" | "numero_pedido" | "createdAt">) => void;
  addAvaliacao: (avaliacao: Omit<Avaliacao, "id" | "createdAt">) => void;
  getAvaliacoesByProduct: (productId: string) => Avaliacao[];
  getPedidosByUser: (userId: string) => Pedido[];
}

const mockUsers: User[] = [
  { id: "u1", nome: "João Silva", cpf: "123.456.789-00", email: "joao@email.com", senha: "123456", telefone: "(11) 99999-0001", endereco: "Rua das Flores, 123", cidade: "São Paulo", estado: "SP", cep: "01001-000", createdAt: "2026-01-15" },
  { id: "u2", nome: "Pedro Santos", cpf: "234.567.890-11", email: "pedro@email.com", senha: "123456", telefone: "(21) 98888-0002", endereco: "Av. Atlântica, 456", cidade: "Rio de Janeiro", estado: "RJ", cep: "22021-001", createdAt: "2026-02-20" },
];

const mockPedidos: Pedido[] = [
  { id: "p1", numero_pedido: "URB-2026-001", status_pedido: "entregue", valor_total: 339.80, frete: 0, desconto: 0, forma_pagamento: "cartao", id_usuarios: "u1", items: [{ produto_nome: "Camiseta Essencial Preta", quantidade: 2, valor_unitario: 89.90, tamanho: "M", cor: "Preto" }, { produto_nome: "Calça Cargo Utilitária", quantidade: 1, valor_unitario: 199.90, tamanho: "G", cor: "Bege" }], createdAt: "2026-03-01" },
  { id: "p2", numero_pedido: "URB-2026-002", status_pedido: "enviado", valor_total: 599.90, frete: 19.90, desconto: 0, forma_pagamento: "pix", id_usuarios: "u1", items: [{ produto_nome: "Sobretudo Lã Marinho", quantidade: 1, valor_unitario: 599.90, tamanho: "G", cor: "Marinho" }], createdAt: "2026-03-10" },
  { id: "p3", numero_pedido: "URB-2026-003", status_pedido: "confirmado", valor_total: 249.90, frete: 0, desconto: 25.00, forma_pagamento: "cartao", id_usuarios: "u2", items: [{ produto_nome: "Moletom Oversized Nuvem", quantidade: 1, valor_unitario: 249.90, tamanho: "G", cor: "Branco" }], createdAt: "2026-03-15" },
];

const mockAvaliacoes: Avaliacao[] = [
  { id: "a1", id_produto: "1", id_usuarios: "u1", usuario_nome: "João Silva", estrelas: 5, comentario: "Qualidade incrível, tecido muito macio e caimento perfeito. Recomendo!", curtida: "S", createdAt: "2026-03-05" },
  { id: "a2", id_produto: "1", id_usuarios: "u2", usuario_nome: "Pedro Santos", estrelas: 4, comentario: "Boa camiseta, porém o tamanho ficou um pouco maior do que esperava.", curtida: "S", createdAt: "2026-03-08" },
  { id: "a3", id_produto: "2", id_usuarios: "u1", usuario_nome: "João Silva", estrelas: 5, comentario: "Moletom quentinho e muito estiloso. Amei o oversized!", curtida: "S", createdAt: "2026-03-12" },
  { id: "a4", id_produto: "4", id_usuarios: "u2", usuario_nome: "Pedro Santos", estrelas: 5, comentario: "Jaqueta sensacional, forro térmico funciona muito bem.", curtida: "S", createdAt: "2026-03-14" },
  { id: "a5", id_produto: "5", id_usuarios: "u1", usuario_nome: "João Silva", estrelas: 4, comentario: "Tênis confortável, ótimo para caminhadas longas.", curtida: "N", createdAt: "2026-03-16" },
  { id: "a6", id_produto: "6", id_usuarios: "u2", usuario_nome: "Pedro Santos", estrelas: 5, comentario: "Peça premium, acabamento impecável. Vale cada centavo.", curtida: "S", createdAt: "2026-03-18" },
  { id: "a7", id_produto: "7", id_usuarios: "u1", usuario_nome: "João Silva", estrelas: 4, comentario: "Cinto de boa qualidade, fivela bonita.", curtida: "S", createdAt: "2026-03-20" },
  { id: "a8", id_produto: "15", id_usuarios: "u2", usuario_nome: "Pedro Santos", estrelas: 5, comentario: "Relógio lindo, acabamento premium e pontual.", curtida: "S", createdAt: "2026-03-22" },
];

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  users: mockUsers,
  pedidos: mockPedidos,
  avaliacoes: mockAvaliacoes,

  login: (email, senha) => {
    const user = get().users.find(u => u.email === email && u.senha === senha);
    if (user) { set({ user }); return true; }
    return false;
  },

  register: (data) => {
    const users = get().users;
    if (users.find(u => u.email === data.email)) return { success: false, error: "E-mail já cadastrado" };
    if (users.find(u => u.cpf === data.cpf)) return { success: false, error: "CPF já cadastrado" };
    const newUser: User = { ...data, id: `u${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] };
    set({ users: [...users, newUser], user: newUser });
    return { success: true };
  },

  logout: () => set({ user: null }),

  addPedido: (pedido) => {
    const newPedido: Pedido = {
      ...pedido,
      id: `p${Date.now()}`,
      numero_pedido: `URB-2026-${String(get().pedidos.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    set({ pedidos: [...get().pedidos, newPedido] });
  },

  addAvaliacao: (avaliacao) => {
    const newAvaliacao: Avaliacao = { ...avaliacao, id: `a${Date.now()}`, createdAt: new Date().toISOString().split("T")[0] };
    set({ avaliacoes: [...get().avaliacoes, newAvaliacao] });
  },

  getAvaliacoesByProduct: (productId) => get().avaliacoes.filter(a => a.id_produto === productId),
  getPedidosByUser: (userId) => get().pedidos.filter(p => p.id_usuarios === userId),
}));
