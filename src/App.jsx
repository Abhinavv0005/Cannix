import React, { useState } from 'react';
import './App.css';

const WHATSAPP_NUMBER = "919876543210"; 
const STORE_NAME = "AUM";
const STORE_TAGLINE = "AYUSH MEDICAL";
const NOTIFICATION_TEXT = "🔥 HYPE DROP: GET 10% OFF ALL PREPAID ORDERS! ⚡ FREE SHIPPING OVER ₹1699 🚀 SALE ENDS SOON!";
const HEADER_SUPPORT_MESSAGE = "Hello, I need some help with your store.";
const headerWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(HEADER_SUPPORT_MESSAGE)}`;

const rawProducts = [
    {
        name: "Premium Wireless Earbuds",
        price: "₹1,499",
        original_price: "₹2,999",
        tag: "Hot Deal",
        images: [
            "https://drive.google.com/file/d/1evxNUYedefufkGxpaX1Q1M--w0WD3Orc/view?usp=drive_link",
            "https://drive.google.com/file/d/1Zh8Qid5cUjceEFHC_wsxRNgaNUZFMso2/view?usp=drive_link"
        ],
        desc: "High-quality sound with noise cancellation. 24-hour battery life."
    },
    {
        name: "Smart Fitness Watch",
        price: "₹2,299",
        original_price: "₹3,499",
        tag: "Sale",
        images: [
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=60"
        ],
        desc: "Track your heart rate, steps, and sleep. Water-resistant up to 50m."
    },
    {
        name: "Leather Men's Wallet",
        price: "₹799",
        original_price: "₹1,299",
        tag: "Bestseller",
        images: [
            "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1628156108159-863a152fb1d0?auto=format&fit=crop&w=500&q=60"
        ],
        desc: "100% genuine leather with RFID blocking technology."
    },
    {
        name: "HD Action Camera",
        price: "₹4,999",
        original_price: "₹7,999",
        tag: "50% Off",
        images: [
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=500&q=60"
        ],
        desc: "Capture your adventures in stunning 4K resolution. Includes waterproof case."
    }
];

const products = rawProducts.map(product => ({
    ...product,
    images: product.images.map(imgUrl => {
        const match = imgUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (match) {
            return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
        }
        return imgUrl;
    })
}));

export default function App() {
    const [isFabActive, setIsFabActive] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getBuyUrl = (product) => {
        const message = `Hello, I want to buy this product from ${STORE_NAME}:\n\n*Product:* ${product.name}\n*Price:* ${product.price}\n*Image URL:* ${product.images[0]}\n\nPlease tell me how to proceed with the payment.`;
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProduct(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <div className="notification-bar">
                <div className="ticker-text">
                    {NOTIFICATION_TEXT} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {NOTIFICATION_TEXT}
                </div>
            </div>

            <header className="site-header">
                <div className="brand-container">
                    <a href="#" className="logo">{STORE_NAME}</a>
                    <span className="tagline">{STORE_TAGLINE}</span>
                </div>
                <a href={headerWhatsappUrl} target="_blank" rel="noreferrer" className="contact-support-icon" title="Chat with us on WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413.6c-33.1 0-65.5-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.1l-4.4-7.1c-18.4-29.6-28.1-63.9-28.1-98.8 0-103.7 84.4-188.1 188.3-188.1 50.3 0 97.5 19.6 133.1 55.2 35.6 35.6 55.2 82.8 55.2 133.1 0 103.7-84.4 188.2-188.4 188.2zM327 302.3c-5.6-2.8-33.4-16.5-38.6-18.4-5.2-1.9-9-.2-12.8 5.6-3.8 5.7-14.7 18.4-18 22.2-3.3 3.8-6.6 4.3-12.2 1.4-5.6-2.8-23.8-8.8-45.3-27.9-16.7-14.9-28-33.3-31.3-39-3.3-5.7-.4-8.8 2.5-11.6 2.6-2.6 5.6-6.6 8.5-9.9 2.8-3.3 3.8-5.7 5.7-9.5 1.9-3.8.9-7.1-.5-9.9-1.4-2.8-12.8-30.9-17.5-42.3-4.6-11.2-9.2-9.7-12.8-9.9-3.3-.2-7.1-.2-10.9-.2-3.8 0-9.9 1.4-15.1 7.1-5.2 5.7-20.8 20.3-20.8 49.7s21.3 57.7 24.3 61.8c2.8 3.8 42.1 64.3 102 90.1 14.3 6.2 25.4 9.9 34.1 12.7 14.4 4.6 27.5 3.9 37.9 2.4 11.6-1.7 33.4-13.7 38.1-26.9 4.7-13.2 4.7-24.5 3.3-26.9-1.4-2.4-5.2-3.8-10.8-6.6z"/>
                    </svg>
                </a>
            </header>

            <div className="banner">
                <h1>{STORE_NAME}</h1>
                <p>Up to 50% Off on top electronics and premium accessories. Limited stock. Cop the best deals before they are gone forever.</p>
            </div>

            <h2 className="section-title">Trending Now</h2>

            <div className="products-grid">
                {products.map((product, index) => {
                    const buyUrl = getBuyUrl(product);
                    
                    return (
                        <div key={index} className="product-card" onClick={() => openModal(product)}>
                            <div className="slider-container">
                                {product.tag && <div className="product-tag">{product.tag}</div>}
                                
                                <div className="product-slider">
                                    {product.images.map((img, i) => (
                                        <img key={i} src={img} alt={product.name} />
                                    ))}
                                </div>
                                
                                {product.images.length > 1 && <div className="swipe-hint">Swipe ➔</div>}
                            </div>

                            <div className="product-info">
                                <h2 className="product-title">{product.name}</h2>
                                <div className="price-container">
                                    <div className="product-price">{product.price}</div>
                                    {product.original_price && <div className="original-price">{product.original_price}</div>}
                                </div>
                                <div className="product-desc">{product.desc}</div>
                                
                                <a href={buyUrl} target="_blank" rel="noreferrer" className="buy-btn" onClick={(e) => e.stopPropagation()}>
                                    Buy Now
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedProduct && (
                <div className={`modal-overlay active`} onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>X</button>
                        <h2 className="modal-title">{selectedProduct.name}</h2>
                        <div className="product-price">{selectedProduct.price}</div>
                        <p className="modal-desc">{selectedProduct.desc}</p>
                    </div>
                </div>
            )}
        </>
    );
}