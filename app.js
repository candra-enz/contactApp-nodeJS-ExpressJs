const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const expressLayouts = require('express-ejs-layouts')
const { deleteContact, loadContacts, findContact, addContact, cekDuplikat, } = require('./utils/contacts')
const app = express()
const port = 3000;
const { body, validationResult, check } = require('express-validator');

//konfigurasi flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: 600 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



//home
app.get('/', (req, res) => {
    const title = "Home";
    res.render('pages/index', {
        layout: 'layouts/main-layout',
        title: title,
    });
});
//about
app.get('/about', (req, res) => {
    const title = "About";
    res.render('pages/about', {
        layout: 'layouts/main-layout',
        title: title
    })
});

//contact
app.get('/contact', (req, res) => {
    const title = "Contact";
    const contacts = loadContacts();
    res.render('pages/contact', {
        layout: 'layouts/main-layout',
        title: title,
        contacts: contacts,
        msg: req.flash('msg'),
    })
});



// addContact
app.get('/contact/addContact', (req, res) => {
    const title = "Tambah Contact";
    res.render('pages/addContact', {
        layout: 'layouts/main-layout',
        title: title,
    })
});


//ADDcontact Prpses
app.post('/contact',
    [
        body('name').custom((value) => {
            const duplikat = cekDuplikat(value);
            if (duplikat) {
                throw new Error('Name not be same');
            }
            return true;
        }),
        check('email', 'Email tidak valid').isEmail(),
        check('nohp', 'Nomor telephon tidak valid').isMobilePhone('id-ID')
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            const title = "Tambah Contact";
            res.render('pages/addContact', {
                layout: 'layouts/main-layout',
                title: title,
                errors: errors.array(),
            })
        } else {
            addContact(req.body)
            //kirim flash massage
            req.flash('msg', 'Data Contact berhasil ditambahkan');
            res.redirect('/addContact')
        }
    });



app.get('/contact/delete/:name', (req, res) => {

    const contact = findContact(req.params.name);
          
    // jika contact tidak ada
    if (!contact) {
        res.status(404);
        res.send('<h1>404</h1>');
    } else {
       deleteContact(req.params.name)
        req.flash('msg', 'Data Contact berhasil dihapus');
        res.redirect('/contact')
    }
})




// Detail
app.get('/contact/:name', (req, res) => {
    const title = "Detail Contact";
    const contact = findContact(req.params.name);
    res.render('pages/detailContact', {
        layout: 'layouts/main-layout',
        title: title,
        contact: contact
    })
})







// app.use('/', (req, res) => {
//     res.status('404')
//     res.render('pages/404')
// })a

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})