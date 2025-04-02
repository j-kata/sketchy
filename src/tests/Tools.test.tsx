import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import Tools from '../components/tools/ToolPanel';
import { Tool } from '../types/Tool';
import { ToolsProvider } from '../contexts/ToolsContext';

describe('Tools', () => {
  const isolatedTools = (
    <ToolsProvider>
      <Tools />
    </ToolsProvider>
  );

  it('renders all tools to the panel', () => {
    render(isolatedTools);

    Object.values(Tool).forEach((tool) => {
      const toolElement = screen.getByAltText(tool);
      expect(toolElement).toBeInTheDocument();
    });
  });

  it('switches selected class from default tool on click', () => {
    render(isolatedTools);

    const activeClass = 'bg-lime-600/20';

    const selectElement = screen.getByTestId('button-tool-select');
    const squareElement = screen.getByTestId('button-tool-square');

    expect(selectElement).toHaveClass(activeClass);
    expect(squareElement).not.toHaveClass(activeClass);

    fireEvent.click(squareElement);

    expect(squareElement).toHaveClass(activeClass);
    expect(selectElement).not.toHaveClass(activeClass);
  });
});
