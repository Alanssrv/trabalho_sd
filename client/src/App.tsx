import { ActionIcon, Box, Divider, Table } from '@mantine/core'
import { TrashIcon } from '@primer/octicons-react';
import { IconEdit } from '@tabler/icons';
import useSWR from 'swr';
import './App.css'
import Dashboard from './components/Dashboard/Dashboard';
import AddTransaction from './components/NewTransactionModal/AddTransaction';
import TransactionsTable from './components/TransactionsTable/TransactionsTable';

export interface Transaction {
  id: number;
  title: string;
  value: number;
  category: string;
  isDeposit: boolean;
  createdAt: Date;
}

export const ENDPOINT = "http://localhost:8090"

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
  const { data, mutate } = useSWR<Transaction[]>("api/transactions", fetcher);

  return (
    <Box sx={(theme) => ({
      padding: "2rem",
      width: "100%",
      maxWidth: "60rem",
      margin: "0 auto",
    })}>
      <Dashboard transactions={data ?? []} />
      <Divider my="sm"/>
      <TransactionsTable mutate={mutate} transactions={data ?? []}/>
      <AddTransaction mutate={mutate} />
    </Box>

  );
}

export default App
