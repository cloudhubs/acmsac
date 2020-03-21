import React from "react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: true
});

type Props = {
    chart: any;
}
export class Mermaid extends React.Component<Props> {
    componentDidMount() {
        mermaid.contentLoaded();
        this.forceUpdate()
    }
    render() {
        return <div className="mermaid">{this.props.chart}</div>;
    }
}
