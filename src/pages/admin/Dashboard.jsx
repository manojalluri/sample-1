import React from 'react';
import { Link } from 'react-router-dom';
import {
    TrendingUp,
    ShoppingCart,
    Users,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    AlertTriangle,
    Package
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    // Mock Data
    const stats = [
        {
            name: "Today's Sales",
            value: '₹45,231',
            change: '+12.5%',
            isPositive: true,
            icon: DollarSign,
            bgColor: 'bg-green-50',
            iconColor: 'text-green-600'
        },
        {
            name: 'Total Orders',
            value: '328',
            change: '+8.2%',
            isPositive: true,
            icon: ShoppingCart,
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600'
        },
        {
            name: 'Total Customers',
            value: '1,249',
            change: '+5.1%',
            isPositive: true,
            icon: Users,
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-600'
        },
        {
            name: 'Avg. Order Value',
            value: '₹1,380',
            change: '-2.4%',
            isPositive: false,
            icon: TrendingUp,
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600'
        }
    ];

    const salesData = [
        { date: 'Mon', sales: 12000 },
        { date: 'Tue', sales: 19000 },
        { date: 'Wed', sales: 15000 },
        { date: 'Thu', sales: 25000 },
        { date: 'Fri', sales: 22000 },
        { date: 'Sat', sales: 30000 },
        { date: 'Sun', sales: 28000 }
    ];

    const productData = [
        { product: 'Goat Cut', orders: 45 },
        { product: 'Chicken', orders: 38 },
        { product: 'Mutton', orders: 32 },
        { product: 'Fish', orders: 28 },
        { product: 'Prawns', orders: 15 }
    ];

    const recentOrders = [
        { id: '#1234', customer: 'Rajesh Kumar', items: 'Goat Cut (1kg), Chicken', total: '₹1,250', status: 'Pending', time: '2 mins ago' },
        { id: '#1233', customer: 'Priya Sharma', items: 'Mutton Curry Cut (2kg)', total: '₹2,400', status: 'Packed', time: '15 mins ago' },
        { id: '#1232', customer: 'Amit Patel', items: 'Chicken Breast (500g)', total: '₹350', status: 'Shipped', time: '1 hour ago' },
        { id: '#1231', customer: 'Sneha Reddy', items: 'Fish Fillet, Prawns', total: '₹950', status: 'Delivered', time: '2 hours ago' },
        { id: '#1230', customer: 'Vikram Singh', items: 'Goat Liver (500g)', total: '₹280', status: 'Delivered', time: '3 hours ago' }
    ];

    const lowStockItems = [
        { name: 'Chicken Breast', stock: 5, unit: 'kg', status: 'Critical' },
        { name: 'Goat Liver', stock: 8, unit: 'kg', status: 'Low' },
        { name: 'Fish Fillet', stock: 12, unit: 'kg', status: 'Low' },
        { name: 'Prawns Large', stock: 6, unit: 'kg', status: 'Critical' }
    ];

    const getStatusColor = (status) => {
        const colors = {
            Pending: 'bg-yellow-100 text-yellow-700',
            Packed: 'bg-blue-100 text-blue-700',
            Shipped: 'bg-purple-100 text-purple-700',
            Delivered: 'bg-green-100 text-green-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getStockStatusColor = (status) => {
        return status === 'Critical' ? 'text-red-600 bg-red-50' : 'text-orange-600 bg-orange-50';
    };

    return (
        <div className="p-6">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                                </div>
                                <div className={`flex items-center text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mt-4">{stat.name}</h3>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Sales Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
                            <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
                        </div>
                        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 3 months</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip />
                            <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Orders by Product</h2>
                            <p className="text-sm text-gray-500 mt-1">Top selling products</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={productData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="product" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#f97316" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Orders & Low Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                            <Link to="/admin/orders" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                                View all
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{order.id}</div>
                                            <div className="text-xs text-gray-500">{order.time}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customer}</td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{order.items}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock Alert */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                                <h2 className="text-lg font-semibold text-gray-900">Low Stock Alert</h2>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        {lowStockItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                                        <Package className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-500">Stock: {item.stock} {item.unit}</p>
                                    </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStockStatusColor(item.status)}`}>
                                    {item.status}
                                </span>
                            </div>
                        ))}
                        <Link
                            to="/admin/inventory"
                            className="block w-full text-center py-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
                        >
                            Manage Inventory
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
