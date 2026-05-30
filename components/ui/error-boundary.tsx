"use client";

import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Receives a `reset` callback to clear the error and re-render children. */
  fallback: (reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Scopes a render error to a section of the page (rather than the whole route),
 * so a failed course fetch doesn't take down the rest of the dashboard.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  private reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) return this.props.fallback(this.reset);
    return this.props.children;
  }
}
