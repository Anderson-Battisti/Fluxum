import style from './styles.module.css';

interface ProgressCircleProps
{
    icon: React.ReactNode;
}

export function ProgressCircle( { icon }: ProgressCircleProps )
{
    return(
        <div className={ style.circle_container }>
            { icon }
        </div>
    );
}