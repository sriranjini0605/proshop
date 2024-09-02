import  bcrypt  from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('password123', 10),
        isAdmin: true,
    },
    {
        name: 'Ranjini',
        email: 'ranjini@email.com',
        password: bcrypt.hashSync('password123', 10),
        isAdmin: false,
    },
    {
        name: 'Jith',
        email: 'jith@email.com',
        password: bcrypt.hashSync('password123', 10),
        isAdmin: false,
    }
];

export default users;