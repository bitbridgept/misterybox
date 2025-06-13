import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MysteryBox from './MysteryBox';
import PrizeDisplay from './PrizeDisplay';
import DailyPool from './DailyPool';

interface MysteryBox {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

interface ProductGridProps {
  selectedCategory: string;
  mysteryBoxes: MysteryBox[];
  setSelectedCategory: (category: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategory, mysteryBoxes, setSelectedCategory }) => {
  const filteredBoxes = selectedCategory === 'all' 
    ? mysteryBoxes 
    : mysteryBoxes.filter(box => box.category === selectedCategory);

  return (
    <section className={`px-4 pb-16 ${selectedCategory === 'all' ? '' : 'pt-32 md:pt-48'}`}>
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
            grid gap-8 mx-auto
            ${selectedCategory === 'all' 
              ? 'grid-cols-1 md:grid-cols-2 max-w-4xl' 
              : 'grid-cols-1 max-w-md'
            }
          `}
        >
          {filteredBoxes.map((box) => (
            <MysteryBox
              key={box.id}
              name={box.name}
              price={box.price}
              description={box.description}
              category={box.category}
              onClick={() => setSelectedCategory(box.category)}
              showPurchaseOptions={selectedCategory !== 'all'}
            />
          ))}
        </motion.div>
        
        {selectedCategory === 'all' && <DailyPool />}
        
        {selectedCategory !== 'all' && (
          <PrizeDisplay category={selectedCategory as 'basic' | 'premium'} />
        )}
      </div>
    </section>
  );
};

export default ProductGrid;