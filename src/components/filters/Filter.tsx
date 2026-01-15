// src/components/filters/Filter.tsx
import SearchIcon from "@mui/icons-material/Search";

const Filter = () => (
  <div className="flex justify-between items-end filter-mobile">
    <div className="filter-scroll">
      <button className="btn whitespace-nowrap">Meeting URL</button>
      <button className="btn whitespace-nowrap">Status</button>
      <button className="btn whitespace-nowrap">Platform</button>
      <button className="btn whitespace-nowrap">Join At</button>
      <button className="btn whitespace-nowrap">Custom Metadata</button>
    </div>
    <div className="relative w-full max-w-xs search-box">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
        <SearchIcon fontSize="small" />
      </span>
      <input
        type="text"
        placeholder="Search"
        className="pl-9 pr-16 py-2 w-full border border-default rounded-md bg-surface text-primary placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
        <kbd className="px-1.5 py-0.5 text-xs font-semibold text-muted bg-surface border border-default rounded">
          ⌘
        </kbd>
        <kbd className="px-1.5 py-0.5 text-xs font-semibold text-muted bg-surface border border-default rounded">
          K
        </kbd>
      </span>
    </div>
  </div>
);

export default Filter;
