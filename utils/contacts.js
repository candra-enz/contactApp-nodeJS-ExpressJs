const fs = require('fs');
const dataPath = './data/contacts.json';
const dirPath = './data';
const validator = require('validator')






//membuat folder data
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

//membuat file contact.json jika belum ada

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}





const loadContacts = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;

}



const findContact = (name) => {

    const contacts = loadContacts()
    const contact = contacts.find((contact) => contact.name == name)
    return contact;

}

const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

}

// cek nama Duplikat
const cekDuplikat = (name) =>{
    const contacts = loadContacts();
    return contacts.find((contact) => contact.name === name);
 
   
}


const addContact = (contact,name) => {

    const contacts = loadContacts();
   

    

    //cek imail
    // if (email) {
    //     if (!validator.isEmail(email)) {
    //         console.log('Email tidak valid');
    //         return false;
    //     }


    // }

    //cek nomor hp
    // if (!validator.isMobilePhone(noHP, 'id-ID')) {
    //     console.log('Nomor Handphone tidak valid');
    //     return false;
    // }

 
    contacts.push(contact);
    saveContacts(contacts)
};







const deleteContact = (nama) => {
    const contacts = loadContacts();

    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (contacts.length == newContacts.length) {
        console.log(`${nama}  Tidak Ditemukan`);
        return false
    };

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
    console.log(`Data contact ${nama}, Berhasil di hapus`);

};

module.exports = { loadContacts, findContact, addContact, cekDuplikat }








//  module.exports = { tulisPertanyaan: tulisPertanyaan,   addContact: simpanContact  }
