"use client";
import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Define types
interface Transaction {
  id: string; // Unique identifier for each transaction
  date: Date; // Keeping date as string to store in ISO format
  type: "deposit" | "withdrawal" | "transfer";
  amount: number;
  description?: string;
  fromAccount?: string | null;
  toAccount?: string | null;
}

type State = {
  balance: number;
  transactions: Transaction[];
};

type Action =
  | {
      type: "DEPOSIT";
      amount: number;
      description: string;
      id: string;
      date: Date; // Change this to Date
    }
  | {
      type: "WITHDRAW";
      amount: number;
      description: string;
      id: string;
      fromAccount: string;
      date: Date; // Change this to Date
    }
  | {
      type: "TRANSFER";
      amount: number;
      description: string;
      id: string;
      fromAccount: string;
      toAccount: string;
      date: Date; // Change this to Date
    };

// Initial state
const initialState: State = {
  balance: 0,
  transactions: [],
};

// Reducer function
// Reducer function
function accountReducer(state: State, action: Action): State {
  switch (action.type) {
    case "DEPOSIT":
      const depositTransaction: Transaction = {
        id: action.id,
        date: action.date, // Set the date as Date object
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
      if (state.balance < action.amount) {
        throw new Error("Insufficient balance");
      }
      const withdrawTransaction: Transaction = {
        id: action.id,
        date: action.date, // Set the date as Date object
        type: "withdrawal",
        amount: action.amount,
        description: action.description,
        fromAccount: action.fromAccount,
      };
      return {
        ...state,
        balance: state.balance - action.amount,
        transactions: [...state.transactions, withdrawTransaction],
      };

    case "TRANSFER":
      // Check if there is enough balance for the transfer
      if (state.balance < action.amount) {
        throw new Error("Insufficient balance for transfer");
      }
      const transferTransaction: Transaction = {
        id: action.id,
        date: action.date, // Set the date as Date object
        type: "transfer",
        amount: action.amount,
        fromAccount: action.fromAccount,
        toAccount: action.toAccount,
        description: action.description,
      };
      return {
        ...state,
        balance: state.balance - action.amount, // Deduct from the balance
        transactions: [...state.transactions, transferTransaction],
      };

    default:
      return state;
  }
}

// Create context
export const AccountContext = createContext<
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
