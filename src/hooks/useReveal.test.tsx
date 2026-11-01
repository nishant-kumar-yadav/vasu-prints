import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useReveal } from './useReveal';

function TestComponent({ disabled = false }: { disabled?: boolean }) {
  const { ref, isRevealed } = useReveal({ disabled });
  return (
    <div ref={ref} data-testid="target">
      {isRevealed ? 'revealed' : 'hidden'}
    </div>
  );
}

describe('useReveal hook', () => {
  let mockObserve: ReturnType<typeof vi.fn<(target: Element) => void>>;
  let mockUnobserve: ReturnType<typeof vi.fn<(target: Element) => void>>;
  let mockDisconnect: ReturnType<typeof vi.fn<() => void>>;
  let observerCallback: IntersectionObserverCallback;

  beforeEach(() => {
    mockObserve = vi.fn<(target: Element) => void>();
    mockUnobserve = vi.fn<(target: Element) => void>();
    mockDisconnect = vi.fn<() => void>();

    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];

      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }

      observe(target: Element): void {
        mockObserve(target);
      }

      unobserve(target: Element): void {
        mockUnobserve(target);
      }

      disconnect(): void {
        mockDisconnect();
      }

      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }

    global.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('immediately reveals if prefers-reduced-motion is active', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<TestComponent />);
    expect(screen.getByTestId('target')).toHaveTextContent('revealed');
    expect(mockObserve).not.toHaveBeenCalled();
  });

  it('observes element and reveals upon intersection', () => {
    render(<TestComponent />);
    const target = screen.getByTestId('target');
    expect(target).toHaveTextContent('hidden');
    expect(mockObserve).toHaveBeenCalledWith(target);

    act(() => {
      observerCallback(
        [
          {
            isIntersecting: true,
            target,
            intersectionRatio: 1,
            time: 0,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
          },
        ],
        {} as IntersectionObserver,
      );
    });

    expect(target).toHaveTextContent('revealed');
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
