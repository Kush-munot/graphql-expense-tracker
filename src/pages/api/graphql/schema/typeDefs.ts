import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Expense {
    id: ID!
    category: String!,
    modeOfPayment: String!,
    amount: Float!,
    message: String!,
    type: String!,
  }

  type Query {
    getExpenses: [Expense]
    getExpense(id: ID!): Expense
  }

  type Mutation {
    addExpense(
    category: String!,
    modeOfPayment: String!,
    amount: Float!,
    message: String!,
    type: String!
    ): Expense
    updateExpense(
    id: ID!, 
    category: String,
    modeOfPayment: String,
    amount: Float,
    message: String,
    type: String
    ): Expense
    deleteExpense(id: ID!): Expense
  }
`;