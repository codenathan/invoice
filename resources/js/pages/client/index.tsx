import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Client, PaginationLinks } from '@/types';
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
        title: 'Client',
        href: '/client',
    },
];

interface Flash {
    success?: string;
    danger?: string;
}

interface ClientData {
    data: Client[];
    links : PaginationLinks[]
}

export default function ClientIndex({clients}: {clients: ClientData}) {

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
                    <Link href={route('client.create')} className="text-indigo-500 underline">New Client</Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your clients</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Invoices</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.data.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">{client.id}</TableCell>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.invoices_count}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('client.edit', client.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounde">Edit</Link>
                                        {client.invoices_count == 0 && <Link href={route('client.destroy', client.id)} method="delete" as="button" className="text-red-500" >Delete</Link>}

                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>

                    <div className="mt-4">
                        <Pagination links={clients.links} />
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
