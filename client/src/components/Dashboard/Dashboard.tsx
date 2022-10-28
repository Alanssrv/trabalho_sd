import { useState } from "react";
import { Group, Grid, Card, Text } from "@mantine/core";
import { Transaction } from "../../App";

function Dashboard(props: { transactions: Transaction[]; }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('isDeposit');

    const summary = props.transactions.reduce((acc, transaction) => {
        if (transaction.isDeposit === true) {
            acc.deposits += transaction.value;
            acc.total += transaction.value;
        } else {
            acc.withdraws += transaction.value;
            acc.total -= transaction.value;
        }

        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    });

    return (
        <>
            <Grid>
                <Grid.Col span={4}>
                    <Card>
                        <Group position="apart" mt="md" mb="xs">
                            <Text size="xl" weight={500}>Entradas</Text>
                        </Group>
                        <Text size="sm">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(summary.deposits)}
                        </Text>
                    </Card>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Card>
                        <Group position="apart" mt="md" mb="xs">
                            <Text size="xl" weight={500}>Saídas</Text>
                        </Group>
                        <Text size="sm">
                            {summary.withdraws !== 0 ? '-' : ''}
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(summary.withdraws)}
                        </Text>
                    </Card>
                </Grid.Col>
                <Grid.Col span={4} className="highlight-background">
                    <Card>
                        <Group position="apart" mt="md" mb="xs">
                            <Text size="xl" weight={500}>Total</Text>
                        </Group>
                        <Text size="sm">
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(summary.total)}
                        </Text>
                    </Card>
                </Grid.Col>
            </Grid>
        </>
    );
}

export default Dashboard;