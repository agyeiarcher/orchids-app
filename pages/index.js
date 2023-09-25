import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import GeneraList from '../components/GeneraList';

export default function Home() {
  const [genera, setGenera] = useState([]);
  const [displayGenera, setDisplayGenera] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data from CSV
  useEffect(() => {
    Papa.parse('/orchids.csv', {
      header: true,
      download: true,
      complete: (results) => {
        setGenera(results.data);
        setDisplayGenera(results.data);
      }
    });
  }, []);

  // Update displayed genera based on user interaction
  useEffect(() => {
    if (searchQuery) {
      setDisplayGenera(genera.filter(genus => genus.Hybrid_Genus.toLowerCase().includes(searchQuery.toLowerCase())));
    } else if (selectedLetter !== 'ALL') {
      setDisplayGenera(genera.filter(genus => genus.Hybrid_Genus.startsWith(selectedLetter)));
    } else {
      setDisplayGenera(genera);
    }
  }, [searchQuery, selectedLetter, genera]);

  return (
    <div className="container mx-auto px-4">
      <Search onSearch={setSearchQuery} />
      <Pagination onLetterSelect={setSelectedLetter} selectedLetter={selectedLetter} />
      <GeneraList genera={displayGenera} />
    </div>
  );
}
