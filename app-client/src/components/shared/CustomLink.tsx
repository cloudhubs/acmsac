import * as React from 'react';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

type CustomLinkProps = {
    text: string,
    linkTo: string
}

export const CustomLink = ({text, linkTo}: CustomLinkProps) => {
    let history = useHistory();
    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        history.push(linkTo)
    }
    return (
        <Link href="#" variant="body2" onClick={onClick}>
                {text}
        </Link>
    )
}