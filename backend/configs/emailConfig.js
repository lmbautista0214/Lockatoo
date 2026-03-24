import { Resend } from "resend";
import dotEnv from "dotenv";

dotEnv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;