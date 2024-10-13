// Importing required React features and types
"use client"; // Indicates this is for client-side rendering in Next.js (specific directive)
import React, { createContext, useReducer, useContext, ReactNode } from "react";

// Define types for the transactions and the overall state

export interface Transaction {
  id: string; // Unique identifier for each transaction
  date: Date; // Date of the transaction as a Date object
  type: "deposit" | "withdrawal" | "transfer"; // Type of the transaction
  amount: number; // Amount of money involved in the transaction
  description?: string; // Optional description of the transaction
  fromAccount?: string | null; // Optional: Account from which the money is transferred (if applicable)
  toAccount?: string | null; // Optional: Account to which the money is transferred (if applicable)
  balance: number; // Current balance of the account
  currency: string; // Currency of the transaction
}

// Define the shape of the state that will be managed by the reducer
type State = {
  balance: number; // The current balance of the account
  transactions: Transaction[]; // List of all transactions (deposit, withdrawal, transfer)
};

// Define the different actions that can modify the state
type Action =
  | {
      type: "DEPOSIT"; // Action type for depositing money
      amount: number; // Amount of money to deposit
      description: string; // Description of the deposit
      id: string; // Unique identifier for the transaction
      date: Date; // Date of the deposit
      currency: string;
    }
  | {
      type: "WITHDRAW"; // Action type for withdrawing money
      amount: number; // Amount of money to withdraw
      description: string; // Description of the withdrawal
      id: string; // Unique identifier for the transaction
      fromAccount: string; // Account from which the money is being withdrawn
      date: Date; // Date of the withdrawal
      currency: string;
    }
  | {
      type: "TRANSFER"; // Action type for transferring money
      amount: number; // Amount of money to transfer
      description: string; // Description of the transfer
      id: string; // Unique identifier for the transaction
      fromAccount: string; // Account from which the money is being transferred
      toAccount: string; // Account to which the money is being transferred
      date: Date; // Date of the transfer
      currency: string;
    };

// Define the initial state of the account
const initialState: State = {
  balance: 0, // Initial balance is set to zero
  transactions: [], // No transactions initially
};

// Reducer function that handles how the state is updated based on different actions
function accountReducer(state: State, action: Action): State {
  switch (action.type) {
    case "DEPOSIT": // Handle deposits
      const depositTransaction: Transaction = {
        id: action.id, // Set transaction ID
        date: action.date, // Set the date of the transaction
        type: "deposit", // Set the type as deposit
        amount: action.amount, // Set the amount of money deposited
        description: action.description, // Set the description
        balance: state.balance + action.amount, // Increase the balance by the deposit amount
        currency: action.currency,
      };
      return {
        ...state, // Keep the existing state
        balance: state.balance + action.amount, // Increase the balance by the deposit amount
        transactions: [...state.transactions, depositTransaction], // Add this transaction to the list
      };

    case "WITHDRAW":
      if (state.balance < action.amount) {
        throw new Error("Insufficient balance"); // Check if there's enough balance to withdraw
      }
      const withdrawTransaction: Transaction = {
        id: action.id,
        date: action.date,
        type: "withdrawal",
        amount: action.amount,
        description: action.description,
        fromAccount: action.fromAccount, // Ensure this is correctly set
        balance: state.balance - action.amount,
        currency: action.currency,
      };
      return {
        ...state,
        balance: state.balance - action.amount,
        transactions: [...state.transactions, withdrawTransaction],
      };

    case "TRANSFER":
      if (state.balance < action.amount) {
        throw new Error("Insufficient balance for transfer");
      }
      const newBalance = state.balance - action.amount;
      const transferTransaction: Transaction = {
        id: action.id,
        date: action.date,
        type: "transfer",
        amount: action.amount,
        fromAccount: action.fromAccount,
        toAccount: action.toAccount,
        description: action.description,
        balance: newBalance, // Add this line
        currency: action.currency,
      };
      return {
        ...state,
        balance: newBalance,
        transactions: [...state.transactions, transferTransaction],
      };

    default:
      return state; // If the action is not recognized, return the current state without any changes
  }
}

// Create a context to hold the state and the dispatch function
export const AccountContext = createContext<
  | {
      state: State; // The current state (balance, transactions)
      dispatch: React.Dispatch<Action>; // The dispatch function to send actions to the reducer
    }
  | undefined
>(undefined); // The initial context value is undefined

// Provider component that wraps around any components needing access to the account state
export const AccountProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(accountReducer, initialState); // Initialize the reducer

  return (
    <AccountContext.Provider value={{ state, dispatch }}>
      {children} {/* Render the children components */}
    </AccountContext.Provider>
  );
};

// Custom hook for accessing the context (makes using context easier)
export const useAccount = () => {
  const context = useContext(AccountContext); // Access the AccountContext
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider"); // Throw an error if used outside the provider
  }
  return context; // Return the context (state and dispatch function)
};
