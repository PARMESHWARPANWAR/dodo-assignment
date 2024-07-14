import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentTransaction from '../../src/app/(main)/transaction/overview/page';

// Mock the @remixicon/react icons
jest.mock('@remixicon/react', () => ({
  RiArrowDownSLine: () => <div data-testid="arrow-down" />,
  RiArrowUpSLine: () => <div data-testid="arrow-up" />,
}));

describe('RecentTransaction Table Component', () => {
  it('renders the table with correct headers', () => {
    render(<RecentTransaction />);
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
  });

  it('renders the correct number of rows', () => {
    render(<RecentTransaction />);
    const rows = screen.getAllByRole('row');
    // 10 data rows + 1 header row
    expect(rows).toHaveLength(11);
  });

  it('displays correct data in cells', () => {
    render(<RecentTransaction />);
    expect(screen.getByText('Emma Johnson')).toBeInTheDocument();
    expect(screen.getByText('North America')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('250.75')).toBeInTheDocument();
    expect(screen.getByText('2024-07-14 09:30:15')).toBeInTheDocument();
  });

  it('allows sorting on sortable columns', () => {
    render(<RecentTransaction />);
    const userHeader = screen.getByText('User');
    
    fireEvent.click(userHeader);
    
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Ava Patel');
    
    fireEvent.click(userHeader);
    
    expect(rows[1]).toHaveTextContent('Sophia Rodriguez');
  });

  it('does not allow sorting on non-sortable columns', () => {
    render(<RecentTransaction />);
    const statusHeader = screen.getByText('Status');
    
    fireEvent.click(statusHeader);
    
    // Check that the order hasn't changed
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Emma Johnson');
  });

  it('renders sort icons for sortable columns', () => {
    render(<RecentTransaction />);
    const userHeader = screen.getByText('User').closest('th');
    
    expect(userHeader).toContainElement(screen.getByTestId('arrow-up'));
    expect(userHeader).toContainElement(screen.getByTestId('arrow-down'));
  });

  it('does not render sort icons for non-sortable columns', () => {
    render(<RecentTransaction />);
    const statusHeader = screen.getByText('Status').closest('th');
    
    expect(statusHeader).not.toContainElement(screen.queryByTestId('arrow-up'));
    expect(statusHeader).not.toContainElement(screen.queryByTestId('arrow-down'));
  });
});