# E-commerce Admin Dashboard

A modern, full-featured administrative dashboard for managing e-commerce products. Built with Next.js 14, MongoDB Atlas, and Cloudinary for a complete cloud-based solution.

## 🚀 Demo & Live Links

[![Demo Video](https://img.shields.io/badge/Demo-Video-red)](https://drive.google.com/file/d/1xqF2msOWGYDs7JPJmOPUVc8Y_HnSoIwh/view?usp=sharing)
[![Live Site](https://img.shields.io/badge/Live-Deployed-green)](https://dashboard-seven-fawn-26.vercel.app/)


## Features

- **Complete Product Management** - Create, read, update, and delete products with ease
- **Multi-Step Product Forms** - Intuitive 3-step form with real-time validation
- **Image Upload & Management** - Cloud-based image storage with Cloudinary CDN
- **Dashboard Analytics** - Visual statistics with interactive charts
- **Secure Authentication** - Admin login with NextAuth.js and bcrypt
- **Admin Management** - Create and manage multiple admin accounts
- **Real-time Data** - React Query for efficient data fetching and caching
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Form Validation** - Strong input validation using Zod schemas
- **Stock Management** - Track inventory with low stock alerts

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **MongoDB Atlas** | Cloud database for products and admins |
| **Mongoose** | MongoDB ODM for data modeling |
| **NextAuth.js** | Authentication and session management |
| **React Query** | Server state management |
| **Zod** | Schema validation |
| **Recharts** | Interactive charts and visualizations |
| **Cloudinary** | Cloud image storage and CDN |
| **Tailwind CSS** | Utility-first CSS framework |
| **React Hot Toast** | Toast notifications |

## Prerequisites

Before starting, you'll need:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (free tier available)
- **Cloudinary Account** (free tier available)
- **Git** (for version control)

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/VineelKrishna/Dashboard
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, MongoDB drivers, and more.

### Step 3: Set Up MongoDB Atlas (Database)

MongoDB Atlas is a free cloud database service. Follow these steps:

#### Create MongoDB Atlas Account & Database

1. **Sign Up**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Try Free" and create an account
   - Verify your email address

2. **Create a New Project**
   - Click "New Project"
   - Name it (e.g., "Ecommerce Dashboard")
   - Click "Create Project"

3. **Create a Database Cluster**
   - Click "Build a Database"
   - Choose **FREE** M0 Shared tier
   - Select a cloud provider and region (closest to you)
   - Name your cluster (e.g., "Cluster0")
   - Click "Create"

4. **Create Database User**
   - Click "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `dashboard` (or your choice)
   - Password: Create a strong password (SAVE THIS!)
   - User Privileges: Select "Read and write to any database"
   - Click "Add User"

5. **Configure Network Access**
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for development and deployment
   - Click "Confirm"

6. **Get Connection String**
   - Go back to "Database" in the left sidebar
   - Click "Connect" button on your cluster
   - Select "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://...`)
   - Replace `<password>` with your database user password
   - Replace the database name after `.mongodb.net/` with `ecommerce`
   - Final format: `mongodb+srv://dashboard:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`

### Step 4: Set Up Cloudinary (Image Storage)

Cloudinary provides free cloud storage for images with CDN delivery.

#### Create Cloudinary Account & Get Credentials

1. **Sign Up**
   - Go to [Cloudinary](https://cloudinary.com/)
   - Click "Sign Up for Free"
   - Create an account and verify your email

2. **Get API Credentials**
   - After login, you'll see the Dashboard
   - Note these values (you'll need them):
     - **Cloud Name** (e.g., `dy5mpc3cg`)
     - **API Key** (e.g., `635413412773792`)
     - **API Secret** (click to reveal, e.g., `6kGOf_VH...`)

3. **Create Upload Preset**
   - Click the Settings icon (gear) in the top right
   - Go to "Upload" tab
   - Scroll down to "Upload presets"
   - Click "Add upload preset"
   - Set "Signing Mode" to **Unsigned**
   - Name it (e.g., `ecommerce_unsigned`)
   - Set "Folder" to `ecommerce-products` (optional, for organization)
   - Click "Save"
   - Copy the preset name

### Step 5: Create Environment Variables File

Create a `.env.local` file in the root directory of your project:

```bash
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://dashboard:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ecommerce_unsigned
```

#### How to Fill in Environment Variables:

**MONGODB_URI:**
- Use the connection string from Step 3.6
- Make sure you replaced `<password>` with your actual password
- Example: `mongodb+srv://dashboard:MyPass123@cluster0.4nixmhy.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`

**NEXTAUTH_URL:**
- For local development: `http://localhost:3000`
- For production: Your deployed URL (e.g., `https://your-app.vercel.app`)

**NEXTAUTH_SECRET:**
- Generate a random secret key:
  - **On Mac/Linux:** Run `openssl rand -base64 32` in terminal
  - **On Windows:** Run `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` in command prompt
  - Or use any random string (minimum 32 characters)

**Cloudinary Variables:**
- `CLOUDINARY_CLOUD_NAME`: Your cloud name from Cloudinary dashboard
- `CLOUDINARY_API_KEY`: Your API key from Cloudinary dashboard  
- `CLOUDINARY_API_SECRET`: Your API secret from Cloudinary dashboard
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Same as CLOUDINARY_CLOUD_NAME
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`: The upload preset name you created (e.g., `ecommerce_unsigned`)

### Step 6: Seed the Database

Populate your database with sample data and create a demo admin account:

```bash
npm run seed
```

This will create:
- **1 Admin User**
  - Email: `admin@example.com`
  - Password: `admin123`
  - Role: Admin
- **10 Sample Products** across various categories

### Step 7: Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Step 8: Login

1. Open your browser and go to `http://localhost:3000`
2. You'll be redirected to the login page
3. Use the demo credentials:
   - **Email:** `admin@example.com`
   - **Password:** `admin123`
4. Click "Sign In"

You should now see the dashboard!

## Project Structure

```
ecommerce-admin/
├── app/
│   ├── api/                    # API routes (backend)
│   │   ├── auth/              # Authentication endpoints
│   │   │   └── [...nextauth]/  # NextAuth.js handlers
│   │   ├── admin/             # Admin management API
│   │   │   └── route.ts       # Create/list admins
│   │   ├── products/          # Product CRUD API
│   │   │   ├── route.ts       # GET all, POST new
│   │   │   └── [id]/          # GET, PUT, DELETE by ID
│   │   ├── stats/             # Dashboard statistics
│   │   │   └── route.ts       # Get analytics data
│   │   └── upload/            # Image upload/delete
│   │       └── route.ts       # Cloudinary integration
│   ├── admin/
│   │   └── new/
│   │       └── page.tsx       # Create new admin page
│   ├── products/
│   │   ├── [id]/
│   │   │   └── edit/
│   │   │       └── page.tsx   # Edit product page
│   │   ├── new/
│   │   │   └── page.tsx       # Create product page
│   │   └── page.tsx           # Products list page
│   ├── login/
│   │   └── page.tsx           # Login page
│   ├── layout.tsx             # Root layout (providers)
│   ├── page.tsx               # Dashboard home
│   ├── providers.tsx          # React Query provider
│   └── globals.css            # Global Tailwind styles
├── components/
│   ├── dashboard/
│   │   └── DashboardStats.tsx # Analytics charts
│   ├── layout/
│   │   └── Sidebar.tsx        # Navigation sidebar
│   ├── products/
│   │   ├── MultiStepProductForm.tsx  # 3-step form
│   │   └── ProductTable.tsx   # Product list table
│   └── ui/                    # Reusable components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ImageUpload.tsx    # Cloudinary uploader
│       └── Input.tsx
├── lib/
│   ├── auth.ts                # NextAuth configuration
│   ├── mongodb.ts             # Database connection
│   └── validations/
│       └── product.ts         # Zod validation schemas
├── models/
│   ├── Admin.ts               # Admin Mongoose model
│   └── Product.ts             # Product Mongoose model
├── scripts/
│   ├── seed.ts                # Database seeding
│   └── clear-data.ts          # Clear database
├── middleware.ts              # Auth middleware
├── .env.local                 # Environment variables (create this)
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

## Features Guide

### 1. Dashboard

The main dashboard provides an overview of your store:

- **Total Products:** Count of all products in database
- **Total Revenue:** Sum of all product prices
- **Total Sales:** Number of items sold
- **Low Stock Items:** Products below threshold
- **Sales Trend Chart:** Monthly sales visualization
- **Category Distribution:** Pie chart of products by category
- **Top Products:** Best-selling items bar chart
- **Stock Status:** Inventory level breakdown

### 2. Product Management

#### Create New Product (3-Step Process)

**Step 1: Basic Information**
- Product Name (required)
- Description (minimum 10 characters)
- Category (dropdown selection)
- SKU (Stock Keeping Unit, must be unique)

**Step 2: Pricing & Inventory**
- Price (required, in USD)
- Compare at Price (optional, for showing discounts)
- Stock Quantity (current inventory)
- Low Stock Threshold (alert level, default 10)

**Step 3: Images & Status**
- Upload 1-5 product images (drag & drop or click)
- Set product status (Active/Inactive)
- Images are stored in Cloudinary CDN

#### Edit Product
- Click "Edit" button on any product
- Modify any field
- Changes are validated before saving
- SKU uniqueness is enforced (except for current product)

#### Delete Product
- Click "Delete" button
- Confirmation dialog appears
- Product is permanently removed from database

#### Product Features:
- **Search:** Search by name, description, or SKU
- **Filter:** Filter by category
- **Status Badge:** Visual indicators for stock levels (High/Low/Out of Stock)
- **Active/Inactive Status:** Control product visibility
- **Price Display:** Shows current price and compare price (if set)
- **Image Preview:** Thumbnail in product list

### 3. Authentication & Security

#### Login System
- Email and password authentication
- Passwords hashed with bcrypt
- JWT-based session tokens
- Protected routes with middleware
- Automatic redirect to login if not authenticated

#### Session Management
- Sessions stored securely
- Auto-logout on token expiration
- Remember me functionality via NextAuth

### 4. Admin Management

#### Create New Admin
- Only authenticated admins can create new admins
- Navigate to "Admin" → "New Admin"
- Required fields:
  - Name
  - Email (must be unique)
  - Password (minimum 8 characters)
  - Role (Admin or Super Admin)
- Passwords are automatically hashed

### 5. Image Upload System

#### How It Works:
1. Click upload area or drag images
2. Images upload to Cloudinary
3. CDN URLs stored in database
4. Images optimized automatically
5. Delete removes from both database and Cloudinary

#### Features:
- Multiple image upload (up to 5 per product)
- Drag and drop support
- Image preview before upload
- Progress indicator
- Delete individual images
- Automatic image optimization
- CDN delivery for fast loading

## API Endpoints

### Authentication
```
POST   /api/auth/signin       - Login with credentials
POST   /api/auth/signout      - Logout current session
GET    /api/auth/session      - Get current session
```

### Products
```
GET    /api/products          - Get all products (with optional filters)
                               Query params: ?category=Electronics&search=phone&isActive=true
POST   /api/products          - Create new product (auth required)
GET    /api/products/[id]     - Get single product by ID
PUT    /api/products/[id]     - Update product (auth required)
DELETE /api/products/[id]     - Delete product (auth required)
```

### Admin
```
GET    /api/admin             - List all admins (auth required)
POST   /api/admin             - Create new admin (auth required)
```

### Statistics
```
GET    /api/stats             - Get dashboard statistics (auth required)
                               Returns: totalProducts, totalRevenue, totalSales, lowStockCount, etc.
```

### Image Upload
```
POST   /api/upload            - Upload image to Cloudinary (auth required)
                               Body: { file: base64_string }
DELETE /api/upload             - Delete image from Cloudinary (auth required)
                               Body: { publicId: string }
```

## Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Step-by-Step Deployment:

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/ecommerce-admin.git
   git push -u origin main
   ```

2. **Create Vercel Account**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub

3. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

4. **Configure Environment Variables**
   - In project settings, add all variables from `.env.local`:
     - `MONGODB_URI`
     - `NEXTAUTH_URL` (use your Vercel URL, e.g., `https://your-app.vercel.app`)
     - `NEXTAUTH_SECRET`
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`
     - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
     - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your app is live!

6. **Update NEXTAUTH_URL**
   - After first deployment, copy your Vercel URL
   - Update `NEXTAUTH_URL` environment variable
   - Redeploy

### Alternative: Manual Deployment

For other hosting platforms:

```bash
# Build the application
npm run build

# Start production server
npm start
```

Make sure to set all environment variables on your hosting platform.

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Seed database
npm run seed

# Clear database
npm run clear
```

### Adding New Features

1. **New API Route:** Create file in `app/api/your-route/route.ts`
2. **New Page:** Create file in `app/your-page/page.tsx`
3. **New Component:** Create file in `components/your-component/`
4. **New Model:** Create file in `models/YourModel.ts`

## Security Best Practices

### Important for Production:

1. **Change Default Admin Password**
   
   ⚠️ **CRITICAL:** The demo admin credentials (`admin@example.com` / `admin123`) are public and visible in your code. Anyone can use them to access your admin dashboard if you deploy with these credentials.
   
   **Option 1: Create New Admin & Delete Demo Account (Recommended)**
   - Login with demo credentials: `admin@example.com` / `admin123`
   - Navigate to "Admin" → "New Admin" in the sidebar
   - Create a new admin account with:
     - Your real email address
     - A strong, unique password (12+ characters, mix of letters/numbers/symbols)
     - Role: Admin or Super Admin
   - Logout and login with your new credentials
   - After confirming your new admin works, delete the demo account you can remove it from MongoDB Atlas directly as
   
   - Go to MongoDB Atlas → Database → Browse Collections
   - Select `admins` collection
   - Find the admin with email `admin@example.com`
   - Generate a new bcrypt hash for your password (use bcrypt online tool)
   - Update the `password` field with the new hash

2. **Environment Variables**
   - Never commit `.env.local` to Git
   - Use different secrets for each environment
   - Rotate secrets regularly

3. **MongoDB**
   - Use strong database passwords
   - Limit IP access in production
   - Enable backup

4. **Cloudinary**
   - Use signed uploads in production
   - Set up folder structure
   - Enable moderation

5. **NextAuth**
   - Use HTTPS in production
   - Set secure cookie settings
   - Implement rate limiting

## Troubleshooting

### Common Issues:

**Can't connect to MongoDB**
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
- Verify connection string format
- Ensure password doesn't contain special characters (URL encode if needed)
- Check database user has read/write permissions

**Cloudinary upload fails**
- Verify upload preset is "Unsigned"
- Check cloud name, API key, and secret
- Ensure NEXT_PUBLIC_* variables are set correctly
- Clear browser cache

**Login not working**
- Check NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your domain
- Clear browser cookies
- Check MongoDB connection

**Images not displaying**
- Verify Cloudinary URLs are accessible
- Check CORS settings
- Ensure images uploaded successfully

**Build fails**
- Run `npm install` again
- Check for TypeScript errors: `npm run lint`
- Verify all environment variables are set
- Clear `.next` folder and rebuild

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built using Next.js, MongoDB, and Cloudinary**

**Create Products:**
- Multi-step form with validation
- Basic info, pricing, and images
- Real-time profit margin calculation

**Edit Products:**
- Update any product field
- Maintain product history
- SKU uniqueness validation

**Delete Products:**
- Confirmation dialog
- Cascade deletion support

### 3. Dashboard Analytics

- **Overview Cards:** Total products, revenue, sales, low stock alerts
- **Sales Trend:** Line chart showing monthly performance
- **Category Distribution:** Pie chart of products by category
- **Top Products:** Bar chart of best-selling items
- **Stock Status:** Visual breakdown of inventory levels

### 4. Authentication & Security

- Secure password hashing with bcrypt
- JWT-based session management
- Protected routes with middleware
- Role-based access control

### 5. Admin Onboarding

- Secure page accessible only to authenticated admins
- Create new admin accounts
- Role assignment (Admin or Super Admin)
- Password requirements enforcement

### 6. Image Management

- Drag-and-drop upload interface
- Multiple image support (up to 5 per product)
- Cloud storage with Cloudinary
- Image optimization and CDN delivery

## Admin Credentials

**Demo Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

## API Endpoints

### Authentication
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout

### Products
- `GET /api/products` - List all products (with filters)
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Admin
- `GET /api/admin` - List all admins (super-admin only)
- `POST /api/admin` - Create new admin (authenticated only)

### Statistics
- `GET /api/stats` - Dashboard statistics

### Upload
- `POST /api/upload` - Upload image
- `DELETE /api/upload` - Delete image