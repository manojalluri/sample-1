import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingDown, Edit, Plus, Minus } from 'lucide-react';

const Inventory = () => {
    const [inventory, setInventory] = useState([
        {
            id: 1,
            name: 'Premium Goat Curry Cut',
            image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=100&h=100&fit=crop',
            category: 'Goat',
            currentStock: 45,
            minStock: 20,
            unit: 'kg',
            status: 'Good'
        },
        {
            id: 2,
            name: 'Chicken Breast Boneless',
            image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=100&h=100&fit=crop',
            category: 'Chicken',
            currentStock: 120,
            minStock: 50,
            unit: 'kg',
            status: 'Good'
        },
        {
            id: 3,
            name: 'Mutton Chops',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop',
            category: 'Mutton',
            currentStock: 30,
            minStock: 25,
            unit: 'kg',
            status: 'Good'
        },
        {
            id: 4,
            name: 'Fresh Fish Fillet',
            image: 'https://images.unsplash.com/photo-1511910849309-0dffb8785146?w=100&h=100&fit=crop',
            category: 'Fish',
            currentStock: 8,
            minStock: 15,
            unit: 'kg',
            status: 'Low'
        },
        {
            id: 5,
            name: 'Large Prawns',
            image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop',
            category: 'Seafood',
            currentStock: 0,
            minStock: 10,
            unit: 'kg',
            status: 'Out'
        },
        {
            id: 6,
            name: 'Chicken Liver',
            image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=100&h=100&fit=crop',
            category: 'Chicken',
            currentStock: 5,
            minStock: 10,
            unit: 'kg',
            status: 'Critical'
        },
        {
            id: 7,
            name: 'Goat Liver',
            image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=100&h=100&fit=crop',
            category: 'Goat',
            currentStock: 8,
            minStock: 10,
            unit: 'kg',
            status: 'Low'
        }
    ]);

    const [editingId, setEditingId] = useState(null);
    const [newStock, setNewStock] = useState('');

    const getStatusColor = (status) => {
        const colors = {
            Good: 'bg-green-100 text-green-700',
            Low: 'bg-orange-100 text-orange-700',
            Critical: 'bg-red-100 text-red-700',
            Out: 'bg-gray-100 text-gray-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getStatusIcon = (status) => {
        if (status === 'Critical' || status === 'Out') {
            return <AlertTriangle className="w-4 h-4 mr-1" />;
        }
        if (status === 'Low') {
            return <TrendingDown className="w-4 h-4 mr-1" />;
        }
        return null;
    };

    const updateStock = (id, amount) => {
        setInventory(inventory.map(item => {
            if (item.id === id) {
                const newStockValue = Math.max(0, item.currentStock + amount);
                let status = 'Good';
                if (newStockValue === 0) status = 'Out';
                else if (newStockValue < item.minStock * 0.5) status = 'Critical';
                else if (newStockValue < item.minStock) status = 'Low';
                return { ...item, currentStock: newStockValue, status };
            }
            return item;
        }));
    };

    const handleStockEdit = (id) => {
        if (editingId === id && newStock) {
            const stock = parseInt(newStock);
            if (!isNaN(stock) && stock >= 0) {
                setInventory(inventory.map(item => {
                    if (item.id === id) {
                        let status = 'Good';
                        if (stock === 0) status = 'Out';
                        else if (stock < item.minStock * 0.5) status = 'Critical';
                        else if (stock < item.minStock) status = 'Low';
                        return { ...item, currentStock: stock, status };
                    }
                    return item;
                }));
            }
            setEditingId(null);
            setNewStock('');
        } else {
            setEditingId(id);
            setNewStock(inventory.find(item => item.id === id)?.currentStock || '');
        }
    };

    const stats = [
        {
            label: 'Total Products',
            value: inventory.length,
            color: 'bg-blue-50 text-blue-600'
        },
        {
            label: 'Low Stock Items',
            value: inventory.filter(i => i.status === 'Low' || i.status === 'Critical').length,
            color: 'bg-orange-50 text-orange-600'
        },
        {
            label: 'Out of Stock',
            value: inventory.filter(i => i.status === 'Out').length,
            color: 'bg-red-50 text-red-600'
        },
        {
            label: 'Well Stocked',
            value: inventory.filter(i => i.status === 'Good').length,
            color: 'bg-green-50 text-green-600'
        }
    ];

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-500 mt-1">Monitor and manage product stock levels</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                        <p className={`text-3xl font-bold mt-2 ${stat.color.split(' ')[1]}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Stock Overview</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {inventory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                <div className="text-xs text-gray-500">ID: #{item.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {editingId === item.id ? (
                                            <input
                                                type="number"
                                                value={newStock}
                                                onChange={(e) => setNewStock(e.target.value)}
                                                className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                autoFocus
                                            />
                                        ) : (
                                            <span className="text-sm font-medium text-gray-900">
                                                {item.currentStock} {item.unit}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.minStock} {item.unit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(item.status)}`}>
                                            {getStatusIcon(item.status)}
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => updateStock(item.id, -5)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                disabled={item.currentStock === 0}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleStockEdit(item.id)}
                                                className={`p-2 ${editingId === item.id ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'} rounded-lg transition-colors`}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => updateStock(item.id, 5)}
                                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Low Stock Alert */}
            {inventory.filter(i => i.status === 'Low' || i.status === 'Critical' || i.status === 'Out').length > 0 && (
                <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex items-start">
                        <AlertTriangle className="w-6 h-6 text-orange-600 mr-3 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-orange-900">Stock Alert</h3>
                            <p className="text-sm text-orange-700 mt-1">
                                {inventory.filter(i => i.status === 'Low' || i.status === 'Critical' || i.status === 'Out').length} items require attention. Please restock soon to avoid service disruption.
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {inventory.filter(i => i.status === 'Low' || i.status === 'Critical' || i.status === 'Out').map(item => (
                                    <span key={item.id} className="inline-flex items-center px-3 py-1 bg-white rounded-lg text-xs font-medium text-orange-700">
                                        <Package className="w-3 h-3 mr-1" />
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
