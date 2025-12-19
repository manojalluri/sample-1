import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Copy,
    Trash2,
    Eye,
    EyeOff,
    ChevronDown,
    X,
    Upload,
    Image as ImageIcon,
    Minus
} from 'lucide-react';

const Products = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showProductForm, setShowProductForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    // Use state for products so we can add new ones
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Premium Goat Curry Cut',
            images: ['https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=100&h=100&fit=crop'],
            category: 'Goat',
            price: 650,
            stock: 45,
            status: 'Active',
            variants: [
                { name: '500g', price: 325, stock: 20 },
                { name: '1kg', price: 650, stock: 15 },
                { name: '2kg', price: 1300, stock: 10 }
            ]
        },
        {
            id: 2,
            name: 'Chicken Breast Boneless',
            images: ['https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=100&h=100&fit=crop'],
            category: 'Chicken',
            price: 280,
            stock: 120,
            status: 'Active',
            variants: [
                { name: '250g', price: 140, stock: 40 },
                { name: '500g', price: 280, stock: 50 },
                { name: '1kg', price: 560, stock: 30 }
            ]
        },
        {
            id: 3,
            name: 'Mutton Chops',
            images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop'],
            category: 'Mutton',
            price: 750,
            stock: 30,
            status: 'Active',
            variants: [
                { name: '500g', price: 375, stock: 15 },
                { name: '1kg', price: 750, stock: 15 }
            ]
        }
    ]);

    // Form state for new product
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Goat',
        price: '',
        stock: '',
        status: 'Active',
        variants: [],
        images: []
    });

    // Variant form state
    const [newVariant, setNewVariant] = useState({
        name: '',
        price: '',
        stock: ''
    });

    // Image preview state
    const [imagePreviews, setImagePreviews] = useState([]);

    const categories = ['All', 'Goat', 'Chicken', 'Mutton', 'Fish', 'Seafood'];
    const categoryOptions = ['Goat', 'Chicken', 'Mutton', 'Fish', 'Seafood'];
    const statuses = ['All', 'Active', 'Inactive'];

    const getStockStatus = (stock) => {
        if (stock === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-50' };
        if (stock < 15) return { text: 'Low Stock', color: 'text-orange-600 bg-orange-50' };
        return { text: 'In Stock', color: 'text-green-600 bg-green-50' };
    };

    const handleAddVariant = () => {
        if (!newVariant.name || !newVariant.price || !newVariant.stock) {
            alert('Please fill in all variant fields');
            return;
        }

        setNewProduct({
            ...newProduct,
            variants: [...newProduct.variants, { ...newVariant }]
        });

        setNewVariant({ name: '', price: '', stock: '' });
    };

    const handleRemoveVariant = (index) => {
        setNewProduct({
            ...newProduct,
            variants: newProduct.variants.filter((_, i) => i !== index)
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result]);
                setNewProduct(prev => ({
                    ...prev,
                    images: [...prev.images, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (index) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setNewProduct(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();

        // Validation
        if (!newProduct.name || !newProduct.price || !newProduct.stock) {
            alert('Please fill in all required fields');
            return;
        }

        if (newProduct.images.length === 0) {
            alert('Please upload at least one product image');
            return;
        }

        // Create new product with unique ID
        const productToAdd = {
            id: products.length + 1,
            name: newProduct.name,
            images: newProduct.images,
            category: newProduct.category,
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock),
            status: newProduct.status,
            variants: newProduct.variants
        };

        // Add to products list
        setProducts([...products, productToAdd]);

        // Reset form
        setNewProduct({
            name: '',
            category: 'Goat',
            price: '',
            stock: '',
            status: 'Active',
            variants: [],
            images: []
        });
        setImagePreviews([]);

        // Close modal
        setShowProductForm(false);

        // Success message
        alert('Product added successfully!');
    };

    const handleDeleteProduct = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                        <p className="text-gray-500 mt-1">Manage your product inventory</p>
                    </div>
                    <button
                        onClick={() => setShowProductForm(true)}
                        className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat} Category</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                        >
                            {statuses.map(status => (
                                <option key={status} value={status}>{status} Status</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variants</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {products.map((product) => {
                                const stockStatus = getStockStatus(product.stock);
                                return (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img src={product.images?.[0] || 'https://via.placeholder.com/100'} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                    <div className="text-xs text-gray-500">ID: #{product.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{product.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex text-xs px-2.5 py-1 rounded-full font-medium ${stockStatus.color}`}>
                                                {stockStatus.text} ({product.stock} kg)
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {product.variants && product.variants.length > 0
                                                ? product.variants.map(v => v.name).join(', ')
                                                : 'No variants'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex text-xs px-2.5 py-1 rounded-full font-medium ${product.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 1 to {products.length} of {products.length} products</p>
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

            {/* Add Product Modal */}
            {showProductForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg max-w-4xl w-full my-8">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                                <button
                                    onClick={() => {
                                        setShowProductForm(false);
                                        setImagePreviews([]);
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleAddProduct} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            {/* Basic Details */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900">Basic Details</h3>

                                {/* Product Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        placeholder="e.g., Premium Goat Curry Cut"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        required
                                    />
                                </div>

                                {/* Category, Price, Stock */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            {categoryOptions.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Base Price (₹) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            placeholder="e.g., 650"
                                            min="0"
                                            step="0.01"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Total Stock (kg) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={newProduct.stock}
                                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                            placeholder="e.g., 45"
                                            min="0"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        value={newProduct.status}
                                        onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            {/* Product Images */}
                            <div className="space-y-4 border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900">Product Images <span className="text-red-500">*</span></h3>

                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                    <div className="text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-4">
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                <span className="mt-2 block text-sm font-medium text-gray-900">
                                                    Upload product images
                                                </span>
                                                <span className="mt-1 block text-xs text-gray-500">
                                                    PNG, JPG, GIF up to 10MB each
                                                </span>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="sr-only"
                                                />
                                                <span className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                                    Choose Files
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Previews */}
                                {imagePreviews.length > 0 && (
                                    <div className="grid grid-cols-4 gap-4">
                                        {imagePreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Variants */}
                            <div className="space-y-4 border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900">Product Variants</h3>

                                {/* Add Variant Form */}
                                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <div className="grid grid-cols-4 gap-3">
                                        <div className="col-span-1">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Variant Name</label>
                                            <input
                                                type="text"
                                                value={newVariant.name}
                                                onChange={(e) => setNewVariant({ ...newVariant, name: e.target.value })}
                                                placeholder="e.g., 500g"
                                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Price (₹)</label>
                                            <input
                                                type="number"
                                                value={newVariant.price}
                                                onChange={(e) => setNewVariant({ ...newVariant, price: e.target.value })}
                                                placeholder="e.g., 325"
                                                min="0"
                                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-medium text-gray-700 mb-1">Stock</label>
                                            <input
                                                type="number"
                                                value={newVariant.stock}
                                                onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
                                                placeholder="e.g., 20"
                                                min="0"
                                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                        </div>
                                        <div className="col-span-1 flex items-end">
                                            <button
                                                type="button"
                                                onClick={handleAddVariant}
                                                className="w-full px-3 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                                            >
                                                Add Variant
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Variants List */}
                                {newProduct.variants.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-700">Added Variants ({newProduct.variants.length})</p>
                                        <div className="space-y-2">
                                            {newProduct.variants.map((variant, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-sm font-medium text-gray-900">{variant.name}</span>
                                                        <span className="text-sm text-gray-600">₹{variant.price}</span>
                                                        <span className="text-sm text-gray-600">Stock: {variant.stock}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveVariant(index)}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </form>

                        {/* Action Buttons */}
                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowProductForm(false);
                                    setImagePreviews([]);
                                }}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddProduct}
                                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                Save Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
