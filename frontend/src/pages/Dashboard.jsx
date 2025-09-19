import React from 'react';
import bgImage from '../assets/intro2.jpg';

export default function Dashboard() {
  return (
    <div
  className="flex-grow flex items-center justify-start text-left bg-cover bg-center relative"
  style={{
    backgroundImage: `url(${bgImage})`,
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>

  {/* Text Content constrained to left half */}
  <div>
    <div style={{
    maxWidth: '50%',
    backgroundColor: 'rgba(255, 192, 203, 0.2)',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255, 192, 203, 0.4)',
    zIndex: 10,
  }}
  className="relative"
>

      <h2 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg"  style={{ color: '#4B2E2E' }}>
        Welcome to Mithaas & Memories 🍬
      </h2>
      <p className="text-xl text-gray-100 mb-4 drop-shadow italic" style={{ color: '#4B2E2E', fontStyle: 'italic', fontWeight: '600' }} >
        Step into a world where every bite tells a story. At <span className="font-semibold">Mithaas & Memories</span>, we bring you a curated collection of traditional, fried, and premium sweets crafted with love and legacy.
      </p>
      <p className="text-lg text-gray-200 mb-4 drop-shadow" style={{ color: '#4B2E2E', fontStyle:'italic', fontWeight: '600' }}>
        Our recipes are more than just instructions — they’re heirlooms passed down through generations. From the golden crunch of laddoos to the delicate melt of pedas, each sweet is a tribute to timeless flavors.
      </p>
      <p className="text-lg text-gray-200 mb-4 drop-shadow" style={{ color: '#4B2E2E', fontStyle: 'italic', fontWeight: '600' }}>
        We use only the <span className="font-semibold">purest ingredients</span>: farm-fresh milk, hand-churned ghee, and dry fruits selected with care. No preservatives, no shortcuts — just honest sweetness.
      </p>
      <p className="text-lg text-gray-200 mb-4 drop-shadow" style={{ color: '#4B2E2E', fontStyle: 'italic', fontWeight: '600' }}>
        Our kitchens follow <span className="font-semibold">strict hygiene protocols</span>, with daily sanitization and chefs trained in food safety. Every batch undergoes rigorous quality checks to ensure perfection.
      </p>
      <p className="text-lg text-gray-200 mb-4 drop-shadow" style={{ color: '#4B2E2E', fontStyle: 'italic', fontWeight: '600' }}>
        Whether you're celebrating Diwali, gifting for a wedding, or simply craving a moment of indulgence, our sweets bring <span className="font-semibold">joy, nostalgia, and tradition</span> to your table. 🌸
      </p>
      <p className="text-lg text-gray-200 mb-8 drop-shadow" style={{ color: '#4B2E2E', fontStyle: 'italic', fontWeight: '600' }}>
        Come, relive the flavors of your childhood. Create new memories. And let sweetness be the language of your celebrations.
      </p>
      <h3 className="text-3xl font-bold italic mb-4" style={{ color: '#4B2E2E' }}>
        What Our Customers Say
      </h3>
        <ul className="list-disc pl-6 text-lg mb-6 drop-shadow" style={{ color: '#4B2E2E', fontStyle: 'italic', fontWeight: '600' }}>
            <li>“Tastes just like my nani used to make. Pure magic!”</li>
            <li>“The packaging, the flavors, the nostalgia—everything was perfect.”</li>
            <li>“Finally, a sweet shop that honors tradition without compromising quality.”</li>
        </ul>
    </div>
  </div>
</div>

  );
}