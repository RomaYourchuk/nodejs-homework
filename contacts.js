const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');


    // TODO: задокументувати кожну функцію
    async function listContacts() {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        return contacts;
    }
  
    async function getContactById(contactId) {
        const contacts = await listContacts();
        const contact = contacts.find(item => item.id === contactId);
        if (!contact) {
          return null;
        }
        return contact;
    }
  
    async function removeContact(contactId) {
        const contacts = await listContacts();
        const newContacts = JSON.stringify(contacts.filter(({id}) => id !== contactId), null, 2);
        await fs.writeFile(contactsPath, newContacts);
    }
  

    async function addContact(name, email, phone) {
        const contacts = await listContacts();
        const id = require("nanoid").nanoid();
        const newContacts = JSON.stringify([...contacts, {id, name, email, phone}], null, 2);
        await fs.writeFile(contactsPath, newContacts);
    }

const contactsOperations = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
module.exports = contactsOperations;