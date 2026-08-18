import { MongoClient, ObjectId } from "mongodb";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {
  // fallback if custom DNS set is restricted
}

const MONGODB_URI = "mongodb+srv://yashvarpe169_db_user:SpowHiY6dSBomXNo@cluster0.no1atbc.mongodb.net/pushpangan_db?retryWrites=true&w=majority&appName=Cluster0";

async function runSeed() {
  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
  });

  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    const db = client.db("pushpangan_db");

    // 1. CATEGORIES COLLECTION
    const categoriesCol = db.collection("categories");
    await categoriesCol.createIndex({ slug: 1 }, { unique: true });

    const festivalCatId = new ObjectId("64b000000000000000000001");
    const rosesCatId = new ObjectId("64b000000000000000000002");
    const exoticCatId = new ObjectId("64b000000000000000000003");
    const looseCatId = new ObjectId("64b000000000000000000004");

    const categories = [
      {
        _id: festivalCatId,
        name: "Festival Flowers & Garlands",
        slug: "festival-flowers-garlands",
        description: "Fresh dawn-plucked marigolds, lotus, and sacred blooms for Bappa & deity poojas.",
        image_url: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784737738/a02ef13e-4e9f-4fce-a726-91614f72baf4.png",
        created_at: new Date(),
      },
      {
        _id: rosesCatId,
        name: "Roses & Classic Blooms",
        slug: "roses-classic-blooms",
        description: "Premium fragrant long-stem roses in vivid colors for gifting & expressions.",
        image_url: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png",
        created_at: new Date(),
      },
      {
        _id: exoticCatId,
        name: "Exotic & Luxury Flowers",
        slug: "exotic-luxury-flowers",
        description: "Lilies, Orchids, Tulips, and Hydrangeas for luxury decor and grand events.",
        image_url: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
        created_at: new Date(),
      },
      {
        _id: looseCatId,
        name: "Loose Petals & Fillers",
        slug: "loose-petals-fillers",
        description: "Aromatic loose rose petals, eucalyptus leaves, and baby's breath for rangolis.",
        image_url: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png",
        created_at: new Date(),
      },
    ];

    for (const cat of categories) {
      await categoriesCol.updateOne({ _id: cat._id }, { $set: cat }, { upsert: true });
    }
    console.log(`✓ Categories seeded (${categories.length})`);

    // 2. PRODUCTS COLLECTION
    const productsCol = db.collection("products");
    await productsCol.createIndex({ slug: 1 }, { unique: true });
    await productsCol.createIndex({ sku: 1 }, { unique: true });
    await productsCol.createIndex({ category_id: 1 });
    await productsCol.createIndex({ featured: 1 });

    const products = [
      {
        _id: new ObjectId("64b100000000000000000001"),
        category_id: festivalCatId,
        name: "Orange Marigold",
        slug: "orange-marigold",
        botanical_name: "Tagetes erecta",
        short_description: "Vibrant dawn-picked orange marigolds for garlands and mandap decor.",
        long_description: "Hand-picked before sunrise from growers in Pune. Essential for Ganesh Chaturthi, Diwali, and traditional Maharashtrian weddings.",
        price: 120,
        discount_price: 100,
        stock_quantity: 500,
        unit: "kg",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png",
        featured: true,
        availability: true,
        sku: "FLW-MRG-ORG-01",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000002"),
        category_id: festivalCatId,
        name: "Yellow Marigold",
        slug: "yellow-marigold",
        botanical_name: "Tagetes erecta",
        short_description: "Bright sunshine yellow marigold blooms for torans and altar offerings.",
        long_description: "Fresh, thick-petaled yellow marigolds that remain fresh for hours. Direct from farm to mandap.",
        price: 110,
        discount_price: 90,
        stock_quantity: 450,
        unit: "kg",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png",
        featured: true,
        availability: true,
        sku: "FLW-MRG-YEL-02",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000003"),
        category_id: festivalCatId,
        name: "White Marigold",
        slug: "white-marigold",
        botanical_name: "Tagetes erecta",
        short_description: "Rare vanilla white marigolds adding elegant contrast to floral arrangements.",
        long_description: "Soft white marigolds harvested daily. Ideal for boutique garlands, contrast torans, and temple altars.",
        price: 150,
        discount_price: 130,
        stock_quantity: 200,
        unit: "kg",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png",
        featured: false,
        availability: true,
        sku: "FLW-MRG-WHT-03",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000004"),
        category_id: festivalCatId,
        name: "French Marigold",
        slug: "french-marigold",
        botanical_name: "Tagetes patula",
        short_description: "Compact, multi-hued orange-red velvet marigolds.",
        long_description: "Aromatic French marigolds featuring dual-tone red and bronze petals. Perfect for intricate flower carpet rangolis.",
        price: 140,
        discount_price: 120,
        stock_quantity: 300,
        unit: "kg",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png",
        featured: false,
        availability: true,
        sku: "FLW-MRG-FRN-04",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000005"),
        category_id: rosesCatId,
        name: "Red Rose",
        slug: "red-rose",
        botanical_name: "Rosa rubiginosa",
        short_description: "Deep crimson red roses with long sturdy stems.",
        long_description: "Classic Dutch red roses plucked at perfect bud stage for maximum vase life. Ideal for bouquets and romance.",
        price: 25,
        discount_price: 20,
        stock_quantity: 600,
        unit: "stem",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png",
        featured: true,
        availability: true,
        sku: "FLW-ROS-RED-05",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000006"),
        category_id: rosesCatId,
        name: "White Rose",
        slug: "white-rose",
        botanical_name: "Rosa alba",
        short_description: "Pure ivory white roses symbolising purity and grace.",
        long_description: "Pristine white stem roses ideal for bridal bouquets, sympathy offerings, and serene stage decorations.",
        price: 25,
        discount_price: 22,
        stock_quantity: 400,
        unit: "stem",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png",
        featured: false,
        availability: true,
        sku: "FLW-ROS-WHT-06",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000007"),
        category_id: rosesCatId,
        name: "Pink Rose",
        slug: "pink-rose",
        botanical_name: "Rosa chinensis",
        short_description: "Blush pink soft roses for birthdays and congratulations.",
        long_description: "Delicate pink roses boasting sweet natural fragrance. Perfect for table arrangements and gifting.",
        price: 25,
        discount_price: 20,
        stock_quantity: 450,
        unit: "stem",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png",
        featured: false,
        availability: true,
        sku: "FLW-ROS-PNK-07",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000008"),
        category_id: rosesCatId,
        name: "Yellow Rose",
        slug: "yellow-rose",
        botanical_name: "Rosa foetida",
        short_description: "Radiant golden yellow roses symbolizing friendship & joy.",
        long_description: "Cheerful yellow roses grown in polyhouses near Polyhouse Talegaon. Brightens up any space instantly.",
        price: 25,
        discount_price: 20,
        stock_quantity: 350,
        unit: "stem",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png",
        featured: false,
        availability: true,
        sku: "FLW-ROS-YEL-08",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000009"),
        category_id: exoticCatId,
        name: "Sunflower",
        slug: "sunflower",
        botanical_name: "Helianthus annuus",
        short_description: "Large golden yellow sunflowers with dark central discs.",
        long_description: "Farm-fresh sunflowers bringing warmth and positivity. Great centerpiece stem for vase arrangements.",
        price: 45,
        discount_price: 40,
        stock_quantity: 250,
        unit: "stem",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
        featured: true,
        availability: true,
        sku: "FLW-SNF-YEL-09",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000010"),
        category_id: exoticCatId,
        name: "Gerbera",
        slug: "gerbera",
        botanical_name: "Gerbera jamesonii",
        short_description: "Vibrant multi-color gerbera daisies for event backdrops.",
        long_description: "Long-lasting premium gerberas available in red, pink, orange, and yellow. Highly preferred for corporate stages.",
        price: 18,
        discount_price: 15,
        stock_quantity: 700,
        unit: "stem",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
        featured: false,
        availability: true,
        sku: "FLW-GRB-MXD-10",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000011"),
        category_id: exoticCatId,
        name: "White Daisy",
        slug: "white-daisy",
        botanical_name: "Bellis perennis",
        short_description: "Cute white petal daisies with bright yellow centers.",
        long_description: "Charming white daisies adding a rustic wildflower charm to hand-tied bouquets and wreaths.",
        price: 120,
        discount_price: 100,
        stock_quantity: 300,
        unit: "bunch",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
        featured: false,
        availability: true,
        sku: "FLW-DSY-WHT-11",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000012"),
        category_id: looseCatId,
        name: "Baby's Breath",
        slug: "babys-breath",
        botanical_name: "Gypsophila paniculata",
        short_description: "Cloud-like tiny white delicate filler blooms.",
        long_description: "Essential flower filler for bouquets, wedding arches, hair accessories, and elegant table runners.",
        price: 180,
        discount_price: 160,
        stock_quantity: 200,
        unit: "bunch",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png",
        featured: true,
        availability: true,
        sku: "FLW-GYP-WHT-12",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000013"),
        category_id: festivalCatId,
        name: "Jasmine (Mogra)",
        slug: "jasmine-mogra",
        botanical_name: "Jasminum officinale",
        short_description: "Intensely fragrant white Mogra buds for gajras & pooja.",
        long_description: "Freshly plucked sunrise Mogra buds. Fills the atmosphere with mesmerizing traditional fragrance.",
        price: 450,
        discount_price: 400,
        stock_quantity: 150,
        unit: "kg",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png",
        featured: true,
        availability: true,
        sku: "FLW-JSM-MOG-13",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000014"),
        category_id: festivalCatId,
        name: "Pink Sacred Lotus",
        slug: "pink-sacred-lotus",
        botanical_name: "Nelumbo nucifera",
        short_description: "Sacred pink lotus stems for Goddess Laxmi & Ganpati sthapana.",
        long_description: "Fresh pond-plucked pink lotus with long stem. Symbol of spiritual purity and abundance for grand poojas.",
        price: 40,
        discount_price: 35,
        stock_quantity: 180,
        unit: "piece",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
        featured: true,
        availability: true,
        sku: "FLW-LTS-PNK-14",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000015"),
        category_id: exoticCatId,
        name: "Asiatic White Lily",
        slug: "asiatic-white-lily",
        botanical_name: "Lilium candidum",
        short_description: "Majestic multi-bloom lily stems with heavenly aroma.",
        long_description: "Premium Oriental/Asiatic white lily stems featuring 3-5 openable buds per stem. Long vase life of up to 10 days.",
        price: 90,
        discount_price: 80,
        stock_quantity: 220,
        unit: "stem",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
        featured: true,
        availability: true,
        sku: "FLW-LLY-WHT-15",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000016"),
        category_id: rosesCatId,
        name: "Pink Carnation",
        slug: "pink-carnation",
        botanical_name: "Dianthus caryophyllus",
        short_description: "Ruffled pink carnation blooms that stay fresh over a week.",
        long_description: "Durable, beautiful pink carnations. Resistant to wilting and excellent for long-lasting table centerpieces.",
        price: 22,
        discount_price: 18,
        stock_quantity: 500,
        unit: "stem",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784732634/d331f206-1f80-4f44-822a-a167f76f3471.png",
        featured: false,
        availability: true,
        sku: "FLW-CRN-PNK-16",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000017"),
        category_id: exoticCatId,
        name: "Purple Dendrobium Orchid",
        slug: "purple-dendrobium-orchid",
        botanical_name: "Dendrobium hybrid",
        short_description: "Exotic purple orchid sticks for luxury arrangements.",
        long_description: "Exquisite purple Thai orchids with velvety texture. Perfect for hotel decor, VIP bouquets, and modern floral art.",
        price: 35,
        discount_price: 30,
        stock_quantity: 300,
        unit: "stem",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
        featured: true,
        availability: true,
        sku: "FLW-ORC-PRP-17",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000018"),
        category_id: festivalCatId,
        name: "Rajnigandha (Tuberose)",
        slug: "rajnigandha-tuberose",
        botanical_name: "Polianthes tuberosa",
        short_description: "Fragrant white tuberose spikes for wedding garlands & vases.",
        long_description: "Heavily scented white flower spikes. Highly popular for Maharashtrian wedding decor and venue entrances.",
        price: 280,
        discount_price: 250,
        stock_quantity: 250,
        unit: "kg",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png",
        featured: true,
        availability: true,
        sku: "FLW-RJN-WHT-18",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000019"),
        category_id: festivalCatId,
        name: "Yellow Sevanti (Chrysanthemum)",
        slug: "yellow-sevanti-chrysanthemum",
        botanical_name: "Chrysanthemum morifolium",
        short_description: "Dense yellow Sevanti blooms for festive floral carpets.",
        long_description: "Fresh yellow Chrysanthemum blooms plucked at peak freshness. Stays vibrant for traditional home poojas.",
        price: 130,
        discount_price: 110,
        stock_quantity: 400,
        unit: "kg",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784708101/a7a3f387-4978-46c9-82b2-a2080157720c.png",
        featured: false,
        availability: true,
        sku: "FLW-CHR-YEL-19",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000020"),
        category_id: exoticCatId,
        name: "Purple Aster",
        slug: "purple-aster",
        botanical_name: "Aster amellus",
        short_description: "Star-shaped purple daisy-like filler blooms.",
        long_description: "Add rich violet tones to your bouquets with fresh purple Aster bunches direct from grower farms.",
        price: 90,
        discount_price: 75,
        stock_quantity: 280,
        unit: "bunch",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
        featured: false,
        availability: true,
        sku: "FLW-AST-PRP-20",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000021"),
        category_id: exoticCatId,
        name: "Blue Hydrangea Bloom",
        slug: "blue-hydrangea-bloom",
        botanical_name: "Hydrangea macrophylla",
        short_description: "Voluminous soft blue spherical flower head.",
        long_description: "Luxurious blue hydrangea stem with plush petaled globe head. Ideal centerpiece flower for high-end events.",
        price: 180,
        discount_price: 150,
        stock_quantity: 120,
        unit: "stem",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
        featured: true,
        availability: true,
        sku: "FLW-HDR-BLU-21",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000022"),
        category_id: exoticCatId,
        name: "Dutch Red Tulip",
        slug: "dutch-red-tulip",
        botanical_name: "Tulipa",
        short_description: "Sleek cup-shaped Dutch red tulips.",
        long_description: "Imported quality red tulips kept in cold chain storage. Premium choice for romantic and corporate gift boxes.",
        price: 120,
        discount_price: 100,
        stock_quantity: 150,
        unit: "stem",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784710185/6c3dfd86-8166-48d5-964c-efaa89d346d6.png",
        featured: true,
        availability: true,
        sku: "FLW-TLP-RED-22",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000023"),
        category_id: looseCatId,
        name: "French Lavender Bunch",
        slug: "french-lavender-bunch",
        botanical_name: "Lavandula angustifolia",
        short_description: "Fragrant purple lavender stems with calming scent.",
        long_description: "Aromatic fresh lavender stems suitable for vase display, room fragrance, and aromatherapy drying.",
        price: 220,
        discount_price: 190,
        stock_quantity: 180,
        unit: "bunch",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png",
        featured: false,
        availability: true,
        sku: "FLW-LVD-PRP-23",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000024"),
        category_id: looseCatId,
        name: "Fresh Eucalyptus Foliage",
        slug: "fresh-eucalyptus-foliage",
        botanical_name: "Eucalyptus globulus",
        short_description: "Silver-green aromatic greenery filler stems.",
        long_description: "Fresh silver-dollar eucalyptus branches providing structural height and natural herbal aroma to floral arrangements.",
        price: 110,
        discount_price: 90,
        stock_quantity: 300,
        unit: "bunch",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png",
        featured: false,
        availability: true,
        sku: "FLW-EUC-GRN-24",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b100000000000000000025"),
        category_id: looseCatId,
        name: "Rose Petals Shower Pack",
        slug: "rose-petals-shower-pack",
        botanical_name: "Rosa hybrid",
        short_description: "Fresh fragrant red & pink rose petals for shower & rangoli.",
        long_description: "Dawn-plucked fresh rose petals packed carefully. Essential for welcoming Bappa, bridal pathways, and scented rangolis.",
        price: 400,
        discount_price: 350,
        stock_quantity: 350,
        unit: "kg",
        image: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784709021/5f8e3673-1f7c-4c22-8ce7-2bc022dc7304.png",
        featured: true,
        availability: true,
        sku: "FLW-PET-RED-25",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    for (const prod of products) {
      await productsCol.updateOne({ _id: prod._id }, { $set: prod }, { upsert: true });
    }
    console.log(`✓ Products seeded (${products.length})`);

    // 3. USERS COLLECTION
    const usersCol = db.collection("users");
    await usersCol.createIndex({ email: 1 }, { unique: true });
    await usersCol.createIndex({ phone: 1 });

    const adminUserId = new ObjectId("64b200000000000000000001");
    const custUserId = new ObjectId("64b200000000000000000002");

    const users = [
      {
        _id: adminUserId,
        full_name: "Pushpangan Admin",
        email: "admin@pushpangan.in",
        phone: "+91 73043 30409",
        password_hash: "$2a$12$eImiTXuWVxfM37uY4JANjOQ.g.uCgTfK7V5i5E/2q6c2X1g4VwNKO",
        role: "admin",
        address: "Wholesale Flower Market",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411002",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: custUserId,
        full_name: "Aarav Sharma",
        email: "aarav@example.com",
        phone: "+91 98765 43210",
        password_hash: "$2a$12$eImiTXuWVxfM37uY4JANjOQ.g.uCgTfK7V5i5E/2q6c2X1g4VwNKO",
        role: "customer",
        address: "Flat 402, Sunshine Heights, FC Road",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411004",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    for (const u of users) {
      await usersCol.updateOne({ _id: u._id }, { $set: u }, { upsert: true });
    }
    console.log(`✓ Users seeded (${users.length})`);

    // 4. ADMINS COLLECTION
    const adminsCol = db.collection("admins");
    await adminsCol.createIndex({ user_id: 1 }, { unique: true });
    await adminsCol.updateOne(
      { user_id: adminUserId },
      {
        $set: {
          user_id: adminUserId,
          permissions: { all: true, inventory: true, orders: true },
          department: "Operations",
          created_at: new Date(),
        },
      },
      { upsert: true }
    );
    console.log("✓ Admin details seeded");

    // 5. FOLLOWUP REMINDERS COLLECTION
    const remindersCol = db.collection("followup_reminders");
    await remindersCol.createIndex({ user_id: 1, event_date: 1 });
    await remindersCol.createIndex({ reminder_type: 1 });

    const reminders = [
      {
        _id: new ObjectId("64b300000000000000000001"),
        user_id: custUserId,
        reminder_type: "ganesh_festival",
        event_name: "Ganesh Chaturthi Bappa Sthapana 2026",
        event_date: new Date("2026-09-14"),
        notify_days_before: 5,
        notes: "Pre-book 10-day marigold garlands, lotus stems, and 21 red hibiscus set.",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: new ObjectId("64b300000000000000000002"),
        user_id: custUserId,
        reminder_type: "birthday",
        event_name: "Wife's Birthday Floral Surprise",
        event_date: new Date("2026-10-20"),
        notify_days_before: 3,
        notes: "Order Asiatic White Lilies and Dutch Red Roses bouquet.",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    for (const r of reminders) {
      await remindersCol.updateOne({ _id: r._id }, { $set: r }, { upsert: true });
    }
    console.log(`✓ Follow-up Reminders seeded (${reminders.length})`);

    // 6. COUPONS COLLECTION
    const couponsCol = db.collection("coupons");
    await couponsCol.createIndex({ code: 1 }, { unique: true });
    const coupons = [
      {
        _id: new ObjectId("64b400000000000000000001"),
        code: "BAPPA100",
        discount_type: "fixed",
        discount_value: 100,
        min_order_amount: 500,
        valid_from: new Date(),
        valid_until: new Date("2026-12-31"),
        usage_limit: 1000,
        used_count: 0,
        is_active: true,
        created_at: new Date(),
      },
      {
        _id: new ObjectId("64b400000000000000000002"),
        code: "PUSHP20",
        discount_type: "percentage",
        discount_value: 20,
        min_order_amount: 1000,
        valid_from: new Date(),
        valid_until: new Date("2026-12-31"),
        usage_limit: 500,
        used_count: 0,
        is_active: true,
        created_at: new Date(),
      },
    ];

    for (const c of coupons) {
      await couponsCol.updateOne({ _id: c._id }, { $set: c }, { upsert: true });
    }
    console.log(`✓ Coupons seeded (${coupons.length})`);

    // 7. BANNERS COLLECTION
    const bannersCol = db.collection("banners");
    await bannersCol.updateOne(
      { title: "Ganesh Chaturthi Grand Special" },
      {
        $set: {
          title: "Ganesh Chaturthi Grand Special",
          subtitle: "Pre-book dawn-plucked fresh blooms for Bappa",
          image_url: "https://res.cloudinary.com/r1o7fosa/image/upload/v1784737738/a02ef13e-4e9f-4fce-a726-91614f72baf4.png",
          target_link: "/shop",
          display_order: 1,
          is_active: true,
          created_at: new Date(),
        },
      },
      { upsert: true }
    );
    console.log("✓ Banners seeded");

    // Ensure all 18 collections exist in the DB
    const remainingCollections = [
      "product_images",
      "inventory",
      "cart",
      "cart_items",
      "orders",
      "order_items",
      "payments",
      "reviews",
      "wishlist",
      "contact_messages",
      "notifications",
    ];

    for (const colName of remainingCollections) {
      await db.createCollection(colName).catch(() => {});
    }
    console.log(`✓ Created/Verified all 18 collections in Pushpangan database!`);

    console.log("\n============================================");
    console.log("PUSHPANGAN MONGODB SEED COMPLETED SUCCESSFULLY!");
    console.log("Database: pushpangan_db");
    console.log("============================================\n");
  } catch (error) {
    console.error("Error seeding MongoDB database:", error);
  } finally {
    await client.close();
  }
}

runSeed();
