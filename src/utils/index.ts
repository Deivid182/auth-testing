interface HttpErrorStatus {
  [statusCode: number]: string;
}

export const httpErrorStatus: HttpErrorStatus = {
  500: "Unexpected error, please try again",
  401: "Invalid credentials"
}

export class FetchError extends Error {
  constructor(public res: Response, message?: string) {
    super(message)
  }
}