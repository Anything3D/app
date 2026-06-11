import { create } from 'zustand';

export interface Product {
  id: string;
  sku: string;
  name: string;
  department: string;
  category: string;
  category2?: string;
  itemGroup?: string;
  machine?: string;
  productNature?: string;
  cost: number;
  stock: number;
  minStock: number;
  location: {
    aisle: string;
    rack: string;
    shelf: string;
    bin: string;
  };
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  user: string;
  date: string;
}

export interface Order {
  id: string;
  type: 'Procurement' | 'Return';
  productSku: string;
  quantity: number;
  status: 'Pending' | 'Received' | 'Processed';
  date: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Suspended';
  joinDate: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactEmail: string;
  phone: string;
  leadTimeDays: number;
  status: 'Active' | 'Inactive';
}

interface AppState {
  products: Product[];
  orders: Order[];
  suppliers: Supplier[];
  logs: ActivityLog[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateStock: (productId: string, quantity: number) => void;
  createOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  processOrder: (orderId: string) => void;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  addLog: (action: string, details: string) => void;
}

export const useStore = create<AppState>((set) => ({
  products: [
    {
      id: '1',
      sku: 'ABB-0001',
      name: 'Package wires on the robot - signal 25463 - ROBOFLEX',
      department: 'Spare Parts',
      category: 'Critical Spares',
      category2: 'Common',
      itemGroup: 'Critical Spares-CS',
      machine: 'ABB',
      productNature: 'wires',
      cost: 84.21,
      stock: 20,
      minStock: 10,
      location: { aisle: 'A1', rack: 'R2', shelf: 'S3', bin: 'B12' },
      status: 'In Stock',
    },
    {
      id: '2',
      sku: 'ABB-0002',
      name: 'Package wires on the robot - power supply 29692',
      department: 'Spare Parts',
      category: 'Critical Spares',
      category2: 'Common',
      itemGroup: 'Critical Spares-CS',
      machine: 'ABB',
      productNature: 'wires',
      cost: 76.19,
      stock: 2,
      minStock: 5,
      location: { aisle: 'A1', rack: 'R2', shelf: 'S3', bin: 'B13' },
      status: 'Low Stock',
    },
    {
      id: '3',
      sku: 'ABB-0003',
      name: 'Electrospindle ES350L - H6161H0485 - New',
      department: 'Spare Parts',
      category: 'Critical Spares',
      category2: 'Common',
      itemGroup: 'Critical Spares-CS',
      machine: 'ABB',
      productNature: 'Spindle',
      cost: 33284.66,
      stock: 1,
      minStock: 1,
      location: { aisle: 'S1', rack: 'R1', shelf: 'S1', bin: 'B01' },
      status: 'In Stock',
    },
  ],
  orders: [
    {
      id: 'o1',
      type: 'Procurement',
      productSku: 'OC-E800',
      quantity: 50,
      status: 'Pending',
      date: new Date().toISOString(),
    }
  ],
  suppliers: [
    {
      id: 's1',
      name: 'Global Furniture Co.',
      contactEmail: 'orders@globalfurniture.com',
      phone: '+1-555-0100',
      leadTimeDays: 14,
      status: 'Active'
    },
    {
      id: 's2',
      name: 'Techtronics Wholesale',
      contactEmail: 'sales@techtronics.com',
      phone: '+1-555-0200',
      leadTimeDays: 5,
      status: 'Active'
    }
  ],
  logs: [
    {
      id: 'l1',
      action: 'System Initialized',
      details: 'Started StoreSync Pro environment.',
      user: 'System',
      date: new Date().toISOString(),
    }
  ],

  addLog: (action, details) => set((state) => ({
    logs: [{
      id: Math.random().toString(36).substr(2, 9),
      action,
      details,
      user: 'Admin',
      date: new Date().toISOString()
    }, ...state.logs]
  })),

  addProduct: (product) => set((state) => {
    const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
    return {
      products: [...state.products, newProduct],
      logs: [{
        id: Math.random().toString(36).substr(2, 9),
        action: 'Added Product',
        details: `Created new product: ${product.name} (${product.sku})`,
        user: 'Admin',
        date: new Date().toISOString()
      }, ...state.logs]
    };
  }),

  updateStock: (productId, quantity) => set((state) => {
    let productName = '';
    const updatedProducts = state.products.map(p => {
      if (p.id === productId) {
        productName = p.name;
        const newStock = Math.max(0, p.stock + quantity);
        return { 
          ...p, 
          stock: newStock,
          status: newStock === 0 ? 'Out of Stock' : newStock < p.minStock ? 'Low Stock' : 'In Stock'
        };
      }
      return p;
    });

    return {
      products: updatedProducts,
      logs: [{
        id: Math.random().toString(36).substr(2, 9),
        action: 'Updated Stock',
        details: `Adjusted inventory for ${productName} by ${quantity > 0 ? '+' : ''}${quantity}`,
        user: 'Admin',
        date: new Date().toISOString()
      }, ...state.logs]
    };
  }),

  createOrder: (order) => set((state) => ({
    orders: [...state.orders, { ...order, id: Math.random().toString(36).substr(2, 9) }],
    logs: [{
      id: Math.random().toString(36).substr(2, 9),
      action: 'Created Order',
      details: `Generated ${order.type} order for ${order.quantity}x ${order.productSku}`,
      user: 'Admin',
      date: new Date().toISOString()
    }, ...state.logs]
  })),

  processOrder: (orderId) => set((state) => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order || order.status !== 'Pending') return state;

    let updatedProducts = state.products;
    if (order.type === 'Procurement' || order.type === 'Return') {
      updatedProducts = state.products.map(p => {
        if (p.sku === order.productSku) {
          const newStock = p.stock + order.quantity;
          return {
            ...p,
            stock: newStock,
            status: newStock === 0 ? 'Out of Stock' : newStock < p.minStock ? 'Low Stock' : 'In Stock'
          };
        }
        return p;
      });
    }

    return {
      products: updatedProducts,
      orders: state.orders.map(o => o.id === orderId ? { ...o, status: order.type === 'Procurement' ? 'Received' : 'Processed' } : o),
      logs: [{
        id: Math.random().toString(36).substr(2, 9),
        action: 'Processed Order',
        details: `Completed ${order.type} order for ${order.productSku}`,
        user: 'Admin',
        date: new Date().toISOString()
      }, ...state.logs]
    };
  }),

  addSupplier: (supplier) => set((state) => ({
    suppliers: [...state.suppliers, { ...supplier, id: Math.random().toString(36).substr(2, 9) }],
    logs: [{
      id: Math.random().toString(36).substr(2, 9),
      action: 'Added Supplier',
      details: `Registered new supplier: ${supplier.name}`,
      user: 'Admin',
      date: new Date().toISOString()
    }, ...state.logs]
  }))
}));
