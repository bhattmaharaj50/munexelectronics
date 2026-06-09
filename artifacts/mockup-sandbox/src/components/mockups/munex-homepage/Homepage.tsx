import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Star, 
  ChevronRight, 
  Zap, 
  Timer,
  Smartphone,
  Tablet,
  Tv,
  Refrigerator, // changed to generic icon since Refrigerator might not exist, wait let's just use general icons or check lucide. 
  Headphones,
  Speaker,
  Wind,
  Watch,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

// Using simple generic icons to avoid missing exports
const categories = [
  { name: 'Phones', icon: Smartphone },
  { name: 'Tablets', icon: Tablet },
  { name: 'TVs', icon: Tv },
  { name: 'Fridges', icon: Wind }, // placeholder
  { name: 'Washing Machines', icon: Zap }, // placeholder
  { name: 'Headphones', icon: Headphones },
  { name: 'Cookers', icon: Zap }, // placeholder
  { name: 'Accessories', icon: Watch }, // placeholder
  { name: 'Soundbars', icon: Speaker },
  { name: 'Water Dispensers', icon: Wind } // placeholder
];

const brands = [
  "Samsung", "Apple", "Sony", "LG", "Hisense", "Bruhm", 
  "Ramtons", "Itel", "Tecno", "JBL", "Bose", "Canon"
];

const flashSaleProducts = [
  {
    name: "Hisense 55\" U7Q ULED MiniLED 4K 144Hz",
    brand: "Hisense",
    image: "https://cdn.shopify.com/s/files/1/0751/6395/9546/files/rn-image_picker_lib_temp_99512924-982e-438e-aa60-e754fc4f1b6d.jpg?v=1768244065",
    rating: 4.5,
    reviews: 198,
    originalPrice: 95000,
    salePrice: 75000,
    discount: 21,
  },
  {
    name: "JBL Bar 800MK2 7.1ch Soundbar 780W",
    brand: "JBL",
    image: "https://cdn.shopify.com/s/files/1/0751/6395/9546/files/LS_JBL_BAR_800MK2_3_4_RIGHT_0190_x5_71948704-2368-497a-a71f-400e1020c0a4.png?v=1768212195",
    rating: 4.7,
    reviews: 267,
    originalPrice: 125000,
    salePrice: 100000,
    discount: 20,
  },
  {
    name: "TCL C512WDG 12KG/8KG Washer & Dryer",
    brand: "TCL",
    image: "https://cdn.shopify.com/s/files/1/0751/6395/9546/files/C512WDG.png?v=1765804491",
    rating: 4.3,
    reviews: 145,
    originalPrice: 82000,
    salePrice: 65000,
    discount: 21,
  },
  {
    name: "MIKA 529L No Frost Side-By-Side Fridge",
    brand: "MIKA",
    image: "https://cdn.shopify.com/s/files/1/0751/6395/9546/files/MRNF2DW529XLBV-Front.jpeg-B.jpg?v=1765804922",
    rating: 4.4,
    reviews: 112,
    originalPrice: 108000,
    salePrice: 85000,
    discount: 21,
  }
];

const newArrivals = [
  {
    name: "Sony 65\" X90L 4K Full Array LED TV",
    brand: "Sony",
    image: "https://cdn.shopify.com/s/files/1/0751/6395/9546/files/71v3q2fGkqL._AC_SL1500.jpg?v=1769424972",
    rating: 4.8,
    price: 190000,
    isNew: true
  },
  {
    name: "JBL Bar 1300MK2 11.1.4ch Soundbar",
    brand: "JBL",
    image: "https://cdn.shopify.com/s/files/1/0751/6395/9546/files/LS_JBL_SOUNDBAR_1300_MK2_DIMENSIONS_0016_x5_3c79e83d-e398-4e12-bb82-072fff60a254.png?v=1768203268",
    rating: 4.8,
    price: 170000,
    isNew: true
  },
  {
    name: "Syinix 10/7Kg Front Load Washer & Dryer",
    brand: "Syinix",
    image: "https://cdn.shopify.com/s/files/1/0751/6395/9546/files/Syinix_10-7Kg_Front_Load_Washing_Machine_Wash_and_Dry_N10WFDT.jpg?v=1768462335",
    rating: 4.4,
    price: 52000,
    isNew: true
  },
  {
    name: "TCL 65\" C8K Premium QD-MiniLED TV",
    brand: "TCL",
    image: "https://cdn.shopify.com/s/files/1/0751/6395/9546/files/rn-image_picker_lib_temp_641834c1-3abe-4888-b7f9-b39c3e77772a.webp?v=1761121098",
    rating: 4.7,
    price: 140000,
    isNew: true
  }
];

