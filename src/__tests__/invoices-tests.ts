import {fetchInvoicesReportByDate} from "../invoicing-services";
import {AbstractServiceContext} from "../types";
import {fetchInvoicesByDate} from "../stripe-api";

jest.mock('../stripe-api', () => {
    return {
        fetchInvoicesByDate: jest.fn(() => {
            return Promise.resolve([]);
        })
    }
});

describe("Testing Invoices Report", () => {
    const serviceContext = {} as AbstractServiceContext;
    const endDate = "2020-01-31";
    const startDate = "2020-01-01";
    test("should be 0,0,0 when no invoices", async () => {
        const results = await fetchInvoicesReportByDate(startDate, endDate, serviceContext);
        expect(results).toMatchObject({
            totalAmountDue: 0,
            totalAmountPaid: 0,
            totalAmountRemaining: 0
        })
    });

    test("it should support negative balances", async () => {
        const invoice1 = {
            id: '1',
            amountDue: 100,
            amountPaid: 100,
            amountRemaining: 0,
            userId: '1',
            created: '2020-01-01',
            currency: 'usd'
        };
        const invoice2 = {
            id: '1',
            amountDue: -10,
            amountPaid: 0,
            amountRemaining: -10,
            userId: '1',
            created: '2020-01-01',
            currency: 'usd'
        };
        const invoices = [invoice1, invoice2];
        // @ts-ignore
        fetchInvoicesByDate.mockReturnValueOnce(Promise.resolve(invoices));
        const results = await fetchInvoicesReportByDate(startDate, endDate, serviceContext);
        expect(results).toMatchObject({
            totalAmountDue: 90,
            totalAmountPaid: 100,
            totalAmountRemaining: -10
        })

    });


})
