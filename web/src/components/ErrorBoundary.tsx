import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('LumenPoly render failed', error, info.componentStack);
  }
  render() {
    if (this.state.failed)
      return (
        <main className="error-page">
          <span className="brand-symbol">✳</span>
          <h1>Let’s get you back to the table.</h1>
          <p>
            Something interrupted the page. Your last saved practice move is kept on this device.
          </p>
          <button className="button primary" onClick={() => window.location.reload()}>
            Reload LumenPoly
          </button>
        </main>
      );
    return this.props.children;
  }
}
