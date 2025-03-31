import { imapClient } from "../config/imapclient"
const { simpleParser } = require("mailparser");;

const senderEmail = "noreply@phonepe.com";

export const fetchEmails = async (sinceDate: string, beforeDate: string): Promise<String[]> => {
    // Wait until client connects and authorizes
    sinceDate = sinceDate.replaceAll('/','-');
    beforeDate = beforeDate.replaceAll('/','-');
    const sinceDateFormatted = new Date(sinceDate);
    const beforeDateFormatted = new Date(beforeDate);
    const emailsDs: Array<String> = [];
    const client = imapClient();
    await client.connect();

    // Select and lock a mailbox. Throws if mailbox does not exist
    let lock = await client.getMailboxLock('INBOX');
    console.log(sinceDateFormatted);
    console.log(beforeDateFormatted);
    try {
        // fetch latest message source
        // client.mailbox includes information about currently selected mailbox
        // "exists" value is also the largest sequence number available in the mailbox
        // let message = await client.fetchOne(client.mailbox.exists, { source: true });
        const messageIds = await client.search({ 
            from: senderEmail,
            since: sinceDateFormatted,
            before: beforeDateFormatted
        });

        console.log(`Found ${messageIds.length} emails from ${senderEmail}`);
        // console.log(message.source.toString());

        if (messageIds.length === 0) {
            console.log("No emails found from this sender.");
            return [];
          }
        // list subjects for all messages
        // uid value is always included in FETCH response, envelope strings are in unicode.
        // Fetch and process the emails
        for await (const message of client.fetch(messageIds, { source: true })) {
            const parsedEmail = await simpleParser(message.source);
            emailsDs.push(parsedEmail.subject);
            // console.log("Subject:", parsedEmail.subject);
            // console.log("From:", parsedEmail.from?.text);
            // console.log("Body:", parsedEmail.text);
            // console.log("----");
        }
    } finally {
        // Make sure lock is released, otherwise next `getMailboxLock()` never returns
        lock.release();
    }

    // log out and close connection
    await client.logout();
    return emailsDs;
};