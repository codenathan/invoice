export enum InvoiceStatus {
    Draft = 'draft',
    Sent = 'sent',
    Paid = 'paid',
    Cancelled = 'cancelled',
}

export const InvoiceStatusLabels: Record<InvoiceStatus, string> = {
    [InvoiceStatus.Draft]: 'Draft',
    [InvoiceStatus.Sent]: 'Sent',
    [InvoiceStatus.Paid]: 'Paid',
    [InvoiceStatus.Cancelled]: 'Cancelled',
};
