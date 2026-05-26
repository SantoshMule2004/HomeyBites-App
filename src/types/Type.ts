export type dataType = {
  id: string,
  title: string,
  desc: string,
  price: string,
  url: string
}

// export const DATA: dataType[] = [
//     { id: '1', title: 'name1', desc: 'desc', price: 'price', url: '' },
//     { id: '2', title: 'name2', desc: 'desc', price: 'price', url: '' },
//     { id: '3', title: 'name3', desc: 'desc', price: 'price', url: '' },
//     { id: '4', title: 'name4', desc: 'desc', price: 'price', url: '' },
//     { id: '5', title: 'name5', desc: 'desc', price: 'price', url: '' },
//     { id: '6', title: 'name6', desc: 'desc', price: 'price', url: '' },
//     { id: '7', title: 'name7', desc: 'desc', price: 'price', url: '' },
//     { id: '8', title: 'name8', desc: 'desc', price: 'price', url: '' },
//     { id: '9', title: 'name9', desc: 'desc', price: 'price', url: '' },
//     { id: '10', title: 'name10', desc: 'desc', price: 'price', url: '' },
//     { id: '11', title: 'name11', desc: 'desc', price: 'price', url: '' },
//     { id: '12', title: 'name12', desc: 'desc', price: 'price', url: '' },
// ];

export const breakfast: dataType[] = [
  // --- BREAKFAST ITEMS ---
  {
    id: "bf_001",
    title: "Classic Kanda Poha",
    desc: "Light and fluffy flattened rice cooked with onions, turmeric, and roasted peanuts. Served with a lemon wedge.",
    price: "₹60",
    url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bf_002",
    title: "Steamed Idli Sambar",
    desc: "Three soft, freshly steamed rice cakes served with mildly spiced lentil sambar and coconut chutney.",
    price: "₹80",
    url: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bf_003",
    title: "Aloo Paratha & Curd",
    desc: "Two whole wheat flatbreads stuffed with spiced mashed potatoes, cooked with pure ghee. Served with fresh yogurt.",
    price: "₹90",
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
  },
];

export const lunch: dataType[] = [
  // --- LUNCH ITEMS ---
  {
    id: "ln_001",
    title: "Ghar-Ki-Thali (Veg)",
    desc: "The ultimate comfort meal: 4 hot rotis, yellow dal tadka, seasonal dry sabzi, jeera rice, and a side salad.",
    price: "₹120",
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ln_002",
    title: "Rajma Chawal Bowl",
    desc: "Slow-cooked red kidney beans in a rich tomato gravy, served over steaming hot basmati rice with pickled onions.",
    price: "₹110",
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ln_003",
    title: "Executive Paneer Meal",
    desc: "Premium tiffin featuring soft paneer butter masala, 3 butter rotis, dal makhani, and sweet gulab jamun.",
    price: "₹160",
    url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80"
  }
];

export const cart: dataType[] = [
  {
    id: "bf_001",
    title: "Classic Kanda Poha",
    desc: "Light and fluffy flattened rice cooked with onions, turmeric, and roasted peanuts. Served with a lemon wedge.",
    price: "₹60",
    url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"
  },

  {
    id: "ln_001",
    title: "Ghar-Ki-Thali (Veg)",
    desc: "The ultimate comfort meal: 4 hot rotis, yellow dal tadka, seasonal dry sabzi, jeera rice, and a side salad.",
    price: "₹120",
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"
  },
];

export const rawData: dataType[] = [
  // --- LUNCH ITEMS ---
  {
    id: "ln_001",
    title: "Ghar-Ki-Thali (Veg)",
    desc: "The ultimate comfort meal: 4 hot rotis, yellow dal tadka, seasonal dry sabzi, jeera rice, and a side salad.",
    price: "₹120",
    url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ln_002",
    title: "Rajma Chawal Bowl",
    desc: "Slow-cooked red kidney beans in a rich tomato gravy, served over steaming hot basmati rice with pickled onions.",
    price: "₹110",
    url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ln_003",
    title: "Executive Paneer Meal",
    desc: "Premium tiffin featuring soft paneer butter masala, 3 butter rotis, dal makhani, and sweet gulab jamun.",
    price: "₹160",
    url: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80"
  },
  // --- BREAKFAST ITEMS ---
  {
    id: "bf_001",
    title: "Classic Kanda Poha",
    desc: "Light and fluffy flattened rice cooked with onions, turmeric, and roasted peanuts. Served with a lemon wedge.",
    price: "₹60",
    url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bf_002",
    title: "Steamed Idli Sambar",
    desc: "Three soft, freshly steamed rice cakes served with mildly spiced lentil sambar and coconut chutney.",
    price: "₹80",
    url: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bf_003",
    title: "Aloo Paratha & Curd",
    desc: "Two whole wheat flatbreads stuffed with spiced mashed potatoes, cooked with pure ghee. Served with fresh yogurt.",
    price: "₹90",
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
  },


]

export type Address = {
  name: string,
  apartment: string,
  street: string,
  city: string,
  state: string,
  pinCode: number,
  phoneNo: number
}