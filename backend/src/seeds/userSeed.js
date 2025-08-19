import {  connectDB } from "../lib/db.js";
import User from "../models/user.js";

import { config } from "dotenv";

config();

// Female Users

const seedUsers = [
  {

  fullName:"Emma Thompson",
  email:"emma.thompson@example.com",
  password:"password123",
  profilePicture:"https://randomuser.me/api/portraits/women/1.jpg",

  },
   {
    fullName: "Olivia Johnson",
    email: "olivia.johnson@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    fullName: "Sophia Brown",
    email: "sophia.brown@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    fullName: "Isabella Davis",
    email: "isabella.davis@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    fullName: "Ava Wilson",
    email: "ava.wilson@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    fullName: "Mia Taylor",
    email: "mia.taylor@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    fullName: "Amelia Moore",
    email: "amelia.moore@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    fullName: "Harper Anderson",
    email: "harper.anderson@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    fullName: "Evelyn Thomas",
    email: "evelyn.thomas@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    fullName: "Abigail Jackson",
    email: "abigail.jackson@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/10.jpg",
  },

  // Male Users

  {
    fullName: "Liam Smith",
    email: "liam.smith@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    fullName: "Noah Johnson",
    email: "noah.johnson@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    fullName: "William Brown",
    email: "william.brown@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    fullName: "James Davis",
    email: "james.davis@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    fullName: "Benjamin Miller",
    email: "benjamin.miller@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    fullName: "Lucas Wilson",
    email: "lucas.wilson@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    fullName: "Henry Taylor",
    email: "henry.taylor@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    fullName: "Alexander Moore",
    email: "alexander.moore@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    fullName: "Michael Anderson",
    email: "michael.anderson@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    fullName: "Ethan Thomas",
    email: "ethan.thomas@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/10.jpg",
  }

];


const seedDatabase = async () => {
    try {
      await connectDB();

      await User.insertMany(seedUsers);
      console.log("Database seeded successfully");


    } catch (error) {
      console.error("Error seeding database:", error);
    }
};

seedDatabase();

