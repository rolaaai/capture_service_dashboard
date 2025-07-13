// src/components/filters/Filter.tsx
import SearchIcon from "@mui/icons-material/Search";
const Filter = () => (
  <div className="flex justify-between items-end">
    <div className="flex space-x-2 ">
      <button className="btn">Meeting URL</button>
      <button className="btn">Status</button>
      <button className="btn">Platform</button>
      <button className="btn">Join At</button>
      <button className="btn">Custom Metadata</button>
    </div>
    <div className="relative w-full max-w-xs">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <SearchIcon fontSize="small" />
      </span>
      <input
        type="text"
        placeholder="Search"
        className="pl-9 pr-16 py-2 w-full border border-gray-200 rounded-md bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-100"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
        <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 rounded">
          ⌘
        </kbd>
        <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 rounded">
          K
        </kbd>
      </span>
    </div>
  </div>
);

export default Filter;
