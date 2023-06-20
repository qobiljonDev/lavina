import React from 'react';
import cx from "classnames";

import "./style.scss"

type TPosition = "center" | "start" | "end" | "full" | "absolute"

interface ISpinner {
    className: string
    position: TPosition,
    md: boolean
}

const Index = ({className = "", position = "center", md = false}: Partial<ISpinner>) => {

    const classNames = cx(
        "spinner-wrap",
        md ? "md" : "",
        position,
        className
    );

    return (
        <div className={classNames}>
            <div className="spinner"/>
        </div>
    );
};

export default Index;