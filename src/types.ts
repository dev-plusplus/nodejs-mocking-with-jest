export interface AbstractServiceContext {
    stripeClient: any
}

export interface Invoice{
    id: string;
    amountDue: number;
    amountPaid: number;
    amountRemaining: number;
    userId: string;
    created: string;
    currency: string;
}
