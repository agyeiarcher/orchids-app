// components/Search.js

function Search({ onSearch }) {
  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Search for Orchid Genera..."
        className="p-2 border rounded"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;