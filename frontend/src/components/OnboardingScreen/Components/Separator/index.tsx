import style from './styles.module.css';
import {CSSProperties} from "react";

export function Separator( { width = "100%", color = "var( --gray-200, #888 )", height = "1px" } )
{
    const dynamicStyles: CSSProperties & { [ key: `--${ string }` ]: string } =
    {
        "--separator-height": height,
        "--separator-width": width,
        "--separator-color": color,
    };
    
    return(
        <div className={ style.separator } style={ dynamicStyles } >
        </div>
    );
}