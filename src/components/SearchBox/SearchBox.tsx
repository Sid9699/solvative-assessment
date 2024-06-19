import { ChangeEvent, useEffect, useRef } from "react";
import "./SearchBox.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const SearchBox = (props: Props) => {
  const { onChange, value, disabled, placeholder } = props;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const callback = (event: KeyboardEvent) => {
      // event.metaKey - pressed Command key on Macs
      // event.ctrlKey - pressed Control key on Linux or Windows
      if ((event.metaKey || event.ctrlKey) && event.code === "Slash") {
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="search-box">
      <input
        ref={ref}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      <span className="keyboard-shortcut">Ctrl + /</span>
    </div>
  );
};
