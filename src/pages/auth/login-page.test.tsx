import { screen, render, cleanup } from '@testing-library/react'
import user from "@testing-library/user-event"
import LoginPage from './login-page'

beforeEach(() => {
  render(<LoginPage />)
})

describe("Login Page", () => {
  afterEach(() => {
    cleanup()
  })
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
  afterEach(() => {
    cleanup()
  })
  it("should display required messages as the next format: The [field name] field is required", async () => {
    await user.click(screen.getByRole("button", { name: /login/i }))
    const emailAlert = await screen.findByText(/The email field is required/i)
    const passwordAlert = await screen.findByText(/The password field is required/i)

    expect(emailAlert).toBeInTheDocument()
    expect(passwordAlert).toBeInTheDocument()
  })

  it("should not display any alert if the email and password are valid", async () => {
    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole("button", { name: /login/i })

    await user.type(emailInput, "dave@gmail.com")
    await user.type(passwordInput, "123456")
    await user.click(loginButton)

    const emailAlert = screen.queryByText(/The email field is required/i)
    const passwordAlert = screen.queryByText(/The password field is required/i)

    expect(emailAlert).not.toBeInTheDocument()
    expect(passwordAlert).not.toBeInTheDocument()
  })

  
  it("should display an alert if the email and password are invalid", async () => {

    expect(screen.queryByText(/The email format is not valid/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/The password must be at least 6 characters/i)).not.toBeInTheDocument()

    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole("button", { name: /login/i })

    await user.type(emailInput, "dave@gmail")
    await user.type(passwordInput, "12345")
    await user.click(loginButton)

    const emailAlert = await screen.findByText(/The email format is not valid/i)
    const passwordAlert = await screen.findByText(/The password must contain at least 8 characters, one upper case letter, one number and one special character/i)

    expect(emailAlert).toBeInTheDocument()
    expect(passwordAlert).toBeInTheDocument()
  })

  it("should not display any alert if the email and password are valid", async () => {
    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole("button", { name: /login/i })

    await user.type(emailInput, "dave@gmail.com")
    await user.type(passwordInput, "Davejs$21")
    await user.click(loginButton)

    const emailAlert = screen.queryByText(/The email format is not valid/i)
    const passwordAlert = screen.queryByText(/The password must contain at least 8 characters, one upper case letter, one number and one special character/i)

    expect(emailAlert).not.toBeInTheDocument()
    expect(passwordAlert).not.toBeInTheDocument()
  })
})