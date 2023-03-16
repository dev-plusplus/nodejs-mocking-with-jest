import {AbstractServiceContext} from "./types";

export const fetchInvoicesByDate = async (startDate: string, endDate: string, serviceContext: AbstractServiceContext) => {
    const {stripeClient} = serviceContext;
    const invoices = await stripeClient.invoices.list({
        limit: 100,
        created: {
            gte: startDate,
            lte: endDate
        }
    })
    return invoices.data;
}
