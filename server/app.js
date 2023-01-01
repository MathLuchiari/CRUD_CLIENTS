const express = require("express");
const cors = require("cors");

const app = express();
const PORT=process.env.PORT||5000;

let clients = [
    {
        key: '1',
        name: 'Matheus Miranda Luchiari',
        email: 'mm.luchiari2002@gmail.com',
        phone: '(11) 96629-4909'
    }, {
        key: '2',
        name: 'Marlene Jesus Diniz',
        email: 'marlene.diniz@geradornv.com.br',
        phone: '(96) 98764-3327'
    }
]

app.use(express.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send('Welcome to Github NodeJS API app!')
})

app.get('/api/clients', async (req, res, next) => {
    try {
        res.send( clients )
    } catch(e) {
        return next(e);
    }
})

app.put('/api/clients', async (req, res, next) => {
    try {
        if( req.query.key == undefined ) {
            let nextKey = 1
            
            if( clients.length > 0 ) {
                nextKey = (+clients[clients.length - 1].key + 1).toString()
            }
    
            clients = clients.concat({ 
                                        key:    nextKey, 
                                        name:   req.query.name, 
                                        email:  req.query.email, 
                                        phone:  req.query.phone  
                                    })
        } else {
            let auxClients = [...clients];
            let client = auxClients.filter( client => client.key === req.query.key )[0];

            client.name  = req.query.name
            client.email = req.query.email
            client.phone = req.query.phone

            clients = [...auxClients];
        }
        
        res.send( clients )
    } catch(e) {
        return next(e);
    }
})

app.delete('/api/clients', async (req, res, next) => {
    try {
        let auxClients = [...clients]

        clients = [...auxClients.filter( client => client.key !== req.query.key )]

        res.send( clients )
    } catch(e) {
        return next(e);
    }
})

app.listen(PORT,() => console.log(`Server started on port ${PORT}...`))