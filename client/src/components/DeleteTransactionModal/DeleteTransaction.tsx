import { useState } from "react";
import { Button, Modal, Group, ActionIcon } from "@mantine/core";
import { ENDPOINT, Transaction } from "../../App";
import { KeyedMutator } from "swr";
import { TrashIcon } from "@primer/octicons-react";

function DeleteTransaction({ transaction, mutate }: { transaction: Transaction; mutate: KeyedMutator<Transaction[]> }) {
    const [open, setOpen] = useState(false);

    async function deleteTransaction() {
        const updated = await fetch(`${ENDPOINT}/api/transaction/${transaction.id}`, {
            method: "DELETE",
        }).then(() => fetch(`${ENDPOINT}/api/transactions`, {
            method: "GET"
        })).then((r) => r.json());

        mutate(updated);
        setOpen(false);
    }

    return (
        <>
            <Modal centered opened={open} onClose={() => setOpen(false)} size="auto" title="Deletar Transação?">
                <Group>
                    <Button color="red" onClick={deleteTransaction} >Confirmar</Button>
                    <Button variant="white" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                </Group>
            </Modal>
            <Group>
                <ActionIcon variant="subtle"
                    color="red" onClick={() => setOpen(true)}><TrashIcon size={16} /></ActionIcon>
                <ActionIcon />
            </Group>
        </>
    )
}

export default DeleteTransaction;