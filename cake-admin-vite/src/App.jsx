import { useEffect, useMemo, useState } from "react";
import {
  getCustomers,
  addCustomer as addCustomerAPI,
  updateCustomer as updateCustomerAPI,
  deleteCustomer as deleteCustomerAPI,
} from "./services/customerService";
import {
  getOrders,
  addOrder,
  updateOrder as updateOrderAPI,
  deleteOrder,
} from "./services/orderService";
import {
  getCakes,
  addCake as addCakeAPI,
  updateCake as updateCakeAPI,
  deleteCake as deleteCakeAPI,
} from "./services/cakeService";

import {
  Cake, LayoutDashboard, ShoppingBag, Users, Palette, Tags, Settings,
  Search, Bell, Menu, ChevronDown, CalendarDays, TrendingUp, Clock3,
  ArrowUpRight, ArrowRight, Plus, Eye, Pencil, Trash2, Package,
  CircleCheck, CircleAlert, Sparkles, LogOut, X, Filter, MoreHorizontal
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";

const initialCakes = [
  { id: "CK-101", name: "Red Velvet", category: "Classic", flavour: "Red Velvet", price: 1250, stock: 2, status: "Low Stock", color: "red", emoji: "🍰" },
  { id: "CK-102", name: "Dark Chocolate", category: "Chocolate", flavour: "Dark Chocolate", price: 980, stock: 3, status: "Low Stock", color: "chocolate", emoji: "🍫" },
  { id: "CK-103", name: "Black Forest", category: "Classic", flavour: "Chocolate & Cherry", price: 1450, stock: 5, status: "Available", color: "forest", emoji: "🍒" },
  { id: "CK-104", name: "Butterscotch", category: "Classic", flavour: "Butterscotch", price: 1100, stock: 6, status: "Available", color: "butter", emoji: "🍮" },
  { id: "CK-105", name: "Strawberry Dream", category: "Fruit", flavour: "Strawberry", price: 1350, stock: 12, status: "Available", color: "strawberry", emoji: "🍓" },
];
const initialOrders = [
  { id: "#1024", customer: "Priya S", items: "Strawberry Dream · 1 kg", amount: 1250, status: "Pending", date: "18 Sep, 10:24 AM" },
  { id: "#1023", customer: "Arjun", items: "Dark Chocolate · ½ kg", amount: 850, status: "Preparing", date: "17 Sep, 06:42 PM" },
  { id: "#1022", customer: "Sneha", items: "Black Forest · 1 kg", amount: 1780, status: "Delivered", date: "17 Sep, 02:15 PM" },
  { id: "#1021", customer: "Divya", items: "Red Velvet · 1 kg", amount: 1450, status: "Pending", date: "16 Sep, 11:30 AM" },
  { id: "#1020", customer: "Karthik", items: "Custom Birthday Cake", amount: 2300, status: "Delivered", date: "15 Sep, 07:20 PM" },
];

const sales = [
  { day: "12 Sep", sales: 5 }, { day: "13 Sep", sales: 8 }, { day: "14 Sep", sales: 7.5 },
  { day: "15 Sep", sales: 10 }, { day: "16 Sep", sales: 15 }, { day: "17 Sep", sales: 15.5 },
  { day: "18 Sep", sales: 21 },
];
const nav = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Cake Management", icon: Cake },
  { name: "Order Management", icon: ShoppingBag },
  { name: "Customer Management", icon: Users },
  { name: "Custom Cake Requests", icon: Palette },
  { name: "Categories", icon: Package },
  { name: "Offers / Coupons", icon: Tags },
  { name: "Settings", icon: Settings },
];

function money(n) { return "₹" + Number(n).toLocaleString("en-IN"); }
function Status({ value }) {
  const cls = value.toLowerCase().replaceAll(" ", "-");
  return <span className={`status ${cls}`}>{value}</span>;
}
function SectionTitle({ title, subtitle, action, onAction }) {
  return <div className="section-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button className="text-action" onClick={onAction}>{action} <ArrowRight size={15}/></button>}</div>;
}
function Empty({ text }) { return <div className="empty-state"><Sparkles size={25}/><p>{text}</p></div>; }
console.log("APP JSX LOADED");
export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cakes, setCakes] = useState([]);
  const [cakeLoading, setCakeLoading] = useState(true);
 const [orders, setOrders] = useState([]);
const [ordersLoading, setOrdersLoading] = useState(true);
  const [showCakeForm, setShowCakeForm] = useState(false);
  const [editingCake, setEditingCake] = useState(null);
  const [cakeForm, setCakeForm] = useState({ name: "", category: "Classic", flavour: "", price: "", stock: "10" });
  const [toast, setToast] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
const [customerForm, setCustomerForm] = useState({
  name: "",
  email: "",
});
const [customerSaving, setCustomerSaving] = useState(false);
const [showOrderForm, setShowOrderForm] = useState(false);
const [editingOrder, setEditingOrder] = useState(null);

const [orderForm, setOrderForm] = useState({
  customerName: "",
  cakeName: "",
  quantity: 1,
  amount: "",
  status: "Pending",
});



function handleEditOrder(order) {
  setEditingOrder(order);

  setOrderForm({
    customerName: order.customer,
    cakeName: order.items,
    amount: order.amount,
    status: order.status,
  });

  setShowOrderForm(true);
}

