import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from './Login';

describe('Test the login component', () => {
	let labelEmail, labelPassword, button;

	beforeEach(() => {
		const { getByLabelText, getByRole } = render(<Login />);

		labelEmail = getByLabelText('Email');
		labelPassword = getByLabelText('Password');
		button = getByRole('button');
	});

	test('Render the Login', () => {
		expect(labelEmail).toBeInTheDocument();
		expect(labelPassword).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test('The input of the email works correctly', () => {
		fireEvent.change(labelEmail, {
			target: {
				name: 'email',
				value: 'dennis@dennis.de'
			}
		});
		expect(labelEmail.name).toBe('email');
		expect(labelEmail.value).toBe('dennis@dennis.de');
	});

	test('The input of the password works correctly', () => {
		fireEvent.change(labelEmail, {
			target: {
				name: 'password',
				value: '1234'
			}
		});
		expect(labelEmail.name).toBe('password');
		expect(labelEmail.value).toBe('1234');
	});
});
