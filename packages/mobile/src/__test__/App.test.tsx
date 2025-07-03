import React from 'react'
import { render, screen } from '@testing-library/react-native'
import App from '../App.tsx'

describe('App', () => {
  it('renders welcome text', () => {
    render(<App />)
    expect(screen.getByText(/Welcome to WhoDoggy\?/i)).toBeTruthy()
  })
})
