export default function CategoryCard({ category, onClick }) {
    return (
      <div
        onClick={onClick}
        className="bg-white p-4 shadow rounded cursor-pointer hover:bg-mcYellow"
      >
        <h2 className="font-bold">{category.name}</h2>
      </div>
    );
  }
  