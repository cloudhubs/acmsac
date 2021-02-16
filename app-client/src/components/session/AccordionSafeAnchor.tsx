import React, { Component } from "react";

type AccordionSafeAnchorProps = {
    href: string,
    children?: React.ReactNode
}

export const stopEvent = (event) => event.stopPropagation();

function AccordionSafeAnchor(props: AccordionSafeAnchorProps) {
    return <a href={props.href} onClick={stopEvent} onFocus={stopEvent}>
        {props.children}
    </a>;
}

export default AccordionSafeAnchor;