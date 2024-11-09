import { Input } from '@/components/ui/input';

type SearchInputProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
};

export default function SearchInput({ inputValue, setInputValue }: SearchInputProps) {
  return (
    <div className="relative w-full max-w-md">
      <svg
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500"
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
      <Input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search character by name..."
        className="mb-10 rounded-md border pl-10"
      />
    </div>
  );
}
