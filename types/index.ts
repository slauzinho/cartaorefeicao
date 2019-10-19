export interface Card {
    cardNumber: string;
    cardPassword: string;
    cardColor: string;
    cardName: string;
    email?: string;
    tipo?: string;
}

export interface IndexState {
    activeIndex: number;
    saldo: string;
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}

export interface CardState {
    cards: Card[];
    loading: boolean;
}

export interface AppState {
    cards: { cards: Card[]; loading: boolean };
    index: IndexState;
}

export interface Transaction {
    description: string;
    value: string;
    date: string;
}

export interface Details {
    saldo: string;
    transactions: Transaction[];
}
