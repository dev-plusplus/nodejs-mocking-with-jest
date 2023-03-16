import {fetchInvoicesByDate} from "./stripe-api";
import {AbstractServiceContext, Invoice} from "./types";

/**
 * Fetches invoices from Stripe and returns a report of the Total Amount Due, Paid and Remaining
 * @param startDate
 * @param endDate
 * @param serviceContext
 */
export const fetchInvoicesReportByDate = async (startDate: string, endDate: string, serviceContext: AbstractServiceContext) => {
    const rawInvoices: Invoice[] = await fetchInvoicesByDate(startDate, endDate, serviceContext);

    // Grouping
    let totalAmountDue = 0;
    let totalAmountPaid = 0;
    let totalAmountRemaining = 0;
    rawInvoices.forEach((invoice: Invoice) => {
        totalAmountDue += invoice.amountDue;
        totalAmountPaid += invoice.amountPaid;
        totalAmountRemaining += invoice.amountRemaining;
    });

    return {
        totalAmountDue, totalAmountPaid, totalAmountRemaining
    }
}
