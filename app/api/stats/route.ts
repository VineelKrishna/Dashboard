import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { authOptions } from '@/lib/auth';

// GET - Fetch dashboard statistics
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get all products
    const products = await Product.find();

    // Calculate statistics
    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.isActive).length;
    const lowStockProducts = products.filter(
      (p) => p.stockQuantity <= p.lowStockThreshold
    ).length;

    const totalRevenue = products.reduce(
      (sum, p) => sum + p.price * p.sales,
      0
    );

    const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

    const totalValue = products.reduce(
      (sum, p) => sum + p.price * p.stockQuantity,
      0
    );

    // Category distribution
    const categoryMap = new Map<string, number>();
    products.forEach((p) => {
      categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
    });

    const categoryData = Array.from(categoryMap.entries()).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    // Top selling products
    const topProducts = products
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5)
      .map((p) => ({
        name: p.name,
        sales: p.sales,
        revenue: p.price * p.sales,
      }));

    // Stock distribution
    const stockData = [
      {
        name: 'In Stock',
        value: products.filter((p) => p.stockQuantity > p.lowStockThreshold)
          .length,
      },
      {
        name: 'Low Stock',
        value: lowStockProducts,
      },
      {
        name: 'Out of Stock',
        value: products.filter((p) => p.stockQuantity === 0).length,
      },
    ];

    // Monthly sales trend (last 6 months simulation)
    const monthlySales = [
      { month: 'Jul', sales: 4500, revenue: 135000 },
      { month: 'Aug', sales: 5200, revenue: 156000 },
      { month: 'Sep', sales: 4800, revenue: 144000 },
      { month: 'Oct', sales: 6100, revenue: 183000 },
      { month: 'Nov', sales: 7300, revenue: 219000 },
      { month: 'Dec', sales: totalSales, revenue: totalRevenue },
    ];

    return NextResponse.json({
      overview: {
        totalProducts,
        activeProducts,
        lowStockProducts,
        totalRevenue,
        totalSales,
        totalValue,
      },
      categoryData,
      topProducts,
      stockData,
      monthlySales,
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
