import { Component, ErrorInfo, ReactNode } from 'react';
export class ErrorComponent extends Component {
  render() {
    return (
      <section className="survival blood">
        <h1>Something went wrong</h1>
        <h1>Happy Halloween!</h1>
      </section>
    );
  }
}

interface IErrorBoundaryProps {
  children?: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}
export class ErrorBoundaryComponent extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorComponent />;
    }
    return this.props.children;
  }
}
