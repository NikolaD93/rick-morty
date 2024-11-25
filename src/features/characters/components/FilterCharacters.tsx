import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FilterProps = {
  setFilterValue: (value: string) => void;
};

const statusValues = [
  {
    value: ' ',
    content: 'All',
  },
  {
    value: 'alive',
    content: 'Alive',
  },
  {
    value: 'dead',
    content: 'Dead',
  },
  {
    value: 'unknown',
    content: 'unknown',
  },
];

export const FilterCharacters = ({ setFilterValue }: FilterProps) => {
  return (
    <Select
      onValueChange={(value) => {
        setFilterValue(value);
      }}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Filter character by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statusValues.map((status, id) => (
            <SelectItem key={id} value={status.value}>
              {status.content}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
