# E-commerce Admin Dashboard

A comprehensive, server-side rendered (SSR) administrative dashboard for managing products in an e-commerce system. Built with Next.js 14, this application provides fast page load times, improved SEO performance, and an efficient interface for administrators to manage product data.

## 🌟 Features

- **Server-Side Rendering (SSR)** - Fast page loads and improved SEO with Next.js
- **Complete Product Management** - Full CRUD operations for products
- **Multi-Step Product Forms** - Intuitive product creation with validation using Zod
- **Interactive Data Visualization** - Sales and stock metrics using Recharts
- **Secure Image Upload** - Cloud-based image storage with Cloudinary
- **Authentication & Authorization** - Secure admin access with NextAuth.js
- **Admin Onboarding** - Secure admin registration (visible only to authenticated admins)
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Data** - React Query for efficient data fetching and caching
- **Form Validation** - Strong input validation with Zod schemas

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | Frontend & Backend framework with SSR |
| **TypeScript** | Type-safe development |
| **MongoDB** | Database for storing products and admin data |
| **Mongoose** | MongoDB ODM for data modeling |
| **NextAuth.js** | Authentication and session management |
| **React Query** | Server state management and data fetching |
| **Zod** | Schema validation for forms |
| **Recharts** | Interactive charts and data visualization |
| **Cloudinary** | Image upload and storage |
| **Tailwind CSS** | Utility-first CSS framework |
| **React Hot Toast** | Toast notifications |

## 📋 Prerequisites

Before you begin, ensure you have the following:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **MongoDB Atlas** account (free cloud database)
- **Cloudinary** account (for image uploads)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ecommerce-admin
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection (Cloud Database - REQUIRED)
MONGODB_URI=your_mongodb_atlas_connection_string

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

> 📘 **Detailed MongoDB Atlas Setup:** See [MONGODB_ATLAS_SETUP.md](MONGODB_ATLAS_SETUP.md) for complete step-by-step guide.

#### Getting Your Environment Variables:

**MongoDB URI (Required - Cloud Database):**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a FREE account
3. Create a new project (e.g., "Ecommerce Dashboard")
4. Build a database → Choose FREE M0 tier
5. Set up database access:
   - Create a database user with password
   - Save credentials securely
6. Network Access → Add IP Address:
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for deployment
7. Connect → Choose "Connect your application"
8. Copy the connection string
9. Replace `<password>` with your database user password
10. Replace `myFirstDatabase` with your database name (e.g., `ecommerce`)
- Format: `mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority`

**NextAuth Secret:**
- Generate a secure secret: `openssl rand -base64 32`
- Or use any random string generator

**Cloudinary:**
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard to find your cloud name, API key, and API secret
3. Create an unsigned upload preset:
   - Settings → Upload → Upload presets
   - Add upload preset → Set to "Unsigned"
   - Copy the preset name

### 4. Seed the Database

Run the seed script to populate the database with sample data and create a demo admin:

```bash
npm run seed
```

This will create:
- **1 Admin User** with credentials:
  - Email: `admin@example.com`
  - Password: `admin123`
- **10 Sample Products** across various categories

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Login

Use the demo admin credentials:
- **Email:** admin@example.com
- **Password:** admin123

## 📁 Project Structure

```
ecommerce-admin/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # NextAuth endpoints
│   │   ├── admin/             # Admin management
│   │   ├── products/          # Product CRUD
│   │   ├── stats/             # Dashboard statistics
│   │   └── upload/            # Image upload
│   ├── admin/
│   │   └── new/               # Admin onboarding page
│   ├── products/
│   │   ├── [id]/edit/         # Edit product page
│   │   ├── new/               # Create product page
│   │   └── page.tsx           # Products list page
│   ├── login/                 # Login page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Dashboard home
│   ├── providers.tsx          # React Query & NextAuth providers
│   └── globals.css            # Global styles
├── components/
│   ├── dashboard/
│   │   └── DashboardStats.tsx # Charts and statistics
│   ├── layout/
│   │   └── Sidebar.tsx        # Navigation sidebar
│   ├── products/
│   │   ├── MultiStepProductForm.tsx
│   │   └── ProductTable.tsx   # Product listing
│   └── ui/                    # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ImageUpload.tsx
│       └── Input.tsx
├── lib/
│   ├── mongodb.ts             # Database connection
│   └── validations/
│       └── product.ts         # Zod schemas
├── models/
│   ├── Admin.ts               # Admin model
│   └── Product.ts             # Product model
├── scripts/
│   └── seed.ts                # Database seeding script
├── middleware.ts              # NextAuth middleware
└── package.json
```

## 🎯 Key Features Explained

### 1. Server-Side Rendering

All pages are server-rendered for optimal performance and SEO:
- Fast initial page loads
- Better search engine indexing
- Improved performance metrics

### 2. Product Management

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

## 🔐 Admin Credentials

**Demo Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

⚠️ **Important:** Change this password in production!

## 📊 API Endpoints

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

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm start
```

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 🎥 Demo Video

[Link to demo video showing all features]

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created by [Your Name]

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Cloudinary for image hosting
- All open-source contributors

---

**Note:** This is a demo project. For production use, implement additional security measures, error handling, and testing.
