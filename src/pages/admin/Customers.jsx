import React, { useState } from 'react';
import { Search, Filter, Eye, Mail, Phone, MapPin, ShoppingBag, DollarSign, Users } from 'lucide-react';

const Customers = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const customers = [
        {
            id: 1,
            name: 'Rajesh Kumar',
            email: 'rajesh@example.com',
            phone: '+91 98765 43210',
            address: '123 MG Road, Bangalore, Karnataka - 560001',
            totalOrders: 28,
            totalSpend: 38450,
            lastOrder: '2024-12-17',
            status: 'Active',
            orders: [
                { id: '#1234', date: '2024-12-17', items: 'Goat Curry Cut, Chicken Breast', total: 980, status: 'Pending' },
                { id: '#1198', date: '2024-12-14', items: 'Mutton Chops', total: 1200, status: 'Delivered' },
                { id: '#1156', date: '2024-12-10', items: 'Fish Fillet', total: 450, status: 'Delivered' }
            ]
        },
        {
            id: 2,
            name: 'Priya Sharma',
            email: 'priya@example.com',
            phone: '+91 98765 43211',
            address: '456 Park Street, Kolkata, West Bengal - 700016',
            totalOrders: 15,
            totalSpend: 22300,
            lastOrder: '2024-12-17',
            status: 'Active',
            orders: [
                { id: '#1233', date: '2024-12-17', items: 'Mutton Curry Cut', total: 1500, status: 'Packed' },
                { id: '#1189', date: '2024-12-12', items: 'Chicken Wings', total: 680, status: 'Delivered' }
            ]
        },
        {
            id: 3,
            name: 'Amit Patel',
            email: 'amit@example.com',
            phone: '+91 98765 43212',
            address: '789 Nehru Nagar, Mumbai, Maharashtra - 400001',
            totalOrders: 42,
            totalSpend: 56780,
            lastOrder: '2024-12-17',
            status: 'Active',
            orders: [
                { id: '#1232', date: '2024-12-17', items: 'Chicken Breast', total: 310, status: 'Shipped' }
            ]
        },
        {
            id: 4,
            name: 'Sneha Reddy',
            email: 'sneha@example.com',
            phone: '+91 98765 43213',
            address: '321 Beach Road, Chennai, Tamil Nadu - 600001',
            totalOrders: 8,
            totalSpend: 9250,
            lastOrder: '2024-12-16',
            status: 'Active',
            orders: [
                { id: '#1231', date: '2024-12-16', items: 'Fish Fillet, Prawns', total: 635, status: 'Delivered' }
            ]
        },
        {
            id: 5,
            name: 'Vikram Singh',
            email: 'vikram@example.com',
            phone: '+91 98765 43214',
            address: '654 Lake View, Hyderabad, Telangana - 500001',
            totalOrders: 3,
            totalSpend: 1850,
            lastOrder: '2024-12-16',
            status: 'Inactive',
            orders: [
                { id: '#1230', date: '2024-12-16', items: 'Goat Liver', total: 310, status: 'Pending' }
            ]
        }
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                <p className="text-gray-500 mt-1">Manage your customer base</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Customers</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">1,249</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Active Customers</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">987</p>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">₹12.8L</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search customers by name, email, or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spend</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold text-sm">
                                                    {customer.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                                                <div className="text-xs text-gray-500">ID: #{customer.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{customer.email}</div>
                                        <div className="text-xs text-gray-500">{customer.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.totalOrders}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{customer.totalSpend.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.lastOrder}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex text-xs px-2.5 py-1 rounded-full font-medium ${customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button
                                            onClick={() => setSelectedCustomer(customer)}
                                            className="inline-flex items-center px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium"
                                        >
                                            <Eye className="w-4 h-4 mr-1" />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 1 to 5 of 5 customers</p>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                            Previous
                        </button>
                        <button className="px-3 py-1 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700">
                            1
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Customer Details Modal */}
            {selectedCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Customer Profile</h2>
                                <button
                                    onClick={() => setSelectedCustomer(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Customer Info */}
                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">
                                        {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">{selectedCustomer.name}</h3>
                                    <div className="mt-2 space-y-2">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                            {selectedCustomer.email}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                            {selectedCustomer.phone}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                            {selectedCustomer.address}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-xs text-gray-500 font-medium">Total Orders</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{selectedCustomer.totalOrders}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-xs text-gray-500 font-medium">Total Spend</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">₹{selectedCustomer.totalSpend.toLocaleString()}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-xs text-gray-500 font-medium">Avg. Order</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">₹{Math.round(selectedCustomer.totalSpend / selectedCustomer.totalOrders)}</p>
                                </div>
                            </div>

                            {/* Order History */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Order History</h3>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Order ID</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Items</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Total</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {selectedCustomer.orders.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">{order.date}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700">{order.items}</td>
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{order.total}</td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <span className={`inline-flex text-xs px-2 py-0.5 rounded-full font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={() => setSelectedCustomer(null)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
