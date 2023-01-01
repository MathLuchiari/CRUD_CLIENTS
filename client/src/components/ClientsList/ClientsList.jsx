import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

function Client( {key, name, email, phone}, handlerOpenPopup, deleteClient ) {
    return (
        <tr key={ key }>
            <th scope="row"> { key } </th>
            <td> { name } </td>
            <td> { email } </td>
            <td> { phone } </td>
            <td> <button type="button" className="btn btn-outline-primary" clientcod={ key } onClick={ handlerOpenPopup }> <BsFillPencilFill/> Alterar </button> </td>
            <td> <button type="button" className="btn btn-outline-danger" clientcod={ key } onClick={ deleteClient }> <BsFillTrashFill/> Excluir </button> </td>
        </tr>
    )
}

function ClientsList( { clientsList, handlerOpenPopup, deleteClient } ) {
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefone</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    { clientsList.map( client => Client( client, handlerOpenPopup, deleteClient )) }
                </tbody>
            </table>
        </div>
    )
}

export default ClientsList;