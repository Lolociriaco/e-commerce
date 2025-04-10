export interface Product {
    //id to-do
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    type: Type;
    gender: Category
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Category = 'men' | 'women' | 'kid' | 'unisex';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';