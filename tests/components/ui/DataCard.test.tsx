import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataCard from '../../../src/components/ui/DataCard';  // Adjust the import path as needed

// Mock the icons
jest.mock('@/assets/icons/GrowthIcon', () => ({
  IncreaseIcon: () => <div data-testid="increase-icon" />,
  DecreaseIcon: () => <div data-testid="decrease-icon" />,
}));

describe('DataCard', () => {
  it('renders with all props', () => {
    render(
      <DataCard
        className="custom-class"
        label="Revenue"
        amount="$500,000"
        sublabel="vs last month"
        growth="positive"
      />
    );

    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$500,000')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
    expect(screen.getByTestId('increase-icon')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Revenue');
    expect(screen.getByRole('heading', { level: 4 }).parentElement).toHaveClass('custom-class');
  });

  it('renders with negative growth', () => {
    render(
      <DataCard
        label="Expenses"
        amount="$100,000"
        growth="negative"
      />
    );

    expect(screen.getByText('Expenses')).toBeInTheDocument();
    expect(screen.getByText('$100,000')).toBeInTheDocument();
    expect(screen.getByTestId('decrease-icon')).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    render(
      <DataCard
        label="Users"
        growth="positive"
      />
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByTestId('increase-icon')).toBeInTheDocument();
    expect(screen.queryByText('$')).not.toBeInTheDocument();
  });

  it('applies custom class names', () => {
    render(
      <DataCard
        className="bg-blue-500 text-white"
        label="Test"
        growth="positive"
      />
    );

    const cardElement = screen.getByRole('heading', { level: 4 }).parentElement;
    expect(cardElement).toHaveClass('bg-blue-500');
    expect(cardElement).toHaveClass('text-white');
  });
});