async function handleSaveCustomer(e) {
  e.preventDefault();

  if (editingCustomer) {
    await handleUpdateCustomer(editingCustomer.id, customerForm);
  } else {
    await handleAddCustomer(e);
  }
}


async function handleAddCustomer(e) {
  e.preventDefault();

  try {
    setCustomerSaving(true);

    const savedCustomer = await addCustomerAPI({
      name: customerForm.name.trim(),
      email: customerForm.email.trim(),
      lastOrder: "",
    });

    setCustomers((old) => [
      ...old,
      {
        ...savedCustomer,
        last: savedCustomer.lastOrder || "No orders yet",
        avatar: "👤",
      },
    ]);

    setCustomerForm({ name: "", email: "" });
    setShowCustomerForm(false);
    alert("Customer added successfully!");
  } catch (error) {
    console.error("Add customer error:", error);
    alert(error.message || "Unable to add customer");
  } finally {
    setCustomerSaving(false);
  }
}


async function handleUpdateCustomer(id, customer) {
  try {
    const updatedCustomer = await updateCustomerAPI(id, {
      name: customer.name.trim(),
      email: customer.email.trim(),
      lastOrder: customer.lastOrder || "",
    });

    setCustomers((old) =>
      old.map((c) =>
        c.id === id
          ? {
              ...updatedCustomer,
              last: updatedCustomer.lastOrder || "No orders yet",
              avatar: c.avatar || "👤",
            }
          : c
      )
    );

    alert("Customer updated successfully!");
  } catch (error) {
    console.error("Update customer error:", error);
    alert(error.message || "Unable to update customer");
  }
}

async function handleDeleteCustomer(id) {
  if (!window.confirm("Are you sure you want to delete this customer?")) {
    return;
  }

  try {
    await deleteCustomerAPI(id);
    setCustomers((old) => old.filter((c) => c.id !== id));
    alert("Customer deleted successfully!");
  } catch (error) {
    console.error("Delete customer error:", error);
    alert(error.message || "Unable to delete customer");
  }
}



  useEffect(() => {
  async function loadCustomers() {
    try {
      const data = await getCustomers();

      setCustomers(
        data.map((customer) => ({
          ...customer,
          last: customer.lastOrder || "No orders yet",
          avatar: "👤",
        }))
      );
    } catch (error) {
      console.error("Failed to load customers:", error);
    }
  }

  loadCustomers();
}, []);


useEffect(() => {
  let cancelled = false;

  async function loadDashboardData() {
    try {
      const [cakeResult, orderResult] = await Promise.all([
        getCakes(),
        getOrders(),
      ]);

      if (cancelled) return;

      // Load Cakes
      const cakeList = Array.isArray(cakeResult) ? cakeResult : [];

      setCakes(
        cakeList.map((c) => {
          const stock = Number(
            c.stock ?? c.stockQuantity ?? c.quantity ?? 0
          );

          return {
            ...c,
            id: c.id ?? c.cakeId,
            name: c.name ?? c.cakeName ?? "Unnamed Cake",
            category: c.category ?? "Classic",
            flavour: c.flavour ?? c.flavor ?? "",
            price: Number(c.price ?? c.basePrice ?? 0),
            stock,
            status: stock < 5 ? "Low Stock" : "Available",
            color: c.color ?? "strawberry",
            emoji: c.emoji ?? "🎂",
          };
        })
      );

      // Load Orders
      const orderList = Array.isArray(orderResult) ? orderResult : [];

      setOrders(
        orderList.map((o) => ({
          ...o,
          backendId: o.id ?? o.orderId,
          id: `#${o.id ?? o.orderId}`,
          customer:
            o.customer ??
            o.customerName ??
            o.customer?.name ??
            "Customer",
          items: o.items ?? o.cakeName ?? o.description ?? "Cake order",
          amount: Number(
            o.amount ?? o.totalAmount ?? o.totalPrice ?? 0
          ),
          status: o.status ?? "Pending",
          date: o.orderDate ?? o.date ?? o.createdAt ?? "-",
        }))
      );
    } catch (error) {
      console.error("Dashboard loading error:", error);
      notify("Unable to load dashboard data. Check backend connection.");
    } finally {
      if (!cancelled) {
        setCakeLoading(false);
        setOrdersLoading(false);
      }
    }
  }

  loadDashboardData();

  return () => {
    cancelled = true;
  };
}, []);

  

