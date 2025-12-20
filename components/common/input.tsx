"use client";

import { useState, useRef, ChangeEvent, WheelEvent } from "react";
import { Input as I } from "@/types/components";
import { Eye, EyeOff, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function Input({ icon, label, name, onChange, placeholder, required, type, info = null, value = undefined }: I) {
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (type === "number") newValue = newValue.replace(/[^0-9.,]/g, "").replace(/(,.*?),/g, "$1");
    else if (type === "text") newValue = newValue.replace(/[^a-zA-Z0-9\s.,?!:;'"\-()\/]/g, "");

    e.target.value = newValue;
    onChange?.(e);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onChange?.(e);
    }
  };

  const handleWheel = (e: WheelEvent<HTMLInputElement>) => {
    if (type === "number") e.currentTarget.blur();
  };

  return (
    <fieldset className={`flex w-full flex-col justify-between ${!info ? "space-y-4" : ""}`}>
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
      {type === "file" ? (
        <div className="flex items-center gap-4">
          <span className="border-border relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border bg-white">
            {preview ? (
              <Image height={1920} width={1080} src={preview} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <i className="text-text-secondary flex h-full w-full items-center justify-center">
                <ImageIcon size={24} />
              </i>
            )}
          </span>
          <span className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              id={name}
              name={name}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={required}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary hover:bg-primary/90 flex w-fit cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-all"
            >
              <Upload size={16} />
              Pilih Gambar
            </button>
            <p className="text-text-secondary mt-1 cursor-default text-xs">
              Maksimal 2MB (JPG, PNG)
            </p>
          </span>
        </div>
      ) : (
        <div className="relative">
          {icon && (
            <span className="text-text-secondary absolute inset-y-0 left-0 flex items-center pl-5">
              {icon}
            </span>
          )}
          <input
            id={name}
            name={name}
            type={type === "password" ? showPassword ? "text" : "password" : type || "text"}
            value={value}
            placeholder={placeholder}
            required={required}
            autoComplete="off"
            step={type === "number" ? "any" : undefined}
            onChange={handleInput}
            onWheel={handleWheel}
            className={`border-border text-heading placeholder:text-text-secondary focus:border-primary focus:ring-primary/10 box-border w-full rounded-xl border bg-white py-4 text-sm transition-all outline-none placeholder:text-sm focus:ring-2 ${icon ? "pl-14" : "pl-5"} ${type === "password" ? "pr-12" : "pr-5"}`}
          />
          {type === "password" && (
            <span onClick={() => setShowPassword((prev) => !prev)} className="text-text-secondary absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer transition-colors hover:text-heading">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          )}
        </div>
      )}
    </fieldset>
  );
}