import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db.js";
import User from "../models/user.js";
import { config } from "dotenv";

config();

// Female + Male users
const seedUsers = [
  // Female users
  {
    fullName: "Emma Thompson",
    email: "emma.thompson@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
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
    fullName: "Ava Williams",
    email: "ava.williams@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    fullName: "Isabella Garcia",
    email: "isabella.garcia@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
  },

  // Male users
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
    fullName: "James Davis",
    email: "james.davis@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    fullName: "Benjamin Wilson",
    email: "benjamin.wilson@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    fullName: "Lucas Martinez",
    email: "lucas.martinez@example.com",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Optional: clear existing users
    await User.deleteMany();

    // Hash each user's password
    const usersWithHashedPasswords = await Promise.all(
      seedUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    // Insert into DB
    await User.insertMany(usersWithHashedPasswords);

    console.log("✅ Database seeded successfully with hashed passwords");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

