import { IoSearchOutline } from "react-icons/io5";

interface SearchFilterProps {
  filterBy: { title: string };
  setFilterBy: React.Dispatch<React.SetStateAction<{ title: string }>>;
}

const SearchFilter = ({ filterBy, setFilterBy }: SearchFilterProps) => {
  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy({ title: ev.target.value });
  };

  return (
    <div className="search-filter">
      <input
        className="search-bar"
        type="text"
        placeholder="Search products by title here..."
        value={filterBy.title}
        onChange={handleInputChange}
      />
      <IoSearchOutline className="search-icon" color={"#333"} size={22} />
    </div>
  );
};

export default SearchFilter;
