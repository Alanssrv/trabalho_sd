import { ActionIcon, Box, Table } from '@mantine/core'
import { TrashIcon } from '@primer/octicons-react';
import { IconEdit } from '@tabler/icons';
import { KeyedMutator } from 'swr';
import { Transaction } from '../../App';
import DeleteTransaction from '../DeleteTransactionModal/DeleteTransaction';
import UpdateTransaction from '../UpdateTransactionModal/UpdateTransaction';

function TransactionsTable({transactions, mutate}: { transactions: Transaction[]; mutate: KeyedMutator<Transaction[]> }) {
    return <Table verticalSpacing="xs" fontSize="md" mb={12}>
    <thead>
      <tr>
        <th>Descrição</th>
        <th>Valor</th>
        <th>Categoria</th>
        <th>Data</th>
        <th>Excluir</th>
        <th>Editar</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((transaction) => (
        <tr key={transaction.id}>
          <td>{transaction.title}</td>
          <td className={transaction.isDeposit ? 'isDeposit' : 'withDraw'}>
            {transaction.value.toString().replace('.', ',')}
          </td>
          <td>{transaction.category}</td>
          <td>{new Intl.DateTimeFormat('pt-BR', {}).format(
            new Date(transaction.createdAt)
          )}
          </td>
          <td>
            <DeleteTransaction transaction={transaction} mutate={mutate} />
          </td>
          <td>
            <UpdateTransaction transaction={transaction} mutate={mutate}/>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
}

export default TransactionsTable;