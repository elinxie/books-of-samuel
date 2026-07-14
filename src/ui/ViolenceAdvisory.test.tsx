import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ViolenceAdvisory } from './ViolenceAdvisory';
import { SCENES_BY_ID } from '../data/scenes';
import { useAppStore } from '../state/store';

const initial = useAppStore.getState();
const gilboaScene = SCENES_BY_ID.get('gilboa-battle')!;

beforeEach(() => {
  useAppStore.setState(initial, true);
});

afterEach(() => {
  cleanup();
});

describe('ViolenceAdvisory (ADR-009 first-visit advisory)', () => {
  it('renders plain, factual copy and two equally prominent choices', () => {
    render(<ViolenceAdvisory scene={gilboaScene} />);
    expect(screen.getByTestId('violence-advisory')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue in standard mode' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Switch to reduced mode' })).toBeInTheDocument();
  });

  it('choosing standard sets violenceMode and marks the advisory seen', () => {
    render(<ViolenceAdvisory scene={gilboaScene} />);
    fireEvent.click(screen.getByTestId('violence-advisory-standard'));
    expect(useAppStore.getState().violenceMode).toBe('standard');
    expect(useAppStore.getState().violenceAdvisorySeen).toBe(true);
  });

  it('choosing reduced sets violenceMode and marks the advisory seen', () => {
    render(<ViolenceAdvisory scene={gilboaScene} />);
    fireEvent.click(screen.getByTestId('violence-advisory-reduced'));
    expect(useAppStore.getState().violenceMode).toBe('reduced');
    expect(useAppStore.getState().violenceAdvisorySeen).toBe(true);
  });
});
