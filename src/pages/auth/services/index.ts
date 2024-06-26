import { FetchError } from "../../../utils"
type Credentials = {
  email: string
  password: string
}

export const login = async (credentials: Credentials) => {
  return await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new FetchError(res)
      }
      return await res.json()
    })
}