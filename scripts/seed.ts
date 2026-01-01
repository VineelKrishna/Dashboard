import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

// Admin Model
const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

// Product Model
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  compareAtPrice: Number,
  cost: { type: Number, required: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  tags: [String],
  stockQuantity: { type: Number, default: 0 },
  lowStockThreshold: { type: Number, default: 10 },
  images: [String],
  isActive: { type: Boolean, default: true },
  sales: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const seedData = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Admin.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await Admin.create({
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'super-admin',
      isActive: true,
    });
    console.log('✅ Admin created:', admin.email);

    // Create sample products
    console.log('📦 Creating sample products...');
    const sampleProducts = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        price: 129.99,
        compareAtPrice: 179.99,
        cost: 65.00,
        sku: 'WBH-001',
        category: 'Electronics',
        tags: ['audio', 'wireless', 'sale'],
        stockQuantity: 45,
        lowStockThreshold: 10,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
        isActive: true,
        sales: 234,
      },
      {
        name: 'Smart Fitness Watch',
        description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance.',
        price: 199.99,
        compareAtPrice: 249.99,
        cost: 95.00,
        sku: 'SFW-002',
        category: 'Electronics',
        tags: ['fitness', 'wearable', 'featured'],
        stockQuantity: 28,
        lowStockThreshold: 15,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
        isActive: true,
        sales: 156,
      },
      {
        name: 'Organic Cotton T-Shirt',
        description: 'Comfortable and sustainable organic cotton t-shirt available in multiple colors. Perfect for everyday wear.',
        price: 29.99,
        cost: 12.00,
        sku: 'OCT-003',
        category: 'Clothing',
        tags: ['organic', 'sustainable', 'basics'],
        stockQuantity: 120,
        lowStockThreshold: 30,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'],
        isActive: true,
        sales: 412,
      },
      {
        name: 'Yoga Mat Premium',
        description: 'Extra thick yoga mat with non-slip surface and carrying strap. Ideal for yoga, pilates, and home workouts.',
        price: 39.99,
        compareAtPrice: 59.99,
        cost: 18.00,
        sku: 'YMP-004',
        category: 'Sports',
        tags: ['yoga', 'fitness', 'sale'],
        stockQuantity: 8,
        lowStockThreshold: 10,
        images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400'],
        isActive: true,
        sales: 89,
      },
      {
        name: 'Ceramic Plant Pot Set',
        description: 'Beautiful set of 3 ceramic plant pots with drainage holes. Perfect for indoor plants and succulents.',
        price: 34.99,
        cost: 15.00,
        sku: 'CPP-005',
        category: 'Home & Garden',
        tags: ['home', 'plants', 'decor'],
        stockQuantity: 52,
        lowStockThreshold: 20,
        images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400'],
        isActive: true,
        sales: 178,
      },
      {
        name: 'Professional Coffee Maker',
        description: 'Programmable coffee maker with built-in grinder and thermal carafe. Brews perfect coffee every time.',
        price: 149.99,
        compareAtPrice: 199.99,
        cost: 75.00,
        sku: 'PCM-006',
        category: 'Home & Garden',
        tags: ['kitchen', 'coffee', 'appliance'],
        stockQuantity: 18,
        lowStockThreshold: 8,
        images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400'],
        isActive: true,
        sales: 94,
      },
      {
        name: 'Leather Laptop Bag',
        description: 'Genuine leather laptop bag with multiple compartments and padded protection for 15-inch laptops.',
        price: 89.99,
        cost: 42.00,
        sku: 'LLB-007',
        category: 'Other',
        tags: ['leather', 'laptop', 'professional'],
        stockQuantity: 35,
        lowStockThreshold: 12,
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
        isActive: true,
        sales: 145,
      },
      {
        name: 'LED Desk Lamp',
        description: 'Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.',
        price: 44.99,
        cost: 20.00,
        sku: 'LDL-008',
        category: 'Electronics',
        tags: ['lighting', 'desk', 'led'],
        stockQuantity: 67,
        lowStockThreshold: 15,
        images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400'],
        isActive: true,
        sales: 203,
      },
      {
        name: 'Natural Skincare Set',
        description: 'Complete natural skincare routine with cleanser, toner, and moisturizer. Suitable for all skin types.',
        price: 64.99,
        compareAtPrice: 89.99,
        cost: 28.00,
        sku: 'NSS-009',
        category: 'Beauty',
        tags: ['skincare', 'natural', 'gift'],
        stockQuantity: 42,
        lowStockThreshold: 15,
        images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'],
        isActive: true,
        sales: 167,
      },
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free.',
        price: 24.99,
        cost: 10.00,
        sku: 'SWB-010',
        category: 'Sports',
        tags: ['hydration', 'eco-friendly', 'sports'],
        stockQuantity: 95,
        lowStockThreshold: 25,
        images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400'],
        isActive: true,
        sales: 328,
      },
    ];

    await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${sampleProducts.length} sample products`);

    console.log('\n🎉 Seed completed successfully!\n');
    console.log('📋 Admin Credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');
    console.log('\n🔗 Next steps:');
    console.log('   1. Run: npm run dev');
    console.log('   2. Visit: http://localhost:3000');
    console.log('   3. Login with the credentials above\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedData();
