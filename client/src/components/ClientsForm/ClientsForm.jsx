import React, { useState } from 'react';

function ClientsForm({ formAction, handleClose, clientCod, saveClient }) {
    const [ isNameValid, setIsNameValid ] = useState( true )
    const [ isEmailValid, setIsEmailValid ] = useState( true )
    const [ isPhoneValid, setIsPhoneValid ] = useState( true )

    const validatePhone = () => {
        let phoneInput = document.getElementById('phone') 
        let isValidPhone = /^\d+$/.test(phoneInput.value);

        setIsPhoneValid(isValidPhone)
    };

    function setPhoneMask() {
        document.getElementById('phone').addEventListener('blur', function (e) {
            let x
            if( e.target.value.length < 11 ) {
                x = e.target.value.replace(/\D/g, '').match(/(\d{2})(\d{4})(\d{4})/);
                
                if( x !== null )
                    e.target.value = '(' + x[1] + ') ' + x[2] + '-' + x[3];
            } else {
                x = e.target.value.replace(/\D/g, '').match(/(\d{2})(\d{5})(\d{4})/);

                if( x !== null )
                    e.target.value = '(' + x[1] + ') ' + x[2] + '-' + x[3];
            }
        });
    }

    const validateEmail = () => {
        let emailInput = document.getElementById('email')
        let isValidEmail = String(emailInput.value)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        if( isValidEmail ) {
            if( emailInput.value.length < 11 ) {
                isValidEmail = false
            }
        }

        setIsEmailValid(!!isValidEmail)
    };
    
    const validateName = (email) => {
        let nameInput = document.getElementById('name');
        let isValidName = String(nameInput.value).length > 0

        setIsNameValid(isValidName)
    };

    return (
        <div>
            <div className={"clientsForm__header"}>
                <h1>{ formAction === 'I' ? 'Novo Cliente' : 'Alteração de Cliente' }</h1>
                <hr/>
            </div>
            <div className={"clientsForm__form d-flex flex-row"}>
                <div className="d-flex flex-column flex-grow-1 clientsForm__form-group">
                    <label htmlFor="name" className={"clientsForm__label"}>Nome</label>
                    <input type="text" className={"clientsForm__input " + (isNameValid ? 'valid' : 'invalid')} id="name" autoComplete="off" onKeyUp={ validateName } required/>
                </div>
                <div className="d-flex flex-column flex-grow-1 clientsForm__form-group">
                    <label htmlFor="email" className={"clientsForm__label"}>Email</label>
                    <input type="text" className={"clientsForm__input " + (isEmailValid ? 'valid' : 'invalid')} id="email" autoComplete="off" onKeyUp={ validateEmail } required/>
                </div>
                <div className="d-flex flex-column flex-grow-1 clientsForm__form-group">
                    <label htmlFor="telefone" className={"clientsForm__label"}>Telefone</label>
                    <input type="text" className={"clientsForm__input " + (isPhoneValid ? 'valid' : 'invalid')} id="phone" autoComplete="off" onClick={ setPhoneMask } onKeyUp={ validatePhone } required/>
                </div>
            </div>
            <div className={"clientsForm__form-btns d-flex justify-content-center"}>
                <button type="button" className="btn btn-outline-success clientsForm__form-btn" clientcod={ clientCod } onClick={ saveClient }> Salvar </button>
                <button type="button" className="btn btn-outline-danger clientsForm__form-btn" onClick={ handleClose }> Cancelar </button>
            </div>
        </div>
    );
}
export default ClientsForm;