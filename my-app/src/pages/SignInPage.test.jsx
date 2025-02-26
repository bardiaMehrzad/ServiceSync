import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SignInPage from "./SignInPage";
import { MemoryRouter } from "react-router-dom";

describe("SignInPage", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <SignInPage />
            </MemoryRouter>
        );
    });

    it("renders the sign-in page correctly", () => {
        // Check for header and informational text.
        expect(screen.getByRole("heading", { name: /Sign In/i })).toBeInTheDocument();

        expect(
            screen.getByText(/Don't have an account\?/i)
        ).toBeInTheDocument();

        expect(screen.getByRole("link", { name: /Sign Up/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Forgot Password\?/i })).toBeInTheDocument();

        // Check for input fields.
        expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("******")).toBeInTheDocument(); // Password field

        // Check for the Sign-In button.
        expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
    });

    it("updates form fields when typing", () => {
        const emailInput = screen.getByPlaceholderText(/Your Email/i);
        const passwordInput = screen.getByPlaceholderText("******");

        // Simulate user input.
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        // Check if input values updated.
        expect(emailInput.value).toBe("test@example.com");
        expect(passwordInput.value).toBe("password123");
    });

    it("allows navigation to the Sign Up and Forgot Password pages", () => {
        expect(screen.getByRole("link", { name: /Sign Up/i })).toHaveAttribute("href", "/SignUp");
        expect(screen.getByRole("link", { name: /Forgot Password\?/i })).toHaveAttribute("href", "/ForgotPassword");
    });
});