useEffect(() => {
  async function loadOrders() {
    try {
      const data = await getOrders();

      setOrders(
        data.map((order) => ({
          ...order,
          backendId: order.id,
          id: `#${order.id}`,
          date: order.orderDate || "-",
        }))
      );
    } catch (error) {
      console.error("Load orders error:", error);
      notify("Unable to load orders. Check backend connection.");
    } finally {
      setOrdersLoading(false);
    }
  }

  loadOrders();
}, []);


  useEffect(() => {
    async function loadCakes() {
      try {
        const data = await getCakes();

        setCakes(
          data.map((cake) => ({
            ...cake,
            backendId: cake.id,
            id: cake.id,
            category: "Classic",
            stock: cake.quantity,
            status: cake.quantity < 5 ? "Low Stock" : "Available",
            color: "strawberry",
            emoji: "🎂",
          }))
        );
      } catch (error) {
        console.error(error);
        notify("Unable to load cakes. Check backend connection.");
      } finally {
        setCakeLoading(false);
      }
    }

    loadCakes();
  }, []);


  const filteredCakes = useMemo(() => cakes.filter(c => `${c.name} ${c.category} ${c.flavour}`.toLowerCase().includes(search.toLowerCase())), [cakes, search]);
  const filteredOrders = useMemo(() => orders.filter(o => `${o.id} ${o.customer} ${o.status}`.toLowerCase().includes(search.toLowerCase())), [orders, search]);

  function notify(msg) { setToast(msg); window.setTimeout(() => setToast(""), 2600); }
  function go(name) { setPage(name); setSearch(""); setMobileOpen(false); }
  function openAddCake() { setEditingCake(null); setCakeForm({ name: "", category: "Classic", flavour: "", price: "", stock: "10" }); setShowCakeForm(true); }
  function openEditCake(cake) { setEditingCake(cake); setCakeForm({ name: cake.name, category: cake.category, flavour: cake.flavour, price: String(cake.price), stock: String(cake.stock) }); setShowCakeForm(true); }
  async function saveCake(e) {
  e.preventDefault();

  const payload = {
    name: cakeForm.name.trim(),
    flavour: cakeForm.flavour.trim(),
    price: Number(cakeForm.price),
    quantity: Number(cakeForm.stock),
  };

  try {
    const savedCake = editingCake
      ? await updateCakeAPI(editingCake.id, payload)
      : await addCakeAPI(payload);

    const item = {
      ...editingCake,
      id: savedCake.id,
      name: savedCake.name,
      flavour: savedCake.flavour,
      price: Number(savedCake.price),
      stock: Number(savedCake.quantity),
      category: editingCake?.category || cakeForm.category,
      status:
        Number(savedCake.quantity) < 5
          ? "Low Stock"
          : "Available",
      emoji: editingCake?.emoji || "🎂",
      color: editingCake?.color || "strawberry",
    };

    setCakes((old) =>
      editingCake
        ? old.map((c) =>
            String(c.id) === String(item.id) ? item : c
          )
        : [item, ...old]
    );

    setShowCakeForm(false);
    notify(
      editingCake
        ? "Cake updated successfully!"
        : "Cake added successfully!"
    );
  } catch (error) {
    console.error("Save cake error:", error);
    notify(error.message || "Unable to save cake");
  }
}




  async function deleteCake(id) {
  if (!window.confirm("Are you sure you want to delete this cake?")) {
    return;
  }

  try {
    await deleteCakeAPI(id);

    setCakes((old) =>
      old.filter((c) => String(c.id) !== String(id))
    );

    notify("Cake deleted successfully!");
  } catch (error) {
    console.error("Delete cake error:", error);
    notify(error.message || "Unable to delete cake");
  }
}
  
async function updateOrder(id, status) {
  const order = orders.find((o) => o.id === id);

  if (!order) {
    notify("Order not found");
    return;
  }

  try {
    const orderData = {
      customer: order.customer,
      items: order.items,
      amount: Number(order.amount),
      status: status,
      orderDate: order.orderDate || order.date || "",

      deliveryAddress: order.deliveryAddress || "",
      city: order.city || "",
      pincode: order.pincode || "",
      phone: order.phone || "",
      paymentMethod: order.paymentMethod || "",
      instructions: order.instructions || "",
    };

    await updateOrderAPI(order.backendId, orderData);

    setOrders((oldOrders) =>
      oldOrders.map((o) =>
        o.backendId === order.backendId
          ? { ...o, ...orderData }
          : o
      )
    );

    notify("Order status updated successfully!");
  } catch (error) {
    console.error("Update order error:", error);
    notify("Failed to update order status");
  }
}


async function handleAddOrder(e) {
  e.preventDefault();

  try {
    const orderData = {
      customer: orderForm.customerName.trim(),
      items: orderForm.cakeName.trim(),
      amount: Number(orderForm.amount),
      status: orderForm.status,
      orderDate: editingOrder
        ? editingOrder.orderDate || editingOrder.date
        : new Date().toISOString().slice(0, 10),

      deliveryAddress: editingOrder?.deliveryAddress || "",
      city: editingOrder?.city || "",
      pincode: editingOrder?.pincode || "",
      phone: editingOrder?.phone || "",
      paymentMethod: editingOrder?.paymentMethod || "",
      instructions: editingOrder?.instructions || "",
    };

    if (editingOrder) {
      const savedOrder = await updateOrderAPI(
        editingOrder.backendId,
        orderData
      );

      setOrders((oldOrders) =>
        oldOrders.map((o) =>
          o.backendId === editingOrder.backendId
            ? {
                ...o,
                ...savedOrder,
                backendId: savedOrder.id,
                id: `#${savedOrder.id}`,
                date: savedOrder.orderDate || "-",
              }
            : o
        )
      );

      notify("Order updated successfully!");
    } else {
      const savedOrder = await addOrder(orderData);

      setOrders((oldOrders) => [
        ...oldOrders,
        {
          ...savedOrder,
          backendId: savedOrder.id,
          id: `#${savedOrder.id}`,
          date: savedOrder.orderDate || "-",
        },
      ]);

      notify("Order added successfully!");
    }

    setShowOrderForm(false);
    setEditingOrder(null);

    setOrderForm({
      customerName: "",
      cakeName: "",
      quantity: 1,
      amount: "",
      status: "Pending",
    });
  } catch (error) {
    console.error("Save order error:", error);
    notify(error.message || "Unable to save order");
  }
}



