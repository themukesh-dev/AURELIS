import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + action.payload.quantity,
                }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            quantity: action.payload.quantity,
          },
        ],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState
  );

  function addToCart(product, quantity = 1) {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity,
      },
    });
  }

  function removeFromCart(productId) {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
  }

  function increaseQuantity(productId) {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: productId,
    });
  }

  function decreaseQuantity(productId) {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: productId,
    });
  }

  function clearCart() {
    dispatch({
      type: "CLEAR_CART",
    });
  }

  const cartCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartSubtotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    items: state.items,
    cartCount,
    cartSubtotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}

export { CartProvider, useCart };