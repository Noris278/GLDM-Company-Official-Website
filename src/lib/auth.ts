const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme"
const ADMIN_TOKEN_SECRET = process.env.ADMIN_TOKEN_SECRET ?? "local-secret"

const TOKEN_DELIMITER = "::"

export function isPasswordValid(password: string) {
  return password === ADMIN_PASSWORD
}

async function hashText(value: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(value)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

export async function createAuthToken(password: string) {
  const seed = `${password}${TOKEN_DELIMITER}${ADMIN_TOKEN_SECRET}`
  return hashText(seed)
}

export async function verifyAuthToken(token?: string) {
  if (!token) return false
  const expected = await createAuthToken(ADMIN_PASSWORD)
  return token === expected
}