async function handleDeleteOrder(id) {
  const order = orders.find((o) => o.id === id);

  if (!order) {
    notify("Order not found");
    return;
  }

  const confirmed = window.confirm(
    `Delete order ${order.id}?`
  );

  if (!confirmed) return;

  try {
    await deleteOrder(order.backendId);

    setOrders((oldOrders) =>
      oldOrders.filter((o) => o.id !== id)
    );

    notify("Order deleted successfully!");
  } catch (error) {
    console.error("Delete order error:", error);
    notify("Failed to delete order");
  }
}

  const activeNav = nav.find(n => n.name === page);
  const pageTitle = page === "Dashboard" ? "Dashboard" : page;
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="brand"><div className="brand-mark"><Cake size={31}/><span>♥</span></div><div><b>SweetCake</b><small>Admin Panel</small></div><button className="close-nav" onClick={() => setMobileOpen(false)}><X/></button></div>
      <div className="nav-label">WORKSPACE</div>
      <nav>{nav.map(item => { const Icon = item.icon; return <button key={item.name} className={`nav-item ${page === item.name ? "active" : ""}`} onClick={() => go(item.name)}><Icon size={19}/><span>{item.name}</span>{item.name === "Order Management" && <i className="nav-count">5</i>}</button>; })}</nav>
      <div className="sidebar-bottom"><div className="side-cake">🎂</div><strong>Good Things<br/>Are Always Sweet</strong><span>Made with love ♡</span></div>
      <div className="sidebar-profile"><div className="avatar admin-avatar">A</div><div><b>Admin</b><small>Super Admin</small></div><ChevronDown size={16}/></div>
    </aside>

    <main className="main-area">
      <header className="topbar">
        <button className="menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation"><Menu/></button>
        <div className="global-search"><Search size={18}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cakes, orders, customers..."/><kbd>⌕</kbd></div>
        <div className="top-actions"><button className="icon-button notification" onClick={() => notify("You have 3 sample notifications")} aria-label="Notifications"><Bell size={19}/><i>3</i></button><div className="top-user"><div className="avatar">A</div><div><b>Admin</b><small>Super Admin</small></div><ChevronDown size={15}/></div></div>
      </header>

      <div className="page-content">
        {page === "Dashboard" ? <>
          <section className="welcome-banner"><div className="welcome-copy"><span className="eyebrow">YOUR BAKERY AT A GLANCE</span><h1>Good Morning,<br/><strong>Admin!</strong> <span className="wave">👋</span></h1><p>Here's what's happening with your cake business today.</p><div className="date-line"><CalendarDays size={16}/> Thursday, 18 September 2026</div></div><div className="banner-cake">🎂<span>Make Life<br/>Sweeter! ♡</span><i>✦</i></div><div className="banner-sparkle">✧</div></section>
          <div className="stats-grid">
  <StatCard
    label="Total Cakes"
    value={cakes.length}
    trend="Cakes in database"
    icon={Cake}
    tone="pink"
  />

  <StatCard
    label="Total Orders"
    value={orders.length}
    trend="All orders"
    icon={ShoppingBag}
    tone="blue"
  />

  <StatCard
    label="Pending Orders"
    value={orders.filter(o => o.status === "Pending").length}
    trend="Needs attention"
    icon={Clock3}
    tone="yellow"
  />

<StatCard
  label="Total Customers"
  value={new Set(customers.map(c => c.email).filter(Boolean)).size}
  trend="Registered customers"
  icon={Users}
  tone="purple"
/>
</div>
          <div className="main-grid">
            <section className="panel sales-panel"><SectionTitle title="Sales Overview" subtitle="Your sales performance this week"/><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={sales} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}><defs><linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f0449c" stopOpacity={0.2}/><stop offset="100%" stopColor="#f0449c" stopOpacity={0.015}/></linearGradient></defs><CartesianGrid stroke="#edf0f8" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#71809f", fontSize: 11 }}/><YAxis axisLine={false} tickLine={false} tick={{ fill: "#71809f", fontSize: 11 }}/><Tooltip formatter={v => [`${v} orders`, "Activity"]}/><Area type="monotone" dataKey="sales" stroke="#f0449c" strokeWidth={2.5} fill="url(#salesFill)" activeDot={{ r: 5 }}/></AreaChart></ResponsiveContainer></div><div className="chart-foot"><span><i className="legend-dot"/> Order activity</span><span className="chart-growth"><TrendingUp size={15}/> Trending up this week</span></div></section>
            <section className="panel orders-panel"><SectionTitle title="Recent Orders" subtitle="Keep track of your latest orders" action="View all" onAction={() => go("Order Management")}/><OrdersTable orders={orders.slice(0,5)} compact onStatus={updateOrder}/></section>
          </div>
          <div className="bottom-grid">
            <section className="panel stock-panel"><SectionTitle title="Low Stock Cakes" subtitle="Restock these popular treats" action="Manage cakes" onAction={() => go("Cake Management")}/><div className="stock-list">{cakes.filter(c => c.stock < 7).slice(0,4).map(c => <div className="stock-row" key={c.id}><div className={`mini-cake ${c.color}`}>{c.emoji}</div><div className="stock-name"><b>{c.name}</b><small>{c.category}</small></div><span className="stock-number">{c.stock} left</span><Status value="Low Stock"/></div>)}</div></section>
            <section className="panel quick-panel"><SectionTitle title="Quick Actions" subtitle="Get things done faster"/><div className="quick-grid"><QuickAction icon={Cake} label="Add New Cake" tone="pink" onClick={openAddCake}/><QuickAction icon={ShoppingBag} label="View Orders" tone="blue" onClick={() => go("Order Management")}/><QuickAction icon={Users} label="Customers" tone="purple" onClick={() => go("Customer Management")}/><QuickAction icon={Tags} label="Manage Offers" tone="green" onClick={() => go("Offers / Coupons")}/></div></section>
            <section className="panel customers-panel"><SectionTitle title="Recent Customers" subtitle="Your lovely customers" action="View all" onAction={() => go("Customer Management")}/><CustomerTable customers={customers.slice(0,4)}/></section>
          </div>
        </> : page === "Cake Management" ? <CakePage cakes={filteredCakes} onAdd={openAddCake} onEdit={openEditCake} onDelete={deleteCake}/> :
        page === "Order Management" ? (


<OrdersPage
  orders={filteredOrders}
  onStatus={updateOrder}
  onDelete={handleDeleteOrder}
  onAdd={() => setShowOrderForm(true)}
  showOrderForm={showOrderForm}
  setShowOrderForm={setShowOrderForm}
  orderForm={orderForm}
  setOrderForm={setOrderForm}
  onSaveOrder={handleAddOrder}
  onEdit={handleEditOrder}
  editingOrder={editingOrder}
/>


) :
        
