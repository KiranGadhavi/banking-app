import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Define types
interface Transaction {
  id: string; // Unique identifier for each transaction
  date: Date;
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  description?: string;
  fromAccount?: string;
  toAccount?: string;
}

type State = {
  balance: number;
  transactions: Transaction[];
};

type Action =
  | { type: "DEPOSIT"; amount: number; description?: string }
  | { type: "WITHDRAW"; amount: number; description?: string }
  | {
      type: "TRANSFER";
      amount: number;
      description?: string;
      toAccount: string;
    };

// Initial state
const initialState: State = {
  balance: 0,
  transactions: [],
};

// Reducer function
function accountReducer(state: State, action: Action): State {
  switch (action.type) {
    case "DEPOSIT":
      const depositTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random id
        date: new Date(),
        type: "deposit",
        amount: action.amount,
        description: action.description,
      };
      return {
        ...state,
        balance: state.balance + action.amount,
        transactions: [...state.transactions, depositTransaction],
      };
    case "WITHDRAW":
      const withdrawTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date(),
        type: "withdrawal",
        amount: action.amount,
        description: action.description,
      };
      return {
        ...state,
        balance: state.balance - action.amount,
        transactions: [...state.transactions, withdrawTransaction],
      };
    case "TRANSFER":
      const transferTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date(),
        type: "transfer",
        amount: action.amount,
        toAccount: action.toAccount,
        description: action.description,
      };
      return {
        ...state,
        balance: state.balance - action.amount,
        transactions: [...state.transactions, transferTransaction],
      };
    default:
      return state;
  }
}

// Create context
const AccountContext = createContext<
  | {
      state: State;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

// Provider component
export const AccountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  return (
    <AccountContext.Provider value={{ state, dispatch }}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook for using context
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
