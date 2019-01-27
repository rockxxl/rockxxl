import React from "react";
import { Location } from "@reach/router"; // eslint-disable-line import/no-extraneous-dependencies

export default BaseComponent => props => (
    <Location>
        {({ navigate, location }) => (
            <BaseComponent
                {...props}
                location={location}
                navigate={navigate}
            />
        )}
    </Location>
);
