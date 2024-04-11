import dotenv from "dotenv";
import path from "path";
import payload, { Payload } from "payload";
import type { InitOptions } from "payload/config";
import nodemailer from "nodemailer";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface IArgsProps {
  initOptions?: Partial<InitOptions>;
}

export const getPayloadClient = async ({
  initOptions,
}: IArgsProps = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing in environment config");
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    cached.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: "onboarding@resend.dev",
        fromName: "DigitalRocket",
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (error: unknown) {
    cached.promise = null;
    throw error;
  }

  return cached.client;
};
