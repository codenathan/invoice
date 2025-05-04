import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Client, Invoice, PaginationLinks } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Pagination } from '@/components/pagination';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoice',
        href: '/invoice',
    },
];

interface Flash {
    success?: string;
    danger?: string;
}

interface InvoiceData {
    data: Invoice[];
    links : PaginationLinks[]
}

export default function ClientIndex({invoices}: {invoices: InvoiceData}) {
    const { flash } = usePage<{flash : Flash}>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end">
                    <Link href={route('invoice.create')} className="text-indigo-500 underline">New Invoice</Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your invoices</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.data.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>{invoice.client.name}</TableCell>
                                    <TableCell>{invoice.status}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('invoice.edit', invoice.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounde">Edit</Link>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

                    <div className="mt-4">
                        <Pagination links={invoices.links} />
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
