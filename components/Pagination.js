// components/Pagination.js

function Pagination({ onLetterSelect, selectedLetter }) {
  const alphabets = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  return (
    <div className="flex space-x-2 my-4">
      {alphabets.map((alphabet) => (
        <button
          key={alphabet}
          className={`px-2 py-1 ${alphabet === selectedLetter ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => onLetterSelect(alphabet)}
        >
          {alphabet}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
