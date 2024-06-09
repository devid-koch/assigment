import { render } from '@testing-library/react';
import Home from './home';


describe('Home component', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });

});
