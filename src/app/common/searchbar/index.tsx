import { Input } from "@/components/ui/input";

const SearchBar: React.FC<{ searchTerm: string, setSearchTerm: (term: string) => void, placeholder: string }> = ({ searchTerm, setSearchTerm, placeholder }) => {

  return (
    <div className="flex items-center rounded-lg shadow bg-[#374664c4] px-2 mt-8">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 text-white dark:text-white bg-transparent border-none focus-visible:ring-offset-0 focus-visible:ring-0"
      />
      <SearchIcon className="text-gray-500 dark:text-gray-400 mr-2" />
    </div>
  );
}

export default SearchBar;

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
