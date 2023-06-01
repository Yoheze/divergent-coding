import { render, screen } from '@testing-library/react';
import React from 'react'
import App from '../src/App';

describe('Writing some simple testing', () => {
    let app;

    beforeEach(() => {
        app = render(<App/>)
    })

    test('Only one button for new Warehouse', () => {
        const buttons = app.getAllByRole('button')
        expect(buttons.length).toBe(1)
    })

    test('check for label of button', () => {
        const button = screen.getByRole('button')
        expect(button).toHaveTextContent('New Warehouse');
    })

    test('make sure input has placeholder text called name', () => {
        screen.getByPlaceholderText('name')
    })
})

