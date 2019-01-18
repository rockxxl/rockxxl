import React from "react";
import ErrorPage from "./Page";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error });
        if (window.Sentry) {
            window.Sentry.configureScope((scope) => {
                Object.keys(errorInfo).forEach((key) => {
                    scope.setExtra(key, errorInfo[key]);
                });
            });
            window.Sentry.captureException(error);
        }
    }

    render() {
        const { state, props } = this;
        if (state.error && process.env.NODE_ENV === "production") {
            return (
                <ErrorPage />
            );
        }

        return props.children;
    }
}
