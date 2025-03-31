import { fetchEmails } from "./fetchemails-imap";

export const calculateExpenses = async (sinceDate: string, beforeDate: string) => {
    const emails = await fetchEmails(sinceDate, beforeDate);
    return emails;
}