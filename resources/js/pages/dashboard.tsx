import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CircleDollarSign, Contact, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    stats?: {
        totalClients: number;
        totalInvoices: number;
        totalPaidInvoices: number;
    };
}

export default function Dashboard({stats = {
    totalClients: 0,
    totalInvoices: 0,
    totalPaidInvoices: 0,
}}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Welcome back! Here's your overview</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('client.index')}>
                            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                                <Contact className="mr-2 h-4 w-4" />
                                View Clients
                            </Button>
                        </Link>
                        <Link href={route('invoice.index')}>
                            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                                <FileText className="mr-2 h-4 w-4" />
                                View Invoices
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-600/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-500">Total Clients</CardTitle>
                            <Contact className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-500">{stats.totalClients}</div>
                            <p className="text-muted-foreground text-xs">Your total clients</p>
                        </CardContent>
                    </Card>
                    <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-green-600/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-500">Total Invoices</CardTitle>
                            <FileText className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">{stats.totalInvoices}</div>
                            <p className="text-muted-foreground text-xs">All your invoices</p>
                        </CardContent>
                    </Card>
                    <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-yellow-500">Paid Invoices</CardTitle>
                            <CircleDollarSign className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-500">{stats.totalPaidInvoices}</div>
                            <p className="text-muted-foreground text-xs">All your paid invoices</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
