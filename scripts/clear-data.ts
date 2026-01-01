import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function clearData() {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    
    if (!db) {
      throw new Error('Database connection not established');
    }

    // Clear products collection
    const productsResult = await db.collection('products').deleteMany({});
    console.log(`✓ Deleted ${productsResult.deletedCount} products`);

    // Optional: Clear admins (uncomment if you want to delete admin users too)
    // const adminsResult = await db.collection('admins').deleteMany({});
    // console.log(`✓ Deleted ${adminsResult.deletedCount} admins`);

    console.log('\n✓ Database cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing data:', error);
    process.exit(1);
  }
}

clearData();
