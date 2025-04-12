'use client';

import {Input} from '@/components/ui/input';
import {useEffect, useState} from 'react';

const terms = [
  {id: 1, term: 'Logistics', definition: 'The process of planning, implementing, and controlling procedures for the efficient and effective transportation and storage of goods including services and related information from the point of origin to the point of consumption for the purpose of conforming to customer requirements.'},
  {id: 2, term: 'Supply Chain', definition: 'A network between a company and its suppliers to produce and distribute a specific product, and the supply chain represents the steps it takes to get the product or service to the customer.'},
  {id: 3, term: 'Warehouse', definition: 'A planned space for the storage and handling of goods and materials.'},
  {id: 4, term: 'Transportation', definition: 'The movement of people, goods, or services from one location to another.'},
  {id: 5, term: 'Inventory', definition: 'A complete list of items such as property, goods in stock, or the contents of a building.'},
];

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedTerm, setHighlightedTerm] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      const foundTerm = terms.find((term) =>
        term.term.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setHighlightedTerm(foundTerm ? foundTerm.id : null);
    } else {
      setHighlightedTerm(null);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center mb-8 animate-fade-in">
        Logistics <span className="text-primary">Glossary</span>
      </h1>

      <Input
        type="text"
        placeholder="Search for a term"
        className="w-full md:w-1/2 mb-4 rounded-full shadow-md transition-all duration-300 focus:ring-primary focus:border-primary animate-slide-in-bottom"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="w-full md:w-1/2">
        {terms.map((term) => (
          <div
            key={term.id}
            className={`mb-2 p-4 rounded-md shadow-sm transition-all duration-300 animate-fade-in ${
              highlightedTerm === term.id ? 'bg-accent' : 'bg-muted'
            }`}
          >
            <h2 className="text-lg font-semibold">{term.term}</h2>
            <p className="text-sm text-muted-foreground">{term.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
