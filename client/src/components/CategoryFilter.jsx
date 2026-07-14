const CATEGORIES = ['All', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'];

const CategoryFilter = ({ selected, onChange }) => (
  <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
    {CATEGORIES.map((cat) => {
      const value = cat === 'All' ? '' : cat;
      const active = selected === value;
      return (
        <button
          key={cat}
          onClick={() => onChange(value)}
          aria-pressed={active}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
            active
              ? 'bg-brand-600 border-brand-600 text-white'
              : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
          }`}
        >
          {cat}
        </button>
      );
    })}
  </div>
);

export default CategoryFilter;
