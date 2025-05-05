import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Invoice {
    id: number;
    client_id: number;
    client: Client;
    date: string;
    status: string;
    items : InvoiceItem[];
    total_amount : number;
}

export interface InvoiceItem {
    id: number;
    invoice_id: number;
    invoice: Invoice;
    description: string;
    name: string;
    quantity: number;
    rate: number;
    amount: number;
}

export interface Client {
    id: number;
    name: string;
    address_line_1? : string;
    address_line_2? : string;
    city? : string;
    state? : string;
    postal_code? : string;
    notes? : string;
    invoices_count? : number
}

export interface BusinessSetting {
    id: number;
    name?: string;
    address_line_1? : string;
    address_line_2? : string;
    city? : string;
    state? : string;
    postal_code? : string;
    invoice_footer? : string;
    logo? : string
}

export interface PaginationLinks {
    url : string;
    label : string;
    active : boolean;
}