page === "Customer Management" ? (
  
  <CustomerPage
    customers={customers}
    onAdd={() => setShowCustomerForm(true)}
    customerForm={customerForm}
    setCustomerForm={setCustomerForm}
    showCustomerForm={showCustomerForm}
    setShowCustomerForm={setShowCustomerForm}
    onSave={handleSaveCustomer}
    customerSaving={customerSaving}
     onEditCustomer={handleUpdateCustomer}
onDeleteCustomer={handleDeleteCustomer}
editingCustomer={editingCustomer}
setEditingCustomer={setEditingCustomer}
  />
) :

        page === "Custom Cake Requests" ? <RequestsPage notify={notify}/> :
        page === "Categories" ? <CategoriesPage notify={notify}/> :
        page === "Offers / Coupons" ? <OffersPage notify={notify}/> :
        <SettingsPage notify={notify}/>}
        <footer className="footer"><span>© 2026 SweetCake Admin Panel</span><span>Made with <b>♥</b> for sweet moments</span><span className="demo-note">Connected to PostgreSQL</span></footer>
      </div>
    </main>

    {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu"/>}
    {toast && <div className="toast"><CircleCheck size={18}/>{toast}</div>}
    {showCakeForm && <div className="modal-backdrop" onClick={() => setShowCakeForm(false)}><div className="modal-card" onClick={e => e.stopPropagation()}><div className="modal-heading"><div><span className="eyebrow">CAKE CATALOGUE</span><h2>{editingCake ? "Edit Cake" : "Add New Cake"}</h2></div><button className="icon-button" onClick={() => setShowCakeForm(false)}><X/></button></div><form onSubmit={saveCake} className="cake-form"><label>Cake name<input required value={cakeForm.name} onChange={e => setCakeForm({...cakeForm, name:e.target.value})} placeholder="e.g. Strawberry Dream"/></label><div className="form-two"><label>Category<select value={cakeForm.category} onChange={e => setCakeForm({...cakeForm, category:e.target.value})}><option>Classic</option><option>Chocolate</option><option>Fruit</option><option>Custom</option><option>Celebration</option></select></label><label>Flavour<input value={cakeForm.flavour} onChange={e => setCakeForm({...cakeForm, flavour:e.target.value})} placeholder="e.g. Vanilla"/></label></div><div className="form-two"><label>Price (₹)<input required min="1" type="number" value={cakeForm.price} onChange={e => setCakeForm({...cakeForm, price:e.target.value})} placeholder="1200"/></label><label>Stock quantity<input required min="0" type="number" value={cakeForm.stock} onChange={e => setCakeForm({...cakeForm, stock:e.target.value})} placeholder="10"/></label></div><p className="form-hint"><CircleAlert size={15}/> Cake details will be saved to the database.</p><div className="modal-actions"><button type="button" className="btn-light" onClick={() => setShowCakeForm(false)}>Cancel</button><button className="btn-primary" type="submit">{editingCake ? "Save Changes" : "Add Cake"}</button></div></form></div></div>}
  </div>;}

