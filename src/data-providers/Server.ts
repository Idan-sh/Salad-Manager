import { products as mockProducts } from "../mock-data/products"
import { questions } from "../mock-data/questions";

let UNIQUE_ID = 2000;

let products = [...mockProducts]; // Start with a copy of the mock data

const getDeepCopy = (obj: any) => JSON.parse(JSON.stringify(obj));

//feel free to add funcitons

export interface Ingredient {
    product_id: number;
    quantity: number
}
export interface Product {
    id: number;
    title: string;
    in_stock: boolean;
    ingredients: Ingredient[]
}

export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
}

const getAllProducts = async (): Promise<Product[]> => {
    //DO NOT EDIT THIS FUNCTION
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getDeepCopy(products));
        }, 1000);
    })
}

const getProductById = async (id: number): Promise<Product | undefined> => {
    // DO NOT EDIT THIS FUNCTION
    const product = products.find(product => product.id === id);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getDeepCopy(product));
        }, 1000);
    })
}


const createIngredient = async (title: string): Promise<Product[]> => {
    UNIQUE_ID += 1;
    
    const newProduct: Product = {
        id: UNIQUE_ID,
        title,
        in_stock: true,
        ingredients: []
    };

    products = [...products, newProduct];

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getDeepCopy(products));
        }, 500);
    })
}

const createSalad = async (title: string, ingredients: Ingredient[]): Promise<Product[]> => {
    UNIQUE_ID += 1;

    const newSalad: Product = {
        id: UNIQUE_ID,
        title,
        in_stock: true,
        ingredients
    };

    products = [...products, newSalad]; 

    await updateSaladsStock();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getDeepCopy(products));
        }, 500);
    });
};

const toggleProductInStock = async (id: number): Promise<Product[]> => {
    products = products.map((product) =>
        product.id === id
        ? { ...product, in_stock: !product.in_stock }
        : product
    );

    await updateSaladsStock();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(getDeepCopy(products));
        }, 500);
    })
};


const updateSaladsStock = async () => {
    products.forEach((product) => {
        const isSalad = product.ingredients.length > 0;

        if (isSalad) {
            product.in_stock = product.ingredients.every((ingredient) => {
                const ingredientProd = products.find((prod) => prod.id === ingredient.product_id);
                return ingredientProd?.in_stock ?? false;
            });
        }
    });
};

const getAllIngredientsAsProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
        resolve(products.filter((product) => product.ingredients.length === 0))
    })
}

const getQuestions = async (): Promise<Question[]> => {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(questions);
        }, 1000);
    })
}

export const DB = {
    getAllProducts,
    getProductById,
    getQuestions,
    toggleProductInStock,
    getAllIngredientsAsProducts,
    createIngredient,
    createSalad
}

