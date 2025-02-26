import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInPage from "./SignInPage";
import { MemoryRouter } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../pages/APIs/firebase";

// ✅ Mock Firebase authentication
jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(() => ({
        currentUser: null,
    })),
    signInWithEmailAndPassword: jest.fn(),
}));

describe("SignInPage", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <SignInPage />
            </MemoryRouter>
        );
    });

    it("renders the sign-in page correctly", () => {
        expect(screen.getByRole("heading", { name: /Sign In/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("******")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Sign In/i })).toBeInTheDocument();
    });

    it("allows users to type email and password", () => {
        const emailInput = screen.getByPlaceholderText(/Your Email/i);
        const passwordInput = screen.getByPlaceholderText("******");

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(emailInput.value).toBe("test@example.com");
        expect(passwordInput.value).toBe("password123");
    });

    it("logs in successfully with correct credentials", async () => {
        const emailInput = screen.getByPlaceholderText(/Your Email/i);
        const passwordInput = screen.getByPlaceholderText("******");
        const signInButton = screen.getByRole("button", { name: /Sign In/i });

        fireEvent.change(emailInput, { target: { value: "correctuser@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "correctpassword" } });

        signInWithEmailAndPassword.mockResolvedValueOnce({ user: { email: "correctuser@example.com" } });

        fireEvent.click(signInButton);

        await waitFor(() => expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), "correctuser@example.com", "correctpassword"));
    });

    it("fails to log in with incorrect credentials", async () => {
        const emailInput = screen.getByPlaceholderText(/Your Email/i);
        const passwordInput = screen.getByPlaceholderText("******");
        const signInButton = screen.getByRole("button", { name: /Sign In/i });

        fireEvent.change(emailInput, { target: { value: "wronguser@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

        signInWithEmailAndPassword.mockRejectedValueOnce(new Error("Invalid email or password"));

        fireEvent.click(signInButton);

        await waitFor(() => expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), "wronguser@example.com", "wrongpassword"));

        expect(await screen.findByText(/Invalid email or password/i)).toBeInTheDocument();
    });
});
