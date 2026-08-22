import mongoose from "mongoose";
import dotenv from "dotenv";
import { Admin } from "./models/Admin.js";
import { User } from "./models/User.js";
import { Product } from "./models/Product.js";
import { Category } from "./models/Category.js";
import { Order } from "./models/Order.js";
import { Coupon } from "./models/Coupon.js";
import { Offer } from "./models/Offer.js";
import { Review } from "./models/Review.js";
import { Notification } from "./models/Notification.js";
import { Settings } from "./models/Settings.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    console.log("🌱 Starting Database Seeding for Pushpangan Admin Platform...");

    // Drop admins collection if legacy indexes exist
    try {
      await mongoose.connection.collection("admins").drop();
    } catch (e) {
      // collection might not exist yet
    }

    await User.deleteMany({ role: "admin" });

    const superAdmin = await Admin.create({
      name: "Pushpangan Super Admin",
      email: "admin@pushpangan.com",
      password: "admin123",
      role: "super_admin",
      permissions: [
        "view_only",
        "edit",
        "delete",
        "create",
        "manage_orders",
        "manage_products",
        "manage_users",
        "manage_settings",
        "manage_admins",
      ],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    });

    await Admin.create([
      {
        name: "Ramesh Sharma",
        email: "manager@pushpangan.com",
        password: "manager123",
        role: "manager",
        permissions: ["view_only", "edit", "create", "manage_orders", "manage_products"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      },
      {
        name: "Priya Patil",
        email: "inventory@pushpangan.com",
        password: "inventory123",
        role: "inventory_manager",
        permissions: ["view_only", "edit", "manage_products"],
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      },
    ]);

    console.log("✅ Admins seeded! Super Admin: admin@pushpangan.com / admin123");

    // 2. Seed Categories
    await Category.deleteMany({});
    const categoriesData = [
      { name: "Marigold", slug: "marigold", description: "Fresh Orange & Yellow Marigolds (Zendu)", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400" },
      { name: "Rose", slug: "rose", description: "Dutch Red, Pink & Yellow Premium Roses", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400" },
      { name: "Traditional", slug: "traditional", description: "Traditional Pooja & Temple flowers", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400" },
      { name: "Exotic", slug: "exotic", description: "Premium Exotic Blooms", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400" },
      { name: "Seasonal", slug: "seasonal", description: "Bright Seasonal Flowers", image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400" },
      { name: "Bouquet", slug: "bouquet", description: "Premium Gift Flower Bouquets", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400" }
    ];
    const insertedCategories = await Category.insertMany(categoriesData);
    console.log("✅ 6 Categories seeded!");

    // Helper to find category ID by name
    const getCategoryId = (name) => {
      const cat = insertedCategories.find(c => c.name === name);
      return cat ? cat._id : null;
    };

    // 3. Seed Products
    await Product.deleteMany({});
    const productsData = [
      {
        name: "Orange Marigold",
        slug: "orange-marigold",
        category: getCategoryId("Marigold"),
        color: "Orange",
        price: 120,
        unit: "per Kg",
        stock: 150,
        description: "Bright orange marigolds, freshly picked at dawn. Ideal for temple garlands, weddings and festive décor.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png"],
        featured: true,
        bestSeller: true,
      },
      {
        name: "Yellow Marigold",
        slug: "yellow-marigold",
        category: getCategoryId("Marigold"),
        color: "Yellow",
        price: 110,
        unit: "per Kg",
        stock: 120,
        description: "Sun-kissed yellow marigolds, full bloom, ideal for decorations and pooja.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784709569/6cd676ac-edb2-44f6-8d88-d472354c11ec.png"],
        featured: true,
      },
      {
        name: "Rose (Mixed)",
        slug: "rose",
        category: getCategoryId("Rose"),
        color: "Mixed",
        price: 250,
        unit: "per Kg",
        stock: 80,
        description: "Fragrant assorted roses in premium grade. Perfect for bouquets and gifting.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784737646/3cb09d52-4e7a-4425-9451-dc103c77bb5f.png"],
        featured: true,
      },
      {
        name: "Red Rose",
        slug: "red-rose",
        category: getCategoryId("Rose"),
        color: "Red",
        price: 300,
        unit: "per Kg",
        stock: 90,
        description: "Classic long-stem red roses. Deep colour and long vase life.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784708628/18eb09ef-1108-4efd-acec-2fe7a80bbaf1.png"],
        featured: true,
        bestSeller: true,
      },
      {
        name: "Pink Rose",
        slug: "pink-rose",
        category: getCategoryId("Rose"),
        color: "Pink",
        price: 280,
        unit: "per Kg",
        stock: 75,
        description: "Soft pink roses hand-picked for weddings and grand decorations.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784709881/45c9b64f-dc46-45ba-a36d-0325dbcd3fb2.png"],
        featured: false,
      },
      {
        name: "White Rose",
        slug: "white-rose",
        category: getCategoryId("Rose"),
        color: "White",
        price: 290,
        unit: "per Kg",
        stock: 60,
        description: "Pure white roses — a symbol of elegance and new beginnings.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784710023/2412b707-4797-4a60-9680-12ce05cec1c4.png"],
        featured: false,
      },
      {
        name: "Rose Petals",
        slug: "rose-petals",
        category: getCategoryId("Rose"),
        color: "Mixed",
        price: 400,
        unit: "per Kg",
        stock: 50,
        description: "Loose rose petals for showering, aisle décor and rangoli.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png"],
        featured: true,
      },
      {
        name: "Lotus",
        slug: "lotus",
        category: getCategoryId("Traditional"),
        color: "Pink",
        price: 40,
        unit: "per Piece",
        stock: 200,
        description: "Sacred lotus with long stem, perfect for pooja and temple offerings.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png"],
        featured: true,
      },
      {
        name: "Sunflower",
        slug: "sunflower",
        category: getCategoryId("Seasonal"),
        color: "Yellow",
        price: 25,
        unit: "per Piece",
        stock: 180,
        description: "Big bright sunflowers — cheerful and long-lasting.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784708497/22561097-5ca1-481d-a600-4a24d27de501.png"],
        featured: false,
        seasonal: true,
      },
      {
        name: "Shevanti (Chrysanthemum)",
        slug: "shevanti",
        category: getCategoryId("Traditional"),
        color: "Yellow",
        price: 160,
        unit: "per Kg",
        stock: 140,
        description: "Traditional shevanti — favourite for garlands and decorations.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784730994/0f8cf9d3-7012-428a-9830-b1fa3bd52b4d.png"],
        featured: false,
      },
      {
        name: "Lily",
        slug: "lily",
        category: getCategoryId("Exotic"),
        color: "White",
        price: 60,
        unit: "per Piece",
        stock: 110,
        description: "Fragrant lilies with tall stems — grand and graceful.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784731609/8c0bc971-708e-43c1-beef-ff1a2137d519.png"],
        featured: false,
      },
      {
        name: "Jasmine (Mogra)",
        slug: "jasmine",
        category: getCategoryId("Traditional"),
        color: "White",
        price: 900,
        unit: "per Kg",
        stock: 40,
        description: "Aromatic mogra — the fragrance of Indian evenings.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784731813/fdaa172c-5620-4493-838d-1869723eee74.png"],
        featured: false,
      },
      {
        name: "Hibiscus",
        slug: "hibiscus",
        category: getCategoryId("Traditional"),
        color: "Red",
        price: 15,
        unit: "per Piece",
        stock: 300,
        description: "Fresh red hibiscus — sacred bloom for pooja and offerings.",
        images: ["https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png"],
        featured: true,
      }
    ];
    await Product.insertMany(productsData);
    console.log("✅ Products seeded!");

    // 4. Seed Orders
    await Order.deleteMany({});
    await Order.create([
      {
        orderNumber: "ORD-2026-9812",
        customerName: "Aarav Sharma",
        customerEmail: "aarav@example.com",
        customerPhone: "+91 98765 11111",
        items: [{ name: "Yellow Dutch Marigold (Zendu)", price: 99, quantity: 5, subtotal: 495 }],
        totalAmount: 495,
        discountAmount: 45,
        deliveryFee: 50,
        finalAmount: 500,
        shippingAddress: { address: "Flat 402, Sunshine Apts", city: "Pune", state: "Maharashtra", pincode: "411001", phone: "9876511111" },
        paymentMethod: "UPI",
        paymentStatus: "Paid",
        orderStatus: "Out For Delivery",
        deliveryPartner: "Dunzo Express",
        trackingNumber: "TRK-DUN-8842",
      },
      {
        orderNumber: "ORD-2026-9813",
        customerName: "Sneha Kulkarni",
        customerEmail: "sneha@example.com",
        customerPhone: "+91 98765 22222",
        items: [{ name: "Royal Dutch Red Roses (Bunch of 20)", price: 399, quantity: 2, subtotal: 798 }],
        totalAmount: 798,
        discountAmount: 0,
        deliveryFee: 0,
        finalAmount: 798,
        shippingAddress: { address: "12, Rose Villa, Baner", city: "Pune", state: "Maharashtra", pincode: "411045", phone: "9876522222" },
        paymentMethod: "Credit Card",
        paymentStatus: "Paid",
        orderStatus: "Pending",
      },
    ]);
    console.log("✅ Sample Orders seeded!");

    // 5. Seed Coupons & Offers
    await Coupon.deleteMany({});
    await Coupon.create([
      { code: "PUSHP20", discountType: "percentage", discountValue: 20, minPurchase: 499, maxDiscount: 150, expiryDate: new Date("2026-12-31"), status: "active" },
      { code: "FLAT100", discountType: "flat", discountValue: 100, minPurchase: 999, maxDiscount: 100, expiryDate: new Date("2026-12-31"), status: "active" },
    ]);

    await Offer.deleteMany({});
    await Offer.create([
      { title: "Diwali Floral Dhamaka", offerType: "Festival Offer", discountPercentage: 25, endDate: new Date("2026-11-15"), status: "active" },
      { title: "Weekend Marigold Sale", offerType: "Weekend Offer", discountPercentage: 15, endDate: new Date("2026-08-05"), status: "active" },
    ]);
    console.log("✅ Coupons & Offers seeded!");

    // 6. Seed Notifications & Settings
    await Notification.deleteMany({});
    await Notification.create([
      { title: "New Order Placed", message: "Aarav Sharma placed order ORD-2026-9812", type: "New Order" },
      { title: "Low Stock Alert", message: "Pink Lotus Flowers stock is down to 8 units!", type: "Low Stock" },
    ]);

    await Settings.deleteMany({});
    await Settings.create({});

    console.log("🎉 All DB Seeding Completed Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedData();
