import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tools from '../components/Tools';
import { Tool } from '../types';

describe('Tools', () => {
  it('renders all tools to the panel', () => {
    render(<Tools />);

    Object.values(Tool).forEach((tool) => {
      const toolElement = screen.getByAltText(tool);
      expect(toolElement).toBeInTheDocument();
    });
  });
});
