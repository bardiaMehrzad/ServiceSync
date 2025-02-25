import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignUpPage from "./SignUpPage"; 
import { MemoryRouter } from "react-router-dom";

describe("SignUpPage", () => {
  // Render the component wrapped in a MemoryRouter to support Link navigation.
  beforeEach(() => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
  });

  it("renders the sign up page correctly", () => {
    // Check for header and informational text.
    expect(screen.getByText(/Sign Up\!/i)).toBeInTheDocument();
    
    expect(
      screen.getByText(/Please enter your details to create an account/i)
    ).toBeInTheDocument();
    
    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sign In/i })).toBeInTheDocument();

    // Check that the email input, password input, and company code input are rendered with placeholders.
    expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();

    // Password and Company code share similar placeholders, get as array.
    const inputs = screen.getAllByPlaceholderText("******");
    expect(inputs.length).toBe(2);

    // Check that the sign-up button exists.
    expect(screen.getByRole("button", { name: /Sign Up/i })).toBeInTheDocument();
  });

  it("updates form fields and submits the form", () => {
    const emailInput = screen.getByPlaceholderText(/Your Email/i);
    const [passwordInput, companyCodeInput] = screen.getAllByPlaceholderText("******");
    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });

    // Simulate user input on all form fields.
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(companyCodeInput, { target: { value: "COMPANY123" } });

    // Verify that the values have been updated.
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
    expect(companyCodeInput.value).toBe("COMPANY123");

   
    fireEvent.click(signUpButton);

   
  });
});
