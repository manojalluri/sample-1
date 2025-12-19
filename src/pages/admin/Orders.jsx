import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, ChevronDown, Package } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const Orders = () => {
    const { orders, updateOrderStatus } = useShop();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const statuses = ['All', 'Pending', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];

    const getStatusColor = (status) => {
        const colors = {
            Pending: 'bg-yellow-100 text-yellow-700',
            Processing: 'bg-blue-100 text-blue-700',
            Packed: 'bg-indigo-100 text-indigo-700',
            Shipped: 'bg-purple-100 text-purple-700',
            Delivered: 'bg-green-100 text-green-700',
            Cancelled: 'bg-red-100 text-red-700',
            Placed: 'bg-yellow-100 text-yellow-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        if (updateOrderStatus) {
            updateOrderStatus(orderId, newStatus);
            // Update selected order if it's open
            if (selectedOrder && selectedOrder.id === orderId) {
                setSelectedOrder(prevOrder => ({
                    ...prevOrder,
                    status: newStatus
                }));
            }
        }
    };

    // Filter and search orders
    const filteredOrders = orders.filter(order => {
        const matchesSearch = !searchQuery ||
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer?.phone?.includes(searchQuery);

        const matchesStatus = filterStatus === 'All' || order.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
                <p className="text-gray-500 mt-1">Manage and track all customer orders ({orders.length} total)</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by order ID, customer name, or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                        >
                            {statuses.map(status => (
                                <option key={status} value={status}>{status} Orders</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
                    <p className="text-gray-500">
                        {searchQuery || filterStatus !== 'All'
                            ? 'Try adjusting your search or filters'
                            : 'No customer orders yet. Orders will appear here once customers place them.'}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 font-mono">{order.id}</div>
                                            <div className="text-xs text-gray-500">{formatDate(order.date)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{order.customer?.name || 'N/A'}</div>
                                            <div className="text-xs text-gray-500">{order.customer?.phone || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-700">
                                                {order.items && order.items.length > 0 ? (
                                                    <>
                                                        {order.items.slice(0, 2).map((item, idx) => (
                                                            <div key={idx}>
                                                                {item.name} ({item.cut}) - {item.quantity}kg
                                                            </div>
                                                        ))}
                                                        {order.items.length > 2 && (
                                                            <div className="text-xs text-gray-500">+{order.items.length - 2} more</div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-gray-400">No items</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            ₹{order.finalAmount || order.total || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                className={`text-xs px-2.5 py-1.5 rounded-full font-medium border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer ${getStatusColor(order.status)}`}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Packed">Packed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
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

                    {/* Pagination Info */}
                    <div className="px-6 py-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Showing {filteredOrders.length} of {orders.length} orders
                        </p>
                    </div>
                </div>
            )}

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ✕
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 font-mono mt-1">{selectedOrder.id}</p>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Customer Info */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Customer Information</h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <p className="text-sm"><span className="font-medium">Name:</span> {selectedOrder.customer?.name || 'N/A'}</p>
                                    <p className="text-sm"><span className="font-medium">Phone:</span> {selectedOrder.customer?.phone || 'N/A'}</p>
                                    <p className="text-sm"><span className="font-medium">Email:</span> {selectedOrder.userEmail || 'N/A'}</p>
                                    <p className="text-sm"><span className="font-medium">Address:</span> {selectedOrder.customer?.address}, {selectedOrder.customer?.city} - {selectedOrder.customer?.pincode}</p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Order Items</h3>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-0">
                                            <div className="flex items-center">
                                                <Package className="w-10 h-10 text-gray-400 mr-3" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        Preparation: {item.cut} • Quantity: {item.quantity}kg
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">₹{item.price * item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Billing Summary */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Billing Summary</h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Item Total</span>
                                        <span className="font-medium text-gray-900">₹{selectedOrder.itemTotal || 0}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Delivery Charges</span>
                                        <span className="font-medium text-gray-900">₹{selectedOrder.deliveryFee || 0}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Taxes & Charges</span>
                                        <span className="font-medium text-gray-900">₹{selectedOrder.taxesAndCharges || 0}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-300">
                                        <span className="text-gray-900">Total</span>
                                        <span className="text-orange-600">₹{selectedOrder.finalAmount || 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Update */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Update Order Status</h3>
                                <select
                                    value={selectedOrder.status}
                                    onChange={(e) => handleStatusUpdate(selectedOrder.id, e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg font-medium border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${getStatusColor(selectedOrder.status)}`}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Packed">Packed</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={() => setSelectedOrder(null)}
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

export default Orders;
