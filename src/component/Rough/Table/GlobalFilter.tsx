import { useState } from "react";
import { useAsyncDebounce } from "react-table";
interface IGlobalFilterProps {
  filter: string;
  setFilter: (value: string | undefined) => void;
}

const GlobalFilter: React.FC<IGlobalFilterProps> = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <div>
      <span>
        Search:{" "}
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        ></input>
      </span>
    </div>
  );
};

export default GlobalFilter;
