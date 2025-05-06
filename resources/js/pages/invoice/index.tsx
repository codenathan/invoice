import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Invoice, PaginationLinks } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Pagination } from '@/components/pagination';
import { InvoiceStatus, InvoiceStatusLabels } from '@/types/enums';
import { Pencil } from 'lucide-react';


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

export default function ClientIndex({invoices ,filter}: {invoices: InvoiceData, filter: string}) {
    const { flash } = usePage<{flash : Flash}>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success)
        }
    })

    const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>(filter as InvoiceStatus | 'all');

    const handleFilterChange = (value: InvoiceStatus | 'all') => {
        setStatusFilter(value);
        router.get(route('invoice.index'), {
            filter: value
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-end gap-4 items-center">
                    <div>
                        <Link href={route('invoice.create')} className="text-indigo-500 underline">New Invoice</Link>
                    </div>

                    <div>
                        <Select value={statusFilter} onValueChange={handleFilterChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value={InvoiceStatus.Sent}>{InvoiceStatusLabels[InvoiceStatus.Sent]}</SelectItem>
                                <SelectItem value={InvoiceStatus.Paid}>{InvoiceStatusLabels[InvoiceStatus.Paid]}</SelectItem>
                                <SelectItem value={InvoiceStatus.Draft}>{InvoiceStatusLabels[InvoiceStatus.Draft]}</SelectItem>
                                <SelectItem value={InvoiceStatus.Cancelled}>{InvoiceStatusLabels[InvoiceStatus.Cancelled]}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
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
                                <TableHead>Amount</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.data.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>{invoice.client.name}</TableCell>
                                    <TableCell>{invoice.status}</TableCell>
                                    <TableCell>{invoice.total_amount}</TableCell>
                                    <TableCell>
                                        <Link href={route('invoice.edit', invoice.id)}><Pencil className="h-4 w-4" /></Link>
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
