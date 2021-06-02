const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000;


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', (req, res) => {

   

    const contacts = [
        { name: 'Candra', noHP: 089245670987 , email: "candra@gmail.com"},
        { name: 'Marsha', noHP: 089245670987, email: "marsha@gmail.com" },
        { name: 'Jinan', noHP: 089245670987, email:"jinan@gmail.com" }
    ];
    const tagline = "No programming concept is complete without a cute animal mascot.";
    const title= "Home";

    res.render('pages/index', {
        layout: 'layout/main-layout',
        title: title,
        contacts: contacts,
        tagline: tagline,
        
    });
});

app.get('/about', (req, res) => {

    const title = "About";
    res.render('pages/about',{
        layout:'layout/main-layout',
        title: title
    })
})

app.get('/contact', (req, res) => {
    const title = "Contact";
    res.render('pages/contact',{
        layout: 'layout/main-layout',
        title: title
    })
})


app.get('/product/:id/', (req, res) => {
    res.send(`Product ID: ${req.params.id} <br> Category : ${req.query.
        category}`);


});

app.use('/', (req, res) => {
    res.status('404')
    res.render('pages/404')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})