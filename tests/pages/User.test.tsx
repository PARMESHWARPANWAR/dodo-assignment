import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import User from '../../src/app/(main)/settings/user/page'; // Adjust the import path as needed

// Mock the Tremor components
jest.mock('@tremor/react', () => ({
  Divider: () => <hr data-testid="divider" />,
  TextInput: ({ id, name, placeholder, ...props }) => (
    <input data-testid={id} name={name} placeholder={placeholder} {...props} />
  ),
}));

describe('User Component', () => {
  it('renders the form with all required fields', () => {
    render(<User />);
    
    expect(screen.getByText('Update user data form')).toBeInTheDocument();
    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal code/i)).toBeInTheDocument();
  });

  it('marks required fields with an asterisk', () => {
    render(<User />);
    
    expect(screen.getByText('First name')).toContainElement(screen.getAllByText('*')[0]);
    expect(screen.getByText('Last name')).toContainElement(screen.getAllByText('*')[1]);
    expect(screen.getByText('Email')).toContainElement(screen.getAllByText('*')[2]);
  });

  it('renders submit and cancel buttons', () => {
    render(<User />);
    
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
  });

  it('allows input in form fields', () => {
    render(<User />);
    
    const firstNameInput = screen.getByLabelText(/First name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput).toHaveValue('John');

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('submits the form with user data', () => {
    const mockSubmit = jest.fn();
    render(<User />);
    
    const form = screen.getByRole('form');
    form.onsubmit = mockSubmit;

    fireEvent.change(screen.getByLabelText(/First name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(mockSubmit).toHaveBeenCalled();
  });
});