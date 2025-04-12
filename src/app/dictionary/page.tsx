'use client';

import {Input} from '@/components/ui/input';
import {useEffect, useState} from 'react';

const terms = [
  {id: 1, term: 'Логистика', definition: 'Процесс планирования, реализации и контроля процедур для эффективной и результативной транспортировки и хранения товаров, включая услуги и соответствующую информацию от точки происхождения до точки потребления с целью соответствия требованиям клиента.'},
  {id: 2, term: 'Цепь поставок', definition: 'Сеть между компанией и ее поставщиками для производства и распространения конкретного продукта, и цепь поставок представляет собой шаги, необходимые для доставки продукта или услуги клиенту.'},
  {id: 3, term: 'Склад', definition: 'Запланированное пространство для хранения и обработки товаров и материалов.'},
  {id: 4, term: 'Транспортировка', definition: 'Перемещение людей, товаров или услуг из одного места в другое.'},
  {id: 5, term: 'Инвентарь', definition: 'Полный список предметов, таких как имущество, товары в наличии или содержимое здания.'},
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
        Логистический <span className="text-primary">Глоссарий</span>
      </h1>

      <Input
        type="text"
        placeholder="Поиск термина"
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
