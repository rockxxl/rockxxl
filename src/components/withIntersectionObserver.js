import React, { Component } from "react";
import Observer from "@researchgate/react-intersection-observer";

import("intersection-observer");

export default ({ threshold, rootMargin }) => (BaseComponent) => {
    const displayName = BaseComponent.displayName || BaseComponent.name || "Component";

    return class WithIntersectionObserver extends Component {
        static displayName = `withIntersectionObserver(${displayName})`;

        state = {
            isIntersecting: false,
        };

        componentWillUnmount = () => {
            this.clearTimer();
        };

        setTimer = ({ timeout, isIntersecting, intersectionRatio }) => {
            if (this.timerHandle) return;
            this.timerHandle = setTimeout((self) => {
                self.setState({ isIntersecting: isIntersecting && intersectionRatio >= threshold });
                this.timerHandle = 0;
            }, timeout, this);
        };

        clearTimer = () => {
            if (this.timerHandle) {
                clearTimeout(this.timerHandle);
                this.timerHandle = 0;
            }
        };

        handleChange = ({ isIntersecting, intersectionRatio }, unobserve, timeout) => {
            if (isIntersecting) unobserve();
            this.setTimer({ timeout, isIntersecting, intersectionRatio });
        };

        render() {
            const { isIntersecting } = this.state;
            const { timeout = 0 } = this.props;
            return (
                <Observer
                    onChange={(entry, unobserve) => this.handleChange(entry, unobserve, timeout)}
                    threshold={threshold}
                    rootMargin={rootMargin}
                >
                    <BaseComponent {...this.props} isVisible={isIntersecting} />
                </Observer>
            );
        }
    };
};
