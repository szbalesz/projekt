// Register.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../components/ui/toaster', () => ({
  toaster: {
    create: jest.fn(),
  },
}));

describe('Regisztrációs űrlap', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  test('Hiba, ha mezők üresek', () => {
    fireEvent.click(screen.getByText(/Regisztráció/i));

    expect(require('../components/ui/toaster').toaster.create).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Felhasználónév minimum 4 karakter.' })
    );
  });

  test('Hiba, ha email formátum rossz', () => {
    fireEvent.change(screen.getByPlaceholderText(/felhasználóneved/i), {
      target: { value: 'teszt' },
    });
    fireEvent.change(screen.getByPlaceholderText(/emailedet/i), {
      target: { value: 'rosszemailformátum' },
    });
    fireEvent.change(screen.getByPlaceholderText(/jelszavad$/i), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByPlaceholderText(/jelszavad újra/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText(/Regisztráció/i));
    expect(require('../components/ui/toaster').toaster.create).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Adjon meg egy valós email címet.' })
    );
  });

  test('Hiba, ha a két jelszó nem egyezik', () => {
    fireEvent.change(screen.getByPlaceholderText(/felhasználóneved/i), {
      target: { value: 'tesztuser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/emailedet/i), {
      target: { value: 'teszt@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/jelszavad$/i), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByPlaceholderText(/jelszavad újra/i), {
      target: { value: '654321' },
    });

    fireEvent.click(screen.getByText(/Regisztráció/i));

    expect(require('../components/ui/toaster').toaster.create).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'A két jelszó nem egyezik.' })
    );
  });
});
