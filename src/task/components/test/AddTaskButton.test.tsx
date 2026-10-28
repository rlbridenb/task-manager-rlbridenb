import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AddTaskButton from '../AddTaskButton'

describe('Add Button Component tests', () => {
  it('should render the button', () => {
    render(<AddTaskButton setOpen={() => {}} />);
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument()
  });

  it('should call setOpen when clicked', async () => {
    const handleClick = vi.fn();
    render(<AddTaskButton setOpen={handleClick} />);
    await userEvent.click(screen.getByTestId('AddIcon'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});