import { SearchIcon } from "@/assets/icons/SearchIcon";

export function SearchBar() {
    return (
        <form>
            <div className="relative">
                <SearchIcon className="absolute left-2 top-1.5 " />
                <input
                    className="flex h-7 w-full rounded-md bg-muted dark:bg-slate-800 px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 placeholder:text-muted-foreground pl-8 pr-8"
                    placeholder="Search..."
                ></input>
                <p className="block absolute right-2 top-0.5 text-muted-foreground font-thin">
                    ⌘/
                </p>
            </div>
        </form>
    );
}
