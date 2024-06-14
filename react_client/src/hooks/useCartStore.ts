import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// import { axiosClient } from "../librarys/axiosClient";
// import config from "../constants/config";

interface CartItem {
  product: string;
  name: string;
  discount: number;
  price: number;
  quantity: number;
  thumb: string;
}

interface CartStore {
  items: CartItem[]; //Lưu danh sách products
  total: number; //Tổng tiền
  itemCount: number; //Tổng items có trong giỏ
  addItem: (item: CartItem) => void; //phương thức thêm item
  removeItem: (id: string) => void; //phương thức xóa item
  increaseQuantity: (id: string) => void; //tăng số lượng của item
  decreaseQuantity: (id: string) => void; //giảm số lượng của item
  placeOrder: (payload: any) => Promise<{ ok: boolean; message: string }>;
  isLoading: boolean;
  error: string | null;
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      total: 0,
      itemCount: 0,
      isLoading: false,
      error: null,
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.product === item.product
          );
          if (existingItem) {
            // Nếu mặt hàng đã tồn tại, tăng số lượng lên 1
            return {
              ...state,
              items: state.items.map((i) =>
                i.product === item.product
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              total: state.total + item.price,
              itemCount: state.itemCount + 1,
            };
          } else {
            // Nếu mặt hàng chưa tồn tại, thêm vào giỏ hàng
            return {
              ...state,
              items: [...state.items, item],
              total: state.total + item.price,
              itemCount: state.itemCount + 1,
            };
          }
        }),
      removeItem: (id) =>
        set((state) => {
          const itemToRemove = state.items.find((item) => item.product === id);
          if (!itemToRemove) return state;

          return {
            items: state.items.filter((item) => item.product !== id),
            total: state.total - itemToRemove.price * itemToRemove.quantity,
            itemCount: state.itemCount - itemToRemove.quantity,
          };
        }),
      increaseQuantity: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.product === id);
          if (!item) return state;

          return {
            ...state,
            items: state.items.map((i) =>
              i.product === id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            total: state.total + item.price,
            itemCount: state.itemCount + 1,
          };
        }),
      decreaseQuantity: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.product === id);
          if (!item || item.quantity <= 0) return state;

          return {
            ...state,
            items: state.items.map((i) =>
              i.product === id ? { ...i, quantity: i.quantity - 1 } : i
            ),
            total: state.total - item.price,
            itemCount: state.itemCount - 1,
          };
        }),
      placeOrder: async (payload) => {
        try {
          set({ isLoading: true });
          const response = await fetch("http://localhost:8080/api/v1/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();
          console.log("Order created:", data);

          /*
            if gui don hanh cong
              - Xoa gio hang
              - Chuyen huong den trang thong bao thanh cong
            else
              - show message loi
            */

          if (data.statusCode === 201) {
            //Reset state
            set({
              isLoading: false,
              itemCount: 0,
              items: [],
              total: 0,
              error: null,
            });
            return { ok: true, message: "success" };
          } else {
            set({ isLoading: false });
            return { ok: false, message: "not success" };
          }
        } catch (error: any) {
          console.log("placeOrder nok", error?.response?.data.message);
          const msg = error?.response?.data.message || "Internal Server Error)";
          set({ isLoading: false, error: msg });
          return { ok: false, message: msg };
        }
      },
    }),
    {
      name: "cart-storage", // tên của key trong localStorage
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);