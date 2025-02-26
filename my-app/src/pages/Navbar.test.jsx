import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
    });

    it("renders the navbar correctly", () => {
        // Check for main navbar text and buttons
        expect(screen.getByText(/ServiceSync/i)).toBeInTheDocument();
        expect(screen.getByText(/Company Logo Here/i)).toBeInTheDocument();
    });

    it("renders all navigation buttons", () => {
        expect(screen.getByRole("button", { name: /Home/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Calendar/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Jobs/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Payroll/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Log Out/i })).toBeInTheDocument();
    });

    it("contains links to the correct routes", () => {
        expect(screen.getByRole("link", { name: /Home/i })).toHaveAttribute("href", "/AdminHome");
        expect(screen.getByRole("link", { name: /Calendar/i })).toHaveAttribute("href", "/AdminCalendar");
        expect(screen.getByRole("link", { name: /Jobs/i })).toHaveAttribute("href", "/AdminJobPage");
        expect(screen.getByRole("link", { name: /Payroll/i })).toHaveAttribute("href", "/AdminPayroll");
        expect(screen.getByRole("link", { name: /Log Out/i })).toHaveAttribute("href", "/SignIn");
    });
});
