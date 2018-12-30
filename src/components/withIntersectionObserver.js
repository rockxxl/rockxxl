import React, { Component } from "react";
import Observer from "@researchgate/react-intersection-observer";
import "intersection-observer";

export default ({ threshold, rootMargin }) => (BaseComponent) => {
    const displayName = BaseComponent.displayName || BaseComponent.name || "Component";

    return class WithIntersectionObserver extends Component {
        static displayName = `withIntersectionObserver(${displayName})`;

        state = {
            isIntersecting: false,
        };

        handleChange = ({ isIntersecting, intersectionRatio }, unobserve) => {
            if (isIntersecting) unobserve();
            this.setState({ isIntersecting: isIntersecting && intersectionRatio >= threshold });
        };

        render() {
            const { isIntersecting } = this.state;
            return (
                <Observer
                    onChange={this.handleChange}
                    threshold={threshold}
                    rootMargin={rootMargin}
                >
                    <BaseComponent {...this.props} isVisible={isIntersecting} />
                </Observer>
            );
        }
    };
};