const formatKES = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function Homepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-sans overflow-x-hidden">
      {/* 1. STICKY HEADER */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold tracking-tight text-gray-900">
              Munex <span className="text-gray-400 font-light">Electronics</span>
            </a>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Products</a>
            <a href="#" className="text-sm font-medium text-red-600 flex items-center gap-1 hover:text-red-700 transition-colors">
              <Zap className="w-4 h-4" /> Flash Sale
            </a>
            <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Deal of the Day</a>
            <a href="#" className="text-sm font-medium hover:text-blue-600 transition-colors">Categories</a>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-black transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-black transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>

          <button 
            className="md:hidden text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 overflow-hidden bg-[#F5F5F7]">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Kenya's #1 Premium Store
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-gray-900">
                Premium Electronics, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400">
                  Delivered to Your Door.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 font-light">
                Discover the latest in innovation. From flagship smartphones to cinematic smart TVs, experience technology at its finest with Munex Electronics.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-all hover:scale-105 shadow-xl shadow-gray-200">
                  Shop Now
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-full font-medium border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all">
                  Explore Deals
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative z-10 w-full mt-12 lg:mt-0">
              <div className="relative w-full max-w-lg mx-auto aspect-[4/3] md:aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-white rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
                <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden group">
                  <img 
                    src="https://cdn.shopify.com/s/files/1/0751/6395/9546/files/71v3q2fGkqL._AC_SL1500.jpg?v=1769424972" 
                    alt="Featured Product" 
                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg">
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Featured</p>
                    <div className="flex justify-between items-end mt-1">
                      <h3 className="font-bold text-lg">Sony 65" X90L 4K TV</h3>
                      <p className="font-bold text-blue-600">{formatKES(190000)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SHOWCASE */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Explore Categories</h2>
              <p className="text-gray-500 mt-2">Find exactly what you're looking for</p>
            </div>
            <a href="#" className="hidden md:flex items-center text-sm font-semibold hover:text-blue-600 transition-colors">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, idx) => (
              <div 
                key={idx} 
                className="group relative flex flex-col items-center p-6 md:p-8 bg-[#F5F5F7] rounded-3xl cursor-pointer hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-gray-800 group-hover:scale-110 group-hover:text-blue-600 transition-all duration-300">
                  <category.icon strokeWidth={1.5} className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-semibold text-center">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRUSTED BRANDS */}
      <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
        <div className="container mx-auto px-6 mb-8 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Trusted Brands We Stock</h2>
        </div>
        <div className="flex w-[200%] md:w-[150%] lg:w-[120%] animate-marquee">
          <div className="flex w-full justify-around items-center">
            {brands.map((brand, idx) => (
              <div key={idx} className="px-8 text-2xl md:text-3xl font-bold text-gray-300 hover:text-gray-900 transition-colors cursor-pointer">
                {brand}
              </div>
            ))}
            {/* Duplicate for infinite loop effect */}
            {brands.map((brand, idx) => (
              <div key={`dup-${idx}`} className="px-8 text-2xl md:text-3xl font-bold text-gray-300 hover:text-gray-900 transition-colors cursor-pointer">
                {brand}
              </div>
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}} />
      </section>

      {/* 5. DEAL OF THE DAY */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div className="bg-[#1D1D1F] rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/2 relative h-64 md:h-96 lg:h-auto overflow-hidden bg-[#111] flex items-center justify-center">
              <img 
                src="https://cdn.shopify.com/s/files/1/0751/6395/9546/files/africa-en-uhd-4k-tv-ua75u8000fuxke-front-black-547502132.jpg?v=1763543604" 
                alt="Deal of the Day TV" 
                className="w-full h-full object-contain p-6 opacity-90"
              />
              <div className="absolute top-6 left-6 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                Save {formatKES(165000 - 125000)}
              </div>
            </div>
            
            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mt-20 -mr-20"></div>
              
              <div className="flex items-center gap-2 mb-4">
                <Timer className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">Ends in 08:23:45</span>
              </div>
              
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Deal of the Day</h2>
              <h3 className="text-3xl md:text-5xl font-bold mb-4">Samsung 75" 4K Crystal UHD Smart TV</h3>
              
              <div className="flex items-center gap-1 mb-6 text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current text-gray-600" />
                <span className="text-gray-400 text-sm ml-2">(278 Reviews)</span>
              </div>
              
              <p className="text-gray-400 mb-8 max-w-md line-clamp-2">
                Crystal Processor 4K, PurColor Technology, and Motion Xcelerator for an ultra-vivid cinematic experience in your living room.
              </p>
              
              <div className="flex flex-wrap items-baseline gap-4 mb-8">
                <span className="text-4xl md:text-5xl font-bold">{formatKES(125000)}</span>
                <span className="text-xl text-gray-500 line-through">{formatKES(165000)}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Buy Now
                </button>
                <button className="px-8 py-4 bg-transparent border border-gray-600 text-white rounded-full font-semibold hover:border-white hover:bg-white/5 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FLASH SALE */}
      <section className="py-24 px-6 md:px-12 bg-[#F5F5F7]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-8 h-8 text-red-600 fill-red-600" />
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Flash Sale</h2>
              </div>
              <p className="text-gray-500">Hurry, offers end soon!</p>
            </div>
            <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm">
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ending in</span>
              <div className="flex gap-2 font-bold text-xl">
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg">08</span>
                <span>:</span>
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg">23</span>
                <span>:</span>
                <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg">45</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {flashSaleProducts.map((product, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] p-4 group hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4">
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                    -{product.discount}%
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white z-10 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="px-2 pb-4">
                  <p className="text-xs text-gray-500 font-semibold mb-1">{product.brand}</p>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-red-600">{formatKES(product.salePrice)}</p>
                      <p className="text-xs text-gray-400 line-through">{formatKES(product.originalPrice)}</p>
                    </div>
                    <button className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-black transform hover:scale-110 transition-all shadow-md">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEW ARRIVALS */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">New Arrivals</h2>
              <p className="text-gray-500 mt-2">The latest tech, just landed.</p>
            </div>
            <a href="#" className="hidden md:flex items-center text-sm font-semibold hover:text-blue-600 transition-colors">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {newArrivals.map((product, idx) => (
              <div key={idx} className="group relative">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F5F5F7] mb-4">
                  <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full z-10 uppercase tracking-wider">
                    New
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Hover Add to Cart Overlay */}
                  <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="translate-y-4 group-hover:translate-y-0 px-6 py-3 bg-white text-black rounded-full font-semibold shadow-xl transition-all duration-300 hover:bg-gray-100 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">{product.brand}</p>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 font-medium">{formatKES(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#1D1D1F] text-white pt-24 pb-12 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <a href="#" className="text-2xl font-bold tracking-tight text-white mb-6 inline-block">
                Munex <span className="text-gray-400 font-light">Electronics</span>
              </a>
              <p className="text-gray-400 mb-8 max-w-sm">
                Kenya's premier destination for luxury electronics and home appliances. Quality guaranteed, delivered to your doorstep.
              </p>
              
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Shop</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Flash Sales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Deal of the Day</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Top Rated</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Categories</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Phones & Tablets</a></li>
                <li><a href="#" className="hover:text-white transition-colors">TVs & Audio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Home Appliances</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Computing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</span>
                  <a href="tel:0720856892" className="text-white hover:text-blue-400 transition-colors">0720856892</a>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Location</span>
                  <span className="text-white">Narok, Kenya</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</span>
                  <a href="mailto:hello@munex.co.ke" className="text-white hover:text-blue-400 transition-colors">hello@munex.co.ke</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <p>© 2025 Munex Electronics. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Returns</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
