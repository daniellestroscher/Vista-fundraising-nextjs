import "./SearchBar.css";
type Props = {
  searchQuery: string;
  setSearchQuery: (arg: string) => void;
};
export default function searchBar({ searchQuery, setSearchQuery }: Props) {
  return (
    <div className="search">
      <form>
        <label htmlFor="header-search">
          <span className="box">
            Search Crowdfunds:
          </span>
        </label>
        <input
        className="input"
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          type="text"
          id="header-search"
          placeholder="Search by name or category"
        />
      </form>
    </div>
  );
}
