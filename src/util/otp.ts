import SecurityToolKit from "security-toolkit";
import { otpConfig } from "../config/env";

const securityToolKit = new SecurityToolKit({ TOTP: { ...otpConfig } });
function generateOTPSecret(): string {
  return securityToolKit.generateSecret();
}

function generateOTPCode(secret: string): string {
  return securityToolKit.generateCode(secret);
}

function validateRequestOTP(secret: string, code: string): boolean {
  return securityToolKit.validateUserCode(secret, code);
}

export { generateOTPSecret, generateOTPCode, validateRequestOTP };
