


import * as React from 'react';

type DetailRowProps = {
    key: string,
    value: string
}

export const DetailRow = ({key, value}: DetailRowProps) => {
    return (
        <p>{key} : {value} </p> 
    )
}