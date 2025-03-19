import { z } from "zod";

// Password strength requirements
export const passwordStrengthSchema = z
  .string()
  .min(10, "Password must be at least 10 characters long")
  .refine(
    (password) => /[A-Z]/.test(password),
    "Password must contain at least one uppercase letter"
  )
  .refine(
    (password) => /[a-z]/.test(password),
    "Password must contain at least one lowercase letter"
  )
  .refine(
    (password) => /[0-9]/.test(password),
    "Password must contain at least one number"
  )
  .refine(
    (password) => /[^A-Za-z0-9]/.test(password),
    "Password must contain at least one special character"
  )
  .refine(
    (password) => !/(.)\1{2,}/.test(password),
    "Password must not contain sequences of repeated characters"
  );

// Function to check if a password has been compromised using the Pwned Passwords API
// This uses the k-anonymity model to check passwords securely
export async function checkPasswordPwned(password: string): Promise<boolean> {
  try {
    // Generate SHA-1 hash of the password
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    
    // Convert hash to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Get the first 5 characters of the hash (prefix)
    const prefix = hashHex.substring(0, 5).toUpperCase();
    const suffix = hashHex.substring(5).toUpperCase();
    
    // Query the API with just the prefix (k-anonymity)
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await response.text();
    
    // Check if our suffix is in the response
    return text.split('\n').some(line => {
      const [foundSuffix] = line.split(':');
      return foundSuffix === suffix;
    });
  } catch (error) {
    console.error('Error checking password against Pwned Passwords:', error);
    // If the API check fails, we should still allow the password
    return false;
  }
}

