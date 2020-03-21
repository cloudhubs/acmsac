import React from "react";
import mermaid from "mermaid";
import {useGlobalState} from '../state';

mermaid.initialize({
    startOnLoad: true
});

type Props = {
    chart: any;
}

class InnerMermaid extends React.Component<Props> {
    componentDidMount() {
        mermaid.contentLoaded();
    }
    render() {
        return <div className="mermaid">{this.props.chart}</div>;
    }
}

const Communication = () => {
    const [value, update] = useGlobalState('communicationGraph');
    return (
        <div>
            Hello from mermaid
            <InnerMermaid
            chart={
                value}
            />
        </div>
    );
}

export default Communication;