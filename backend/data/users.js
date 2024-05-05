import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10), //10 is the longer it will take
    isAdmin: true,
  },
  {
    name: "Yassine Hamzaoui",
    email: "yassinehmz@gmail.com",
    password: bcrypt.hashSync("123456", 10), //10 is the longer it will take
    isAdmin: false,
  },
  {
    name: "Ouissam Jirari",
    email: "ouissamjrr@gmail.com",
    password: bcrypt.hashSync("123456", 10), //10 is the longer it will take
    isAdmin: false,
  },
];

export default users;
