import React, { useState } from 'react';

//Toast component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Components
import Header from './components/Header/Header.jsx'
import ClientsList from './components/ClientsList/ClientsList.jsx'
import Popup from './components/Popup/Popup.jsx'
import ClientsForm from './components/ClientsForm/ClientsForm.jsx'

//API para manipular os clientes
import api from './Util/api'

function App() {
  const notify = (Message = '', type = 'success') => {
    toast(Message, { type })
  }

  const [clients, setClients] = useState([])

  api.get(`/api/clients/`)
  .then((response) => setClients(response.data))
  .catch((err) => {
    notify('Ocorreu um erro, tente novamente!', 'error')
    console.error("ops! something went wrong " + err);
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formAction, setFormAction] = useState('I');
  const [clientCod, setClientCod] = useState(null);

  const handleOpenPopup = ( props ) => {
    let clientCod = props.currentTarget.getAttribute('clientcod')
    if( clientCod !== null ) {
      let client = clients.filter( client => client.key === clientCod )[0];

      let phoneInput = document.getElementById('phone') 
      let emailInput = document.getElementById('email')
      let nameInput = document.getElementById('name');
  
      phoneInput.value = client.phone
      emailInput.value = client.email
      nameInput.value = client.name
      
      setClientCod( clientCod )
      setFormAction('A')
    } else {
      
      setClientCod( null )
      setFormAction('I')
    }

    setIsPopupOpen( true );
  }
  
  const handleClosePopup = () => {
    setIsPopupOpen( false );

    let phoneInput = document.getElementById('phone') 
    let emailInput = document.getElementById('email')
    let nameInput = document.getElementById('name');

    phoneInput.value = ''
    emailInput.value = ''
    nameInput.value = ''
  }

  const saveClient = ( props ) => {
    let phoneInput = document.getElementById('phone') 
    let emailInput = document.getElementById('email')
    let nameInput = document.getElementById('name');
    let isDataValid = true
    let clientCod = props.currentTarget.getAttribute('clientcod')

    if( nameInput.className.includes('invalid') ) {
      notify('O nome está inválido!', 'error')
      isDataValid = false
    }

    if( emailInput.className.includes('invalid') ) {
      notify('O email está inválido!', 'error')
      isDataValid = false
    }

    if( phoneInput.className.includes('invalid') ) {
      notify('O telefone está inválido!', 'error')
      isDataValid = false
    }

    if(isDataValid) {
      if( formAction === "I" ) {
        api.put(`/api/clients?name=${ nameInput.value }&email=${ emailInput.value }&phone=${ phoneInput.value }`)
          .then((response) => {
            setClients(response.data)
            notify('Cliente incluído com sucesso!', 'success')
          })
          .catch((err) => {
            notify('Ocorreu um erro, tente novamente!', 'error')
            console.error("ops! something went wrong " + err);
          });
      } else {
        // let auxClients = [...clients];
        // let client = auxClients.filter( client => client.key === clientCod )[0];

        // client.name = nameInput.value
        // client.email = emailInput.value
        // client.phone = phoneInput.value

        // setClients([...auxClients])
        // notify('Cliente alterado com sucesso!', 'success')

        api.put(`/api/clients?key=${clientCod}&name=${ nameInput.value }&email=${ emailInput.value }&phone=${ phoneInput.value }`)
        .then((response) => {
          setClients(response.data)
          notify('Cliente alterado com sucesso!', 'success')
        })
        .catch((err) => {
          notify('Ocorreu um erro, tente novamente!', 'error')
          console.error("ops! something went wrong " + err);
        });
      }

      handleClosePopup()
    } else {
      return
    }
  }

  const deleteClient = ( props ) => {
    let clientCod = props.currentTarget.getAttribute('clientcod')

    api.delete(`/api/clients?key=${clientCod}`)
      .then((response) => {
        setClients(response.data)
        notify('Cliente excluído com sucesso!', 'success')
      })
      .catch((err) => {
        notify('Ocorreu um erro, tente novamente!', 'error')
        console.error("ops! something went wrong " + err);
      });
  }

  return (
    <div className="App">
      <Header title={"Clientes"} handlerOpenPopup={ handleOpenPopup }/>
      <ClientsList clientsList={ clients || [] } handlerOpenPopup={ handleOpenPopup } deleteClient={ deleteClient }/>
      <Popup id="ClientsForm" hidden={ !isPopupOpen } handleClose={ handleClosePopup }>
        <ClientsForm formAction={ formAction } handleClose={ handleClosePopup } clientCod={ clientCod } saveClient={saveClient}/>
      </Popup>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <ToastContainer />
    </div>
  );
}

export default App;
