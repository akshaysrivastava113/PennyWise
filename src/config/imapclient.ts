const { ImapFlow }  = require("imapflow");
import dotenv from "dotenv";

dotenv.config();

const imapConfig = {
    host: process.env.EMAIL_HOST,
    port: 993,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
}
console.log(imapConfig);

export const imapClient = (): any => {
    return new ImapFlow(imapConfig);
}