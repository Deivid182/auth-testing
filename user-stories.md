# Authorization

### As admin, i want to have full access to the company app modules: employees page and admin page as a way of operate them.

##### Acceptance Criteria:

- The admin must be redirected to the admin page after login.
- The admin username should be displayed on the common navbar.
- The admin must have access to the employees page.
- The admin must have access to delete the employee button.

---

# Authorization

### As an employee, I want to have access to the employees page.

##### Acceptance Criteria:

- The employee must be redirected to the employees page after login.
- The employee username should be displayed on the common navbar.
- The employee must have access to the employees page.
- The employee must not have access to the admin page.
- The forbidden page access must be redirected to the allowed page.
- The employee must not have access to delete the employee button.

---

# Login and Authentication

### As Company App user, i want a login page as a way of have a protected access to the app.

##### Acceptance Criteria (AC):

[x] There must be a login page.
[x] The login page must have a form with the following fields: email, password and
  a submit button.
[x] The email and password inputs are required.
[x] If the user leaves empty fields and clicks the submit button, the login page
  should display required messages as the format: “The [field name] is required”
  aside of the proper field.
[x] The email and password inputs are validated.
[x] The email value should contain the proper email format (the “@”, domain value,
  etc).
[x] The password input should contain at least: 8 characters, one upper case
  letter, one number and one special character.
[x] The form must send the data to a backend endpoint service.
[x] The submit button should be disabbled while the form page is fetching the
  data. After fetching, the submit button does not have to be disabled.
[x] There should be a loading indicator at the top of the form while it is
  fetching.
[x] In a unexpected server error, the form page must display the error message
  “Unexpected error, please try again” from the api.
[x] In the invalid credentials response, the form page must display the error
  message “The email or password are not correct” from the api.
- Not authenticated users must be redirected to the login page on enter to
  private pages (employees and admin pages).

---