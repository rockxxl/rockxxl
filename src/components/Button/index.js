import PropTypes from "prop-types";
import styled from "styled-components";
import { px, py } from "styled-components-spacing";
import globalTheme from "../../theme";

const getVariant = ({ theme, variant, reset }) => {
    if (theme.button.variant[variant]) {
        return reset && theme.button.variant[variant].reset
            ? theme.button.variant[variant].reset
            : theme.button.variant[variant];
    }
    return theme.button.variant.default;
};

const Button = styled.button`
    display: inline-block;
    font-weight: ${({ theme }) => theme.button.weight};
    text-align: center;
    vertical-align: middle;
    user-select: none;
    border: ${({ theme }) => theme.button.border};
    cursor: pointer;
    color: ${props => getVariant(props).color};
    background-color: ${props => getVariant(props).background};
    ${px(4)}
    ${py(2)}

    /* Remove spacing if reset */
    ${({ reset }) => reset && "padding: 0;"};

    &:hover {
        color: ${props => getVariant(props).hover.color};
        background-color: ${props => getVariant(props).hover.background};
        text-decoration: none;
    }

    &:focus {
        outline: 0;
    }

    &:disabled {
        opacity: ${({ theme }) => theme.button.disabled.opacity};
    }
`;

Button.defaultProps = {
    reset: false,
    variant: "default",
};

Button.propTypes = {
    variant: PropTypes.oneOf(Object.keys(globalTheme.button.variant)),
};

export default Button;
