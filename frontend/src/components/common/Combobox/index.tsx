import styles from './styles.module.css';
import {FiChevronDown} from "react-icons/fi";
import {useState} from "react";
import {autoUpdate, flip, shift, size, useFloating} from "@floating-ui/react";

interface ComboboxProps
{
    label: string;
    comboboxOptions: string[];
}

export function Combobox( { label, comboboxOptions }: ComboboxProps )
{
    const [ isOpen, setIsOpen ] = useState( false );
    
    const { refs, floatingStyles } = useFloating( 
    {
        open: isOpen,
        middleware: 
        [ 
            flip(), 
            shift(),
            size
            (
                {
                    apply( { rects, elements } )
                    {
                        Object.assign( elements.floating.style,
                        {
                          width: `${ rects.reference.width }px`  
                        } );
                    }
                }
            )  
        ],
        whileElementsMounted: autoUpdate,
    } );
    
    return(
        <div>
            <div ref={ refs.setReference } className={ styles.field_container }>
                <button onClick={ () => setIsOpen( open => !open ) } className={ styles.button }>Item selecionado</button>
                <FiChevronDown className={ styles.icon_down }/>
                <label className={ styles.floating_label }>{ label }</label>
            </div>
            
            { isOpen && comboboxOptions.length > 0 &&
                ( 
                    <ul ref={ refs.setFloating } style={ floatingStyles } className={ styles.options_container }>
                        { comboboxOptions.map( option => ( <li key={ option } className={ styles.option }>{ option }</li> ) ) } 
                    </ul>
                )
            }
        </div>
    );
}