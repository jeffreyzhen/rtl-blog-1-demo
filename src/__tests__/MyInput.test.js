import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import MyInput from '../MyInput';

test('renders with default props', () => {
  const { getByLabelText } = render(<MyInput />);
  const input = getByLabelText('Number:');

  expect(input).toHaveAttribute('type', 'number');
});

describe('shows happy ui when input is valid', () => {
  test('does not render error message', () => {
    const { getByLabelText, queryByTestId } = render(<MyInput />);
    const input = getByLabelText('Number:');

    fireEvent.change(input, { target: { value: 5 } });
    expect(queryByTestId('error-msg')).toBeNull();
  });

  test('enables submit button', () => {
    const { getByLabelText, getByText } = render(<MyInput />);
    const input = getByLabelText('Number:');
    const button = getByText('Submit!');

    fireEvent.change(input, { target: { value: 5 } });
    expect(button).toBeEnabled();
  });
});

describe('show error ui when input is invalid', () => {
  test('renders error message', () => {
    const { getByLabelText, getByTestId } = render(<MyInput />);
    const input = getByLabelText('Number:');

    fireEvent.change(input, { target: { value: -5 } });
    expect(getByTestId('error-msg')).toHaveTextContent(
      'The number you entered is invalid'
    );
  });

  test('disables submit button', () => {
    const { getByLabelText, getByTestId } = render(<MyInput />);
    const input = getByLabelText('Number:');

    fireEvent.change(input, { target: { value: -5 } });
    expect(getByTestId('submit-btn')).toBeDisabled();
  });
});

test('renders valid when props update', () => {
  const { getByLabelText, getByTestId, queryByTestId, rerender } = render(
    <MyInput />
  );
  const input = getByLabelText('Number:');

  fireEvent.change(input, { target: { value: -5 } });
  expect(getByTestId('error-msg')).toHaveTextContent(
    'The number you entered is invalid'
  );

  rerender(<MyInput min={-10} />);
  expect(queryByTestId('error-msg')).toBeNull();
});
