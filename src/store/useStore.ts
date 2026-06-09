import { create } from 'zustand';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  location: {
    storeId: string;
    aisle: string;
    rack: string;
    shelf: string;
    bin: string;
  };
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  manager: string;
  status: 'Active' | 'Maintenance';
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
  stores: StoreLocation[];
  orders: Order[];
  suppliers: Supplier[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateStock: (productId: string, quantity: number) => void;
  updateStoreStock: (storeId: string, productId: string, quantity: number) => void;
  addStore: (store: Omit<StoreLocation, 'id'>) => void;
  createOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  processOrder: (orderId: string) => void;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
}

export const useStore = create<AppState>((set) => ({
  products: [
    {
      id: '1',
      sku: 'OC-E800',
      name: 'Office Chair Ergonomic',
      category: 'Furniture',
      stock: 45,
      minStock: 10,
      price: 299.99,
      location: { storeId: 's1', aisle: 'A1', rack: 'R2', shelf: 'S3', bin: 'B12' },
      status: 'In Stock',
    },
    {
      id: '2',
      sku: 'WH-1000XM4',
      name: 'Premium Wireless Headphones',
      category: 'Electronics',
      stock: 2,
      minStock: 5,
      price: 199.50,
      location: { storeId: 's1', aisle: 'C4', rack: 'R1', shelf: 'S1', bin: 'B01' },
      status: 'Low Stock',
    },
    {
      id: '3',
      sku: 'SD-P200',
      name: 'Standing Desk Pro',
      category: 'Furniture',
      stock: 12,
      minStock: 15,
      price: 599.99,
      location: { storeId: 's2', aisle: 'A2', rack: 'R5', shelf: 'S2', bin: 'B44' },
      status: 'In Stock',
    },
  ],
  stores: [
    {
      id: 's1',
      name: 'Downtown Flagship',
      address: '123 Main St, New York, NY 10001',
      manager: 'Sarah Jenkins',
      status: 'Active',
    },
    {
      id: 's2',
      name: 'Westside Branch',
      address: '456 West Ave, Los Angeles, CA 90015',
      manager: 'David Chen',
      status: 'Active',
    },
    {
      id: 's3',
      name: 'Central Warehouse',
      address: '789 Industrial Pkwy, Chicago, IL 60601',
      manager: 'Mike Roberts',
      status: 'Maintenance',
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

  addProduct: (product) => set((state) => ({
    products: [...state.products, { ...product, id: Math.random().toString(36).substr(2, 9) }]
  })),

  updateStock: (productId, quantity) => set((state) => ({
    products: state.products.map(p => {
      if (p.id === productId) {
        const newStock = Math.max(0, p.stock + quantity);
        return { 
          ...p, 
          stock: newStock,
            status: newStock === 0 ? 'Out of Stock' : newStock < p.minStock ? 'Low Stock' : 'In Stock'
        };
      }
      return p;
    })
  })),

  addStore: (store) => set((state) => ({
    stores: [...state.stores, { ...store, id: Math.random().toString(36).substr(2, 9) }]
  })),

  createOrder: (order) => set((state) => ({
    orders: [...state.orders, { ...order, id: Math.random().toString(36).substr(2, 9) }]
  })),

  processOrder: (orderId) => set((state) => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order || order.status !== 'Pending') return state;

    // Also update inventory if it's procurement or return to stock
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
      orders: state.orders.map(o => o.id === orderId ? { ...o, status: order.type === 'Procurement' ? 'Received' : 'Processed' } : o)
    };
  }),

  addSupplier: (supplier) => set((state) => ({
    suppliers: [...state.suppliers, { ...supplier, id: Math.random().toString(36).substr(2, 9) }]
  }))
}));
