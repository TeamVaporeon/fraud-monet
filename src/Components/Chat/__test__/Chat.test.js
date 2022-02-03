import { render, screen } from '@testing-library/react';
import Chat from '../Chat.jsx';

it('should render info passed into socket prop', () => {
  render(<Chat socket="some value"/>);
  const headerDivElement = screen.getByText(/some value/i);
  expect(headerDivElement).toBeInTheDocument();
});

it('should recognize', () => {
  render(<Chat socket="some value"/>);
  const headerDivElement = screen.getByText(/some value/i);
  expect(headerDivElement).toBeInTheDocument();
});