import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { ProductContext } from '../context/productContext';

const { product } = useContext(ProductContext)

// Mock the useContext hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

// Mock the context value
const mockedContextValue = {
  products: [
    { id: 1, title: 'Product 1' },
    { id: 2, title: 'Product 2' },
    { id: 3, title: 'Product 3' },
  ],
};

describe('product', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    jest.clearAllMocks();
  });

  it('renders a list of products', () => {
    React.useContext.mockReturnValueOnce(mockedContextValue);

    const { getByText } = render(<ProductList />);

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Product 2')).toBeInTheDocument();
    expect(getByText('Product 3')).toBeInTheDocument();
  });
});
