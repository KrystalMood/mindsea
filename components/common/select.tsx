"use client";

import { Select as S } from "@/types/components";
import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  name,
  info = null,
  onChange,
  options,
  required,
  value,
}: S) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <fieldset
      className={`flex w-full flex-col justify-between ${!info ? "space-y-4" : ""}`}
    >
      <span>
        <label htmlFor={name} className="text-heading text-sm font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        {info && (
          <p className="text-text-secondary mt-1 mb-3 cursor-default text-xs">
            {info}
          </p>
        )}
      </span>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          className="border-border text-heading focus:border-primary focus:ring-primary/10 w-full appearance-none rounded-xl border bg-white py-4 pr-12 pl-5 text-sm transition-all outline-none focus:ring-2"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="text-text-secondary pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
          <ChevronDown size={18} />
        </span>
      </div>
    </fieldset>
  );
}
