import React, { useState } from 'react';
import { TrendingUp, Download, Calendar, DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
    const [dateRange, setDateRange] = useState('7days');

    // Sales Data
    const salesData = [
        { date: 'Dec 11', sales: 45200, orders: 42 },
        { date: 'Dec 12', sales: 52100, orders: 48 },
        { date: 'Dec 13', sales: 48900, orders: 45 },
        { date: 'Dec 14', sales: 61200, orders: 56 },
        { date: 'Dec 15', sales: 58700, orders: 52 },
        { date: 'Dec 16', sales: 71500, orders: 64 },
        { date: 'Dec 17', sales: 69300, orders: 61 }
    ];

    // Product Performance
    const productData = [
        { name: 'Goat Curry Cut', sales: 125000, orders: 145, growth: 12.5 },
        { name: 'Chicken Breast', sales: 98500, orders: 312, growth: 8.3 },
        { name: 'Mutton Chops', sales: 87300, orders: 98, growth: 15.7 },
        { name: 'Fish Fillet', sales: 56200, orders: 156, growth: -3.2 },
        { name: 'Prawns', sales: 42800, orders: 87, growth: 22.1 }
    ];

    // Category Distribution
    const categoryData = [
        { name: 'Goat', value: 35, color: '#f97316' },
        { name: 'Chicken', value: 28, color: '#fb923c' },
        { name: 'Mutton', value: 20, color: '#fdba74' },
        { name: 'Fish', value: 12, color: '#fed7aa' },
        { name: 'Seafood', value: 5, color: '#ffedd5' }
    ];

    // Customer Growth
    const customerGrowthData = [
        { month: 'Jun', customers: 850 },
        { month: 'Jul', customers: 920 },
        { month: 'Aug', customers: 1050 },
        { month: 'Sep', customers: 1120 },
        { month: 'Oct', customers: 1180 },
        { month: 'Nov', customers: 1230 },
        { month: 'Dec', customers: 1249 }
    ];

    const stats = [
        {
            label: 'Total Revenue',
            value: '₹4,06,900',
            change: '+15.3%',
            isPositive: true,
            icon: DollarSign,
            color: 'text-green-600 bg-green-50'
        },
        {
            label: 'Total Orders',
            value: '368',
            change: '+12.8%',
            isPositive: true,
            icon: ShoppingCart,
            color: 'text-blue-600 bg-blue-50'
        },
        {
            label: 'New Customers',
            value: '19',
            change: '+5.2%',
            isPositive: true,
            icon: Users,
            color: 'text-purple-600 bg-purple-50'
        },
        {
            label: 'Products Sold',
            value: '798',
            change: '+18.5%',
            isPositive: true,
            icon: Package,
            color: 'text-orange-600 bg-orange-50'
        }
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
                        <p className="text-gray-500 mt-1">Track performance and insights</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="7days">Last 7 Days</option>
                            <option value="30days">Last 30 Days</option>
                            <option value="3months">Last 3 Months</option>
                            <option value="year">This Year</option>
                        </select>
                        <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                            <Download className="w-5 h-5 mr-2" />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium mt-4">{stat.label}</h3>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Sales Trend */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Sales Trend</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} name="Sales (₹)" />
                            <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} name="Orders" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Category Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name} ${value}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Product Performance */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Products Performance</h2>
                    <div className="space-y-4">
                        {productData.map((product, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-900">{product.name}</span>
                                            <span className="text-sm font-semibold text-gray-900">₹{product.sales.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs text-gray-500">{product.orders} orders</span>
                                            <span className={`text-xs font-medium ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {product.growth >= 0 ? '+' : ''}{product.growth}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-orange-500 h-2 rounded-full transition-all"
                                        style={{ width: `${(product.sales / 125000) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Customer Growth */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Growth</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={customerGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="customers" fill="#f97316" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Quick Reports */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Quick Reports</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mr-3">
                                    <DollarSign className="w-5 h-5 text-orange-600" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-900">Sales Report</p>
                                    <p className="text-xs text-gray-500">Detailed sales breakdown</p>
                                </div>
                            </div>
                            <Download className="w-5 h-5 text-gray-400" />
                        </button>

                        <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-900">Orders Report</p>
                                    <p className="text-xs text-gray-500">All orders summary</p>
                                </div>
                            </div>
                            <Download className="w-5 h-5 text-gray-400" />
                        </button>

                        <button className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                                    <Users className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-900">Customer Report</p>
                                    <p className="text-xs text-gray-500">Customer insights</p>
                                </div>
                            </div>
                            <Download className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
