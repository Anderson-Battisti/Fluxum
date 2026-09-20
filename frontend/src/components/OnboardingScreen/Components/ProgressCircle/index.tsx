import style from './styles.module.css';
import React from 'react'

interface ProgressCircleProps
{
    icon: React.ReactNode,
    backgroundColor: string;
}

export function ProgressCircle( { icon, backgroundColor }: ProgressCircleProps )
{
    return(
        <div className={ style.circle_container } style={ { "--circle-background-color": backgroundColor } as React.CSSProperties } >
            { icon }
        </div>
    );
}