import { BsXLg } from "react-icons/bs";

function Popup( props ) {
    return (
        <div className={ "popup-box " + (props.hidden ? 'popup-box--hidden' : '') }>
            <div className="box">
                <BsXLg className={'close-icon'} onClick={ props.handleClose }/>
                { props.children }
            </div>
        </div>
    );
}

export default Popup;