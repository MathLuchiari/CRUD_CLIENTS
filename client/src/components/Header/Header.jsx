import { BsFillPersonPlusFill } from "react-icons/bs";

export default function Header( {title, handlerOpenPopup} ) {
    return (
        <nav className={"navbar bg-dark"} data-bs-theme="dark">
            <div className={"container-fluid"}>
                <h1 className={"mb-0"}> { title } </h1>

                <button 
                    type="button" 
                    className={"btn btn-light d-flex align-items-center justify-content-between"}
                    style={{ gap: ".5rem" }}
                    onClick={ handlerOpenPopup }
                    > 
                    <BsFillPersonPlusFill/>Adicionar Cliente
                </button>
            </div>
        </nav>
    )
}