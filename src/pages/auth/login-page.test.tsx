import { screen, waitFor } from '@testing-library/react'
import user from "@testing-library/user-event"
import LoginPage from './login-page'
import { customRender } from '../../mocks/custom-render'
import { server } from '../../mocks/node'
import { HttpResponse, http } from 'msw'

beforeEach(() => {
  customRender(<LoginPage />)
})

const mockServerError = async (message: string, status: number) => {
  server.use(
    http.post("/login", () => {
      return HttpResponse.json({
        message,
      }, { status })
    })
  )
}

const fillFieldsAndSubmit = async (email: string, password: string) => {
  const emailInput = screen.getByPlaceholderText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const loginButton = screen.getByRole("button", { name: /login/i })

  await user.type(emailInput, email)
  await user.type(passwordInput, password)
  await user.click(loginButton)
}

const getSubmitButton = () => screen.getByRole("button", { name: /login/i })

describe("Login Page", () => {
  
  it("should display a title on the login page", () => {
    const title = screen.getByText(/Login Page/i)
    expect(title).toBeInTheDocument()
  })

  it("should display a form with the next elements: email, password, login button", () => {
    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole("button", { name: /login/i })
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })
})

describe("Login form validations", () => {
  
  it("should display required messages as the next format: The [field name] field is required", async () => {
    await user.click(screen.getByRole("button", { name: /login/i }))
    const emailAlert = await screen.findByText(/The email field is required/i)
    const passwordAlert = await screen.findByText(/The password field is required/i)

    expect(emailAlert).toBeInTheDocument()
    expect(passwordAlert).toBeInTheDocument()
  })
  
  it("should display an alert if the email and password are invalid", async () => {

    expect(screen.queryByText(/The email format is not valid/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/The password must be at least 6 characters/i)).not.toBeInTheDocument()

    await fillFieldsAndSubmit("dave", "123456")

    const emailAlert = await screen.findByText(/The email format is not valid/i)
    const passwordAlert = await screen.findByText(/The password must contain at least 8 characters, one upper case letter, one number and one special character/i)

    expect(emailAlert).toBeInTheDocument()
    expect(passwordAlert).toBeInTheDocument()
  })

  it("should not display any alert if the email and password are valid", async () => {

    await fillFieldsAndSubmit("dave@gmail.com", "Davejs$21")

    const emailAlert = screen.queryByText(/The email format is not valid/i)
    const passwordAlert = screen.queryByText(/The password must contain at least 8 characters, one upper case letter, one number and one special character/i)

    expect(emailAlert).not.toBeInTheDocument()
    expect(passwordAlert).not.toBeInTheDocument()
  })
})

describe("Login form submit", () => {

  it("should keep the submit button disabled while the fetching is in progress", async() => {
    
    await fillFieldsAndSubmit("dave@gmail.com", "Davejs$21")

    await waitFor(() => expect(getSubmitButton()).toBeDisabled())

    await waitFor(() => expect(getSubmitButton()).not.toBeDisabled(), { timeout: 2000 })
  })

  it("should display a toast when the form is submitted", async () => {

    await fillFieldsAndSubmit("dave@gmail.com", "Davejs$21")
    const toast = await screen.findByText(/Login successful/i)

    expect(toast).toBeInTheDocument()
  })

  it("should display a loader when the form is submitted", async () => {

    await fillFieldsAndSubmit("dave@gmail.com", "Davejs$21")
    const loader = await screen.findByRole("status")

    expect(loader).toBeInTheDocument()
  })
})

describe("when the user submits the form data and the server throws an unexpected error" ,() => {
  it("should display the error message: Unexpected error, please try again", async () => {
    await mockServerError("Unexpected error, please try again", 500)

    await fillFieldsAndSubmit("dave@gmail.com", "Davejs$21")
    
    await waitFor(() => expect(screen.getByText(/Unexpected error, please try again/i)).toBeVisible(), { timeout: 1100 })
  })
})

describe("when the user submits the form data and the server returns an invalid credentials error" ,() => {
  it("should display the error message: The email or password are not correct", async () => {

    await mockServerError("Invalid credentials", 401)

    await fillFieldsAndSubmit("dave@gmail.com", "Davejs$21")
    
    await waitFor(() => expect(screen.getByText(/Invalid credentials/i)).toBeVisible(), { timeout: 1100 })
  })
})

