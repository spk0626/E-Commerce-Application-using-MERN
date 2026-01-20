const bcrypt = require('bcryptjs');
const Users = [
    {
        name: 'admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'user1',
        email: 'user1@gmail.com',
        password: bcrypt.hashSync('us1#', 10),
        phone: '0712345678',
    },
    {
        name: 'user2',
        email: 'user2@gmail.com',
        password: bcrypt.hashSync('us2#', 10),
        phone: '0702345678',
    },
    
];

module.exports = Users;