function StatCard({ label, value, trend, icon: Icon, tone }) { return <div className={`stat-card ${tone}`}><div className="stat-top"><div className="stat-icon"><Icon size={23}/></div><span>{label}</span><button className="stat-more" aria-label={`${label} info`}><MoreHorizontal size={18}/></button></div><div className="stat-value">{value}</div><div className="stat-trend"><ArrowUpRight size={15}/>{trend}</div></div>; }
function QuickAction({ icon: Icon, label, tone, onClick }) { return <button className={`quick-action ${tone}`} onClick={onClick}><span><Icon size={23}/></span><b>{label}</b><ArrowRight size={15} className="quick-arrow"/></button>; }

 function OrdersTable({ orders, compact, onStatus, onDelete, onEdit  }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            {!compact && <th>Items</th>}
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            {!compact && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
  {orders.map((o, index) => (
    <tr key={o.backendId ?? o.id}>
     <td className="order-id">{index + 1}</td>
              <td>{o.customer}</td>

              {!compact && <td>{o.items}</td>}

              <td className="amount">{money(o.amount)}</td>

              <td>
                {compact ? (
                  <Status value={o.status} />
                ) : (
                  <select
                    className="status-select"
                    value={o.status}
                    onChange={(e) => onStatus(o.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Preparing</option>
                    <option>Ready</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                )}
              </td>

              <td className="date-cell">{o.date}</td>

              {!compact && (
  <td>
    <div className="row-actions">
      <button
        className="btn-mini"
        onClick={() => onEdit(o)}
      >
        Edit
      </button>

      <button
        className="btn-mini"
        onClick={() => onDelete(o.id)}
        aria-label={`Delete order ${o.id}`}
      >
        <Trash2 size={16} /> Delete
      </button>
    </div>
  </td>
)}
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <Empty text="No orders match your search." />
      )}
    </div>
  );
}
function CustomerTable({ customers, onEdit, onDelete }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Last Order</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>
                <span className="customer-name">
                  <span className="customer-avatar">
                    {c.avatar || "👤"}
                  </span>
                  {c.name}
                </span>
              </td>

              <td>{c.email}</td>
              <td>{c.last || "No orders yet"}</td>

              <td>
                <button
                  type="button"
                  className="btn-light"
                  onClick={() => onEdit(c)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => onDelete(c.id)}
                  style={{ marginLeft: "8px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {customers.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function CakePage({ cakes, onAdd, onEdit, onDelete }) { return <><div className="page-heading"><div><span className="eyebrow">PRODUCT CATALOGUE</span><h1>Cake Management <span>🎂</span></h1><p>Manage your sweet creations, pricing and availability.</p></div><button className="btn-primary" onClick={onAdd}><Plus size={17}/> Add New Cake</button></div><div className="page-stats"><div><span>Total Cakes</span><b>{cakes.length}</b></div><div><span>Available</span><b>{cakes.filter(c=>c.stock>=5).length}</b></div><div><span>Low Stock</span><b className="pink-text">{cakes.filter(c=>c.stock<5).length}</b></div></div><section className="panel page-panel"><SectionTitle title="All Cakes" subtitle={`${cakes.length} cakes in this demo catalogue`}/><div className="table-scroll"><table><thead><tr><th>Cake</th><th>Category</th><th>Flavour</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{cakes.map(c=><tr key={c.id}><td><span className="cake-cell"><span className={`mini-cake ${c.color}`}>{c.emoji}</span><span><b>{c.name}</b><small>{c.id}</small></span></span></td><td>{c.category}</td><td>{c.flavour}</td><td className="amount">{money(c.price)}</td><td>{c.stock}</td><td><Status value={c.stock<5?"Low Stock":"Available"}/></td><td><div className="row-actions"><button onClick={()=>onEdit(c)} aria-label="Edit cake"><Pencil size={16}/></button><button onClick={()=>onDelete(c.id)} aria-label="Delete cake"><Trash2 size={16}/></button></div></td></tr>)}</tbody></table>{cakes.length===0 && <Empty text="No cakes found. Add your first cake!"/>}</div></section></>; }

function OrdersPage({ orders, onStatus, onDelete, onAdd, onEdit, editingOrder,showOrderForm,
  setShowOrderForm,
  orderForm,
  setOrderForm,
  onSaveOrder, }) {
  return (
    <>


{showOrderForm && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h2>{editingOrder ? "Edit Order" : "Add New Order"}</h2>
      <p>Enter the customer and cake order details.</p>
<form
  onSubmit={(e) => {
    e.preventDefault();
    console.log("ORDER FORM SUBMITTED");
    console.log("ON SAVE ORDER:", onSaveOrder);
    onSaveOrder(e);
  }}
>
  <label>Customer Name</label>
  <input
    type="text"
    value={orderForm.customerName}
    onChange={(e) =>
      setOrderForm({
        ...orderForm,
        customerName: e.target.value,
      })
    }
    placeholder="Enter customer name"
    required
  />

  <label>Cake Name</label>
  <input
    type="text"
    value={orderForm.cakeName}
    onChange={(e) =>
      setOrderForm({
        ...orderForm,
        cakeName: e.target.value,
      })
    }
    placeholder="Enter cake name"
    required
  />

  <label>Amount (₹)</label>
  <input
    type="number"
    min="1"
    value={orderForm.amount}
    onChange={(e) =>
      setOrderForm({
        ...orderForm,
        amount: e.target.value,
      })
    }
    placeholder="Enter amount"
    required
  />

  <label>Order Status</label>
  <select
    value={orderForm.status}
    onChange={(e) =>
      setOrderForm({
        ...orderForm,
        status: e.target.value,
      })
    }
  >
    <option value="Pending">Pending</option>
    <option value="Preparing">Preparing</option>
    <option value="Delivered">Delivered</option>
  </select>

  <div className="row-actions">
    <button
      type="button"
      className="btn-light"
      onClick={() => setShowOrderForm(false)}
    >
      Cancel
    </button>

    <button type="submit" className="btn-primary">
      {editingOrder ? "Save Changes" : "Save Order"}
    </button>
  </div>
</form>   
</div>
  </div>
)}

      <div className="page-heading">
        <div>
          <span className="eyebrow">SALES & FULFILMENT</span>
          <h1>
            Order Management <span>🛍️</span>
          </h1>
          <p>View customer orders and keep every cake on schedule.</p>
        </div>

        <div className="row-actions">
          <button
  className="btn-light"
  onClick={() => window.print()}
>
  <Filter size={16} /> Print / Export
</button>

<button className="btn-primary" onClick={onAdd}>
  <Plus size={17} /> Add Order
</button>
        </div>
      </div>

      <div className="page-stats">
        <div>
          <span>Showing Orders</span>
          <b>{orders.length}</b>
        </div>
        <div>
          <span>Pending</span>
          <b>{orders.filter(o => o.status === "Pending").length}</b>
        </div>
        <div>
          <span>Preparing</span>
          <b>{orders.filter(o => o.status === "Preparing").length}</b>
        </div>
      </div>





      <section className="panel page-panel">
        <SectionTitle
          title="All Orders"
          subtitle="Update an order status using the dropdown."
        />
       <OrdersTable
  orders={orders}
  onStatus={onStatus}
  onDelete={onDelete}
  onEdit={onEdit}
/>
      </section>
    </>
  );
}



function CustomerPage({
  customers,
  onAdd,
  customerForm,
  setCustomerForm,
  showCustomerForm,
  setShowCustomerForm,
  onSave,
  customerSaving,
  onEditCustomer,
  onDeleteCustomer,
  editingCustomer,
setEditingCustomer,
}) {

function handleEditClick(customer) {
  setEditingCustomer(customer);

  setCustomerForm({
    name: customer.name || "",
    email: customer.email || "",
  });

  setShowCustomerForm(true);
}

function closeCustomerForm() {
  setShowCustomerForm(false);
  setEditingCustomer(null);
  setCustomerForm({ name: "", email: "" });
}

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR COMMUNITY</span>
          <h1>Customer Management <span>💗</span></h1>
          <p>Get to know the people who make your bakery special.</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setShowCustomerForm(true)}
        >
          <Plus size={16} /> Add Customer
        </button>
      </div>

      <section className="panel page-panel">
        <SectionTitle
          title="Registered Customers"
          subtitle={`${customers.length} registered customers`}
        />

   <CustomerTable
  customers={customers}
  onEdit={handleEditClick}
  onDelete={onDeleteCustomer}
/>
      </section>

      {showCustomerForm && (
        <div
          className="modal-backdrop"
          onClick={closeCustomerForm}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-heading">
              <div>
                <span className="eyebrow">CUSTOMER DETAILS</span>
                <h2>{editingCustomer ? "Edit Customer" : "Add Customer"}</h2>
              </div>

              <button
                className="icon-button"
                onClick={() => setShowCustomerForm(false)}
                type="button"
              >
                <X />
              </button>
            </div>

            <form className="cake-form" onSubmit={onSave}>
              <label>
                Customer name
                <input
                  required
                  value={customerForm.name}
                  onChange={(e) =>
                    setCustomerForm({
                      ...customerForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="Enter customer name"
                />
              </label>

              <label>
                Email address
                <input
                  required
                  type="email"
                  value={customerForm.email}
                  onChange={(e) =>
                    setCustomerForm({
                      ...customerForm,
                      email: e.target.value,
                    })
                  }
                  placeholder="example@gmail.com"
                />
              </label>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-light"
                  onClick={() => setShowCustomerForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={customerSaving}
                >
                  {customerSaving
  ? "Saving..."
  : editingCustomer
    ? "Update Customer"
    : "Save Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


function RequestsPage({ notify }) { const [requests,setRequests]=useState([{id:"CR-201",name:"Priya S",occasion:"Birthday",description:"Pink heart cake with strawberries",date:"20 Sep, 2026",status:"Pending"},{id:"CR-202",name:"Arjun",occasion:"Anniversary",description:"Two-tier chocolate cake",date:"22 Sep, 2026",status:"Reviewing"},{id:"CR-203",name:"Sneha",occasion:"Baby Shower",description:"Pastel floral theme",date:"25 Sep, 2026",status:"Approved"}]); return <><div className="page-heading"><div><span className="eyebrow">MADE JUST FOR YOU</span><h1>Custom Cake Requests <span>🎨</span></h1><p>Review special designs and celebration requests.</p></div></div><div className="request-grid">{requests.map(r=><div className="panel request-card" key={r.id}><div className="request-top"><span className="request-icon">🎂</span><Status value={r.status}/></div><small>{r.id} · {r.date}</small><h3>{r.occasion} Cake</h3><p>{r.description}</p><div className="request-customer"><span className="customer-avatar">👩🏻</span><b>{r.name}</b></div><select value={r.status} onChange={e=>{setRequests(old=>old.map(x=>x.id===r.id?{...x,status:e.target.value}:x));notify("Request status updated (demo only)")}}><option>Pending</option><option>Reviewing</option><option>Approved</option><option>Rejected</option></select></div>)}</div></>; }
function CategoriesPage({ notify }) { const [cats,setCats]=useState(["Classic Cakes","Chocolate Cakes","Fruit Cakes","Wedding Cakes","Birthday Cakes","Cupcakes"]); const [name,setName]=useState(""); return <><div className="page-heading"><div><span className="eyebrow">ORGANISE YOUR MENU</span><h1>Categories <span>🧁</span></h1><p>Group your cakes to help customers find their favourites.</p></div></div><section className="panel page-panel"><SectionTitle title="Cake Categories" subtitle={`${cats.length} sample categories`}/><form className="inline-add" onSubmit={e=>{e.preventDefault();if(name.trim()){setCats(old=>[...old,name.trim()]);setName("");notify("Category added (demo only)")}}}><input value={name} onChange={e=>setName(e.target.value)} placeholder="New category name" required/><button className="btn-primary"><Plus size={16}/> Add Category</button></form><div className="category-grid">{cats.map((c,i)=><div className="category-card" key={c}><span className={`category-emoji cat-${i%5}`}>{["🎂","🍫","🍓","💍","🎉"][i%5]}</span><b>{c}</b><small>{[12,8,6,4,10,15][i%6]} sample products</small><button onClick={()=>{setCats(old=>old.filter(x=>x!==c));notify("Category removed from demo")}}><Trash2 size={15}/> Remove</button></div>)}</div></section></>; }
function OffersPage({ notify }) { const [offers,setOffers]=useState([{code:"SWEET10",discount:"10%",type:"Percentage",status:"Active",uses:24},{code:"CAKE150",discount:"₹150",type:"Flat discount",status:"Active",uses:12},{code:"WELCOME5",discount:"5%",type:"Percentage",status:"Paused",uses:8}]); const [code,setCode]=useState(""); return <><div className="page-heading"><div><span className="eyebrow">LITTLE EXTRAS, BIG SMILES</span><h1>Offers & Coupons <span>🏷️</span></h1><p>Manage promotional codes for your cake customers.</p></div></div><section className="panel page-panel"><SectionTitle title="Your Offers" subtitle="Demo coupon data"/><form className="inline-add" onSubmit={e=>{e.preventDefault();if(code.trim()){setOffers(old=>[{code:code.toUpperCase(),discount:"10%",type:"Percentage",status:"Active",uses:0},...old]);setCode("");notify("Coupon created (demo only)")}}}><input value={code} onChange={e=>setCode(e.target.value)} placeholder="Enter coupon code" required/><button className="btn-primary"><Plus size={16}/> Create Coupon</button></form><div className="table-scroll"><table><thead><tr><th>Coupon Code</th><th>Discount</th><th>Type</th><th>Uses</th><th>Status</th><th>Action</th></tr></thead><tbody>{offers.map(o=><tr key={o.code}><td><span className="coupon-code">{o.code}</span></td><td>{o.discount}</td><td>{o.type}</td><td>{o.uses}</td><td><Status value={o.status}/></td><td><button className="btn-mini" onClick={()=>{setOffers(old=>old.map(x=>x.code===o.code?{...x,status:x.status==="Active"?"Paused":"Active"}:x));notify("Coupon status changed (demo only)")}}>{o.status==="Active"?"Pause":"Activate"}</button></td></tr>)}</tbody></table></div></section></>; }
function SettingsPage({ notify }) {
  const [store, setStore] = useState({
    name: "SweetCake",
    email: "hello@sweetcake.example",
    phone: "+91 98765 43210",
    currency: "INR (₹)",
    lowStock: "5",
  });

  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">MAKE IT YOURS</span>
          <h1>
            Settings <span>⚙️</span>
          </h1>
          <p>Update your bakery profile and admin preferences.</p>
        </div>
      </div>

      <section className="panel settings-panel">
        <SectionTitle
          title="Store Profile"
          subtitle="Sample settings, not yet saved to a backend"
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            notify("Settings saved in this demo session only");
          }}
          className="settings-form"
        >
          <label>
            Store name
            <input
              value={store.name}
              onChange={(e) =>
                setStore({ ...store, name: e.target.value })
              }
            />
          </label>

          <label>
            Contact email
            <input
              type="email"
              value={store.email}
              onChange={(e) =>
                setStore({ ...store, email: e.target.value })
              }
            />
          </label>

          <label>
            Contact phone
            <input
              value={store.phone}
              onChange={(e) =>
                setStore({ ...store, phone: e.target.value })
              }
            />
          </label>

          <label>
            Currency
            <select
              value={store.currency}
              onChange={(e) =>
                setStore({ ...store, currency: e.target.value })
              }
            >
              <option>INR (₹)</option>
              <option>USD ($)</option>
            </select>
          </label>

          <label>
            Low stock alert threshold
            <input
              type="number"
              min="1"
              value={store.lowStock}
              onChange={(e) =>
                setStore({ ...store, lowStock: e.target.value })
              }
            />
          </label>

          <div>
      <button type="submit" className="btn-primary">
  Save Settings
</button>
          </div>
        </form>
      </section>
    </>
  );
}
