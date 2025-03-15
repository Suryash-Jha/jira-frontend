import SecureLS from "secure-ls";

let ls: SecureLS | null = null;

// Ensure SecureLS only runs on the client
if (typeof window !== "undefined") {
  ls = new SecureLS();
}

/**
 * Set an item securely in storage.
 */
function setItem(name: string, value: any): void {
  try {
    if (!ls) return; // Prevent SSR access errors
    ls.set(name, value);
  } catch (error) {
    console.error(`Error setting item '${name}' in secure storage:`, error);
  }
}

/**
 * Get an item securely from storage.
 */
function getItem<T>(name: string): T | null {
  try {
    if (!ls) return null; // Prevent SSR access errors
    return ls.get(name) as T;
  } catch (error) {
    console.error(`Error getting item '${name}' from secure storage:`, error);
    return null;
  }
}

/**
 * Remove an item securely from storage.
 */
function removeItem(name: string): void {
  try {
    if (!ls) return; // Prevent SSR access errors
    ls.remove(name);
  } catch (error) {
    console.error(`Error removing item '${name}' from secure storage:`, error);
  }
}

const SecureStorage = {
  setItem,
  getItem,
  removeItem,
};

export default SecureStorage;
