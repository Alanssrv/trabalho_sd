import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Group, TextInput, NumberInput, SegmentedControl, ActionIcon } from "@mantine/core";
import { ENDPOINT, Transaction } from "../../App";
import { KeyedMutator } from "swr";
import { IconEdit } from "@tabler/icons";

function UpdateTransaction({transaction, mutate}: { transaction: Transaction; mutate: KeyedMutator<Transaction[]> }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('isDeposit');

    const form = useForm({
        initialValues: {
            title: transaction.title,
            value: transaction.value,
            category: transaction.category,
            isDeposit: bool2str(transaction.isDeposit),
        },
    });

    async function updateTransaction(values: { title: string; value: number; category: string; isDeposit: string }) {
        var sendValues = {
            title: values.title,
            value: values.value,
            category: values.category,
            isDeposit: str2bool(values.isDeposit.toString())
        }
        const updated = await fetch(`${ENDPOINT}/api/transaction/${transaction.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendValues),
        }).then(() => fetch(`${ENDPOINT}/api/transactions`, {
            method: "GET"
        })).then((r) => r.json());

        mutate(updated);
        setOpen(false);
    }

    function bool2str(value: boolean) {
        if (typeof value === "boolean") {
            if (value) return "isDeposit";
            if (!value) return "withDraw";
        }
        return "isDeposit";
    }

    function str2bool(value: string) {
        if (value && typeof value === "string") {
            if (value === "isDeposit") return true;
            if (value === "withDraw") return false;
        }
        return false;
    }

    return (
        <>
            <Modal opened={open} onClose={() => setOpen(false)} title="Atualizar transação">
                <form onSubmit={form.onSubmit(updateTransaction)}>
                    <TextInput
                        required
                        mb={12}
                        label="Título"
                        placeholder=""
                        {...form.getInputProps("title")}
                    />
                    <NumberInput
                        required
                        min={0}
                        precision={2}
                        defaultValue={0}
                        decimalSeparator=','
                        label="Value"
                        mb={12}
                        {...form.getInputProps('value')}
                    />
                    <TextInput
                        required
                        mb={12}
                        label="Category"
                        placeholder=""
                        {...form.getInputProps("category")}
                    />
                    <SegmentedControl
                        fullWidth
                        value={value}
                        onChange={setValue}
                        color='blue'
                        data={[
                            { label: 'Entrada', value: 'isDeposit' },
                            { label: 'Saída', value: 'withDraw' },
                        ]}
                        {...form.getInputProps("isDeposit")}
                    />

                    <Button fullWidth type="submit" mt={12}>ATUALIZAR</Button>
                </form>
            </Modal>

            <Group>
                <ActionIcon variant="subtle"
                    color="orange" onClick={() => setOpen(true)}><IconEdit size={16} /></ActionIcon>
                <ActionIcon/>
            </Group>
        </>
    );
}

export default UpdateTransaction;