import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import OpenBoxPage from './components/OpenBox/OpenBoxPage';

interface MysteryBox {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

function App() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mysteryBoxes: MysteryBox[] = [
    {
      id: 1,
      name: t('boxes.basic.name'),
      price: 5,
      description: t('boxes.basic.description'),
      category: 'basic'
    },
    {
      id: 2,
      name: t('boxes.premium.name'),
      price: 10,
      description: t('boxes.premium.description'),
      category: 'premium'
    }
  ];

  const handleLogoClick = () => {
    setSelectedCategory('all');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
        <Header handleLogoClick={handleLogoClick} />
        <Routes>
          <Route path="/open-box" element={<OpenBoxPage />} />
          <Route
            path="/"
            element={
              <>
                <Navigation selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                {selectedCategory === 'all' && <Hero />}
                <ProductGrid
                  selectedCategory={selectedCategory}
                  mysteryBoxes={mysteryBoxes}
                  setSelectedCategory={setSelectedCategory}
                />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;