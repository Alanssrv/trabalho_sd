import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Modal, Group, TextInput, NumberInput, SegmentedControl } from "@mantine/core";
import { ENDPOINT, Transaction } from "../../App";
import { KeyedMutator } from "swr";

function AddTransaction({ mutate }: { mutate: KeyedMutator<Transaction[]> }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('isDeposit');

    const form = useForm({
        initialValues: {
            title: "",
            value: 0,
            category: "",
            isDeposit: "isDeposit",
        },
    });

    async function createTransaction(values: { title: string; value: number; category: string; isDeposit: string }) {
        var sendValues = {
            title: values.title,
            value: values.value,
            category: values.category,
            isDeposit: str2bool(values.isDeposit.toString())
        }
        const updated = await fetch(`${ENDPOINT}/api/transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendValues),
        }).then(() => fetch(`${ENDPOINT}/api/transactions`, {
            method: "GET"
        })).then((r) => r.json());

        mutate(updated);
        form.reset();
        setOpen(false);
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
            <Modal opened={open} onClose={() => setOpen(false)} title="Nova Transação">
                <form onSubmit={form.onSubmit(createTransaction)}>
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

                    <Button fullWidth type="submit" mt={12}>CRIAR</Button>
                </form>
            </Modal>

            <Group position="center">
                <Button fullWidth mb={12} onClick={() => setOpen(true)}>
                    ADICIONAR TRANSAÇÃO
                </Button>
            </Group>
        </>
    );
}

export default AddTransaction;