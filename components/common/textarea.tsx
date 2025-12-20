"use client";

import { TextArea as T } from "@/types/components";

export default function TextArea({
  label,
  name,
  info = null,
  rows = 4,
  minLength,
  maxLength,
  onChange,
  placeholder,
  required,
  value,
  disabled = false,
}: T) {
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
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        rows={rows}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
        disabled={disabled}
        className="border-border text-heading placeholder:text-text-secondary focus:border-primary focus:ring-primary/10 w-full resize-y rounded-xl border bg-white px-5 py-4 text-sm transition-all outline-none focus:ring-2 disabled:opacity-50"
      />
      {maxLength && (
        <p className="text-text-secondary mt-1 text-sm">
          {value?.length || 0} / {maxLength} karakter
        </p>
      )}
    </fieldset>
  );
}
