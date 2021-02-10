import ReactGA from 'react-ga';

const GATracker = ({location}) => {
    console.log('tracking', location.pathname)
    const trackingId: string = "UA-162125692-1"
    ReactGA.initialize(trackingId);
    ReactGA.set({page: location.pathname})
    ReactGA.pageview(location.pathname)
    return null
}

export default GATracker;