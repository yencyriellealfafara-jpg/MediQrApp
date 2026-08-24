// utils/security.ts
import * as Crypto from 'expo-crypto';

// Secret key stored securely (In production, load this from process.env or a secure backend)
const APP_HMAC_SECRET = 'MEDIQR_SECURE_HMAC_SECRET_KEY_2026';

/**
 * Generates a unique, non-reversable Platform ID bound to user email and timestamp.
 */
export async function generateSecurePlatformId(email: string): Promise<string> {
  const timestamp = Date.now().toString();
  const rawPayload = `${email.toLowerCase().trim()}:${timestamp}:${Math.random()}`;

  // Generate SHA-256 Hash
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${rawPayload}:${APP_HMAC_SECRET}`
  );

  // Return formatted secure identifier using first 16 characters of the hash
  const shortHash = hash.substring(0, 16).toUpperCase();
  return `MED-${shortHash.slice(0, 4)}-${shortHash.slice(4, 8)}-${shortHash.slice(8, 12)}-${shortHash.slice(12, 16)}`;
}