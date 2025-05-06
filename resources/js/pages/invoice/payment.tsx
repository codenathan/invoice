import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Invoice, Payment } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ArrowLeft, Pencil, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger ,DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoice Payments',
        href: '/invoice',
    },
];

interface Flash {
    success?: string;
    danger?: string;
}

interface PaymentData {
    payments : Payment[],
    invoice : Invoice
}


export default function ClientIndex({ payments, invoice }: PaymentData) {
    const { flash } = usePage<{flash : Flash}>().props;

    const [isOpen, setIsOpen] = useState(false);
    const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

    const { data, setData, post, patch, processing, reset, delete: destroy ,errors } = useForm({
        date: '',
        amount: invoice.total_amount,
        description: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingPayment) {
            patch(route('payment.update', editingPayment.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingPayment(null);
                },
            });
        } else {
            post(route('payment.store', invoice.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (payment: Payment) => {
        setEditingPayment(payment);
        setData({
            date: payment.date,
            amount: payment.amount,
            description: payment.description || '',
        });
        setIsOpen(true);
    };

    const handleDelete = (paymentId: number) => {
        destroy(route('payment.destroy', paymentId));
    };

    const openDialog = (open: boolean) => {
        if (!open) {
            reset();
            setEditingPayment(null);
        }
        setIsOpen(open);
    }

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }
    })


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payments" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between gap-4">
                    <div>
                        <Link className="flex" href={route('invoice.edit', invoice.id)}>
                            <ArrowLeft />
                            Back to Invoice
                        </Link>
                    </div>

                    <div className="flex justify-end">
                        <Dialog open={isOpen} onOpenChange={openDialog}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Payment
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                            <DialogDescription>
                                { editingPayment ? 'Edit payment details' : 'Add a new payment'}
                            </DialogDescription>
                            <DialogHeader>
                                <DialogTitle>{editingPayment ? 'Edit Payment' : 'Create New Payment'}</DialogTitle>
                            </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <div>
                                            Select Date <br />
                                            <Input id="due_date" type="date"
                                                   value={
                                                       data.date
                                                   }
                                                   onChange={
                                                       (e) => setData('date', e.target.value)
                                                   }
                                                   className="focus:ring-2 focus:ring-primary"/>
                                            <InputError message={errors.date} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Amount</Label>
                                        <Input id="title" type="number" value={data.amount} onChange={(e) => setData('amount', Number(e.target.value))} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                    </div>
                                    <Button type="submit" disabled={processing}>{editingPayment ? 'Update' : 'Create'}</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>


                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your payments</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell className="font-medium">{payment.id}</TableCell>
                                    <TableCell>{format(new Date(payment.date), 'PPP')}</TableCell>
                                    <TableCell>
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }).format(payment.amount)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"
                                                onClick={
                                                    () => handleEdit(payment)
                                                }
                                                className="hover:bg-primary/10 hover:text-primary">
                                            <Pencil className="h-4 w-4"/>
                                        </Button>
                                        <Button variant="ghost" size="icon"
                                                onClick={
                                                    () => handleDelete(payment.id)
                                                }
                                                className="hover:bg-destructive/10 hover:text-destructive">
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>


        </AppLayout>
    );
}
