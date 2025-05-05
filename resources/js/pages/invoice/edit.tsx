import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Client, Invoice, InvoiceItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { InvoiceStatus, InvoiceStatusLabels } from '@/types/enums';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Invoice',
        href: '/client',
    },
];

type InvoiceFormItem = {
    description: string;
    quantity: number;
    rate: number;
    amount: number;
};

export default function InvoiceEdit({ clients, invoice }: { clients: Client[], invoice: Invoice }) {
    const { data, setData, patch, processing, errors } = useForm({
        id: invoice.id,
        client_id: invoice.client_id ?? null,
        date: invoice.date ? format(new Date(invoice.date), 'yyyy-MM-dd') : '',
        status: invoice.status,
        items: invoice.items.map((item: InvoiceItem) => ({
            description: item.description ?? '',
            quantity: Number(item.quantity ?? 0),
            rate: Number(item.rate ?? 0),
            amount: Number(item.amount ?? 0),
        })),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('invoice.update', invoice.id));
    };

    const updateItem = (index: number, field: keyof InvoiceFormItem, value: string | number) => {
        const updatedItems = [...data.items];
        const numericValue = field === 'description' ? value : Number(value);
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: numericValue,
        };
        updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].rate;
        setData('items', updatedItems);
    };

    const total = data.items.reduce((sum, item) => sum + Number(item.amount), 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Invoice" />
            <section className="rounded-lg p-4">
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">

                        <div className="flex justify-between gap-4">
                            <div>
                                Select a Client
                                <Select
                                    value={data.client_id ? String(data.client_id) : ''}
                                    onValueChange={(value) => setData('client_id', Number(value))}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select A Client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map((client) => (
                                            <SelectItem key={client.id} value={String(client.id)}>{client.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <InputError message={errors.client_id} />
                            </div>
                            <div>
                                <div>
                                    Select Date <br />
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] justify-start text-left font-normal",
                                                    !data.date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {data.date ? format(new Date(data.date), "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={data.date ? new Date(data.date) : undefined}
                                                onSelect={(date) => {
                                                    if (date) {
                                                        setData('date', format(date, 'yyyy-MM-dd'));
                                                    }
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <InputError message={errors.date} />
                                </div>

                                <div className="mt-4">
                                    Select Status <br />
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value as InvoiceStatus)}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(InvoiceStatus).map((status) => (
                                                <SelectItem key={status} value={status}>
                                                    {InvoiceStatusLabels[status]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <InputError message={errors.status} />
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[700px]">Description</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Rate</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                                                    className="w-full border rounded px-2 py-1"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                                    className="w-full border rounded px-2 py-1"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    type="number"
                                                    value={item.rate}
                                                    onChange={(e) => updateItem(index, 'rate', e.target.value)}
                                                    className="w-full border rounded px-2 py-1"
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                ${Number(item.amount).toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={3}>Total</TableCell>
                                        <TableCell className="text-right">
                                            ${total.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setData("items", [
                                        ...data.items,
                                        { description: '', quantity: 1, rate: 0, amount: 0 }
                                    ])
                                }
                            >
                                + Add Item
                            </Button>

                            <InputError message={errors.items} />
                        </div>
                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Update
                        </Button>
                    </div>
                </form>
            </section>
        </AppLayout>
    );
}
