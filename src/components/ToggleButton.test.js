import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleButton from './ToggleButton';

test('renders ToggleButton and toggles active state', () => {
  const setDarkModeMock = jest.fn();

  // Test Dark Mode active state
  const { rerender } = render(
    <ToggleButton darkMode={true} setDarkMode={setDarkModeMock} />
  );
  expect(screen.getByText('Dark')).toBeInTheDocument();
  
  // Click button
  fireEvent.click(screen.getByRole('button'));
  expect(setDarkModeMock).toHaveBeenCalledWith(false);

  // Test Light Mode active state
  rerender(
    <ToggleButton darkMode={false} setDarkMode={setDarkModeMock} />
  );
  expect(screen.getByText('Light')).toBeInTheDocument();
});
