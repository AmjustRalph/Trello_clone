// types.ts
export interface Card {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
  }
  
  export interface List {
    id: number;
    title: string;
    cards: Card[];
  }
  
  export interface Board {
    id: number;
    title: string;
    lists: List[];
}
  