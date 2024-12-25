import { create } from "zustand";

export const useProductStore = create( (set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: "All fields are required"};
        }
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const data = await response.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return {success: true, message: "Product created"};
    }
}));