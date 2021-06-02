const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000;


// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', (req, res) => {

   

    const mascots = [
        { name: 'Candra', organization: "DigitalOcean", birth_year: 2012 },
        { name: 'Marsha', organization: "Linux", birth_year: 1996 },
        { name: 'Jinan', organization: "Docker", birth_year: 2013 }
    ];
    const tagline = "No programming concept is complete without a cute animal mascot.";
    const title= "Home";

    res.render('pages/index', {
        layout: 'layout/main-layout',
        title: title,
        mascots: mascots,
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