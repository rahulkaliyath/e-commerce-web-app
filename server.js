const express =require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { error } = require('console');


if(process.env.NODE_ENV !== 'production')
    require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app =express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
const port = process.env.PORT || 5000;

if(process.env.NODE_ENV !== 'production'){
    app.use(express.static(path.join(__dirname,'client/build')));

    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname,'client/build','index.html'))
    }); 
}

app.post('/payment', (req,res) =>{
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd',
        description: "test"
    };


    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr){
            console.log(stripeErr);
            res.status(500).send({"error":stripeErr.message});
        }
        else{
            res.status(200).send({success: stripeRes});
        }
    });

})

app.listen(port,error => {
    if (error) throw error;
    console.log('Server running on port '+ port);
});

