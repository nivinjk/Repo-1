import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";

type Option = { label: string; value: string };
type Field =
  | { id: string; label: string; type: "text" | "number"; options?: Option[] }
  | { id: string; label: string; type: "select"; options: Option[] };

type FilterValues = Record<string, string | number | null>;

interface FilterPanelProps {
  fields: Field[];
  initialValues?: Partial<FilterValues>;
  onChange?: (values: FilterValues) => void;
  pageScrollRef: React.RefObject<HTMLDivElement | null>;
}

export default function FilterPanel({
  fields,
  initialValues = {},
  onChange,
  pageScrollRef,
}: FilterPanelProps) {
  const filterContentRef = useRef<HTMLDivElement | null>(null);
  const [filterScrollable, setFilterScrollable] = useState(false);

  const initial: FilterValues = useMemo(() => {
    const obj: FilterValues = {};
    fields.forEach((f) => {
      obj[f.id] =
        f.type === "number"
          ? (initialValues[f.id] as number) ?? ("" as unknown as number)
          : (initialValues[f.id] as string) ?? "";
    });
    return obj;
  }, [fields, initialValues]);

  const [values, setValues] = useState<FilterValues>(initial);

  useEffect(() => {
    onChange?.(values);
  }, [values, onChange]);

  useEffect(() => {
    const el = filterContentRef.current;
    const page = pageScrollRef.current;
    if (!el || !page) return;

    const compute = () => {
      const vh = page.clientHeight;
      const contentHeight = el.scrollHeight;
      setFilterScrollable(contentHeight > vh);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    ro.observe(page);
    return () => ro.disconnect();
  }, [fields, pageScrollRef]);

  // Synchronized scrolling
  useEffect(() => {
    const page = pageScrollRef.current;
    const filterInner = filterContentRef.current;
    if (!page || !filterInner) return;

    filterInner.style.overflowY = filterScrollable ? "auto" : "hidden";

    const LINE_PX = 16;

    const applyDelta = (rawDy: number, deltaMode: number) => {
      let dy = rawDy;
      if (deltaMode === 1) dy = dy * LINE_PX;

      page.scrollTop += dy;

      if (filterScrollable) {
        const max = filterInner.scrollHeight - filterInner.clientHeight;
        const next = Math.min(max, Math.max(0, filterInner.scrollTop + dy));
        filterInner.scrollTop = next;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      applyDelta(e.deltaY, e.deltaMode);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const dy = touchStartY - currentY;
      e.preventDefault();
      applyDelta(dy, 0);
      touchStartY = currentY;
    };

    page.addEventListener("wheel", onWheel, { passive: false });
    page.addEventListener("touchstart", onTouchStart, { passive: true });
    page.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      page.removeEventListener("wheel", onWheel as any);
      page.removeEventListener("touchstart", onTouchStart as any);
      page.removeEventListener("touchmove", onTouchMove as any);
    };
  }, [filterScrollable, pageScrollRef]);

  return (
    <div className="relative">
      <div className="sticky top-0 p-2 w-80 min-h-[calc(100vh-61px)] flex flex-col border-r border-gray-200 bg-white ">
        {/* Header */}
        <div className="flex justify-between items-center p-2 border-b border-gray-200">
          <div className="sticky top-0 z-10 px-3 py-2 bg-white">
            <span className="text-lg font-medium text-gray-700">Filters</span>
          </div>
          <div>
            <Button 
              onClick={() => setValues(initial)} 
              className="text-[var(--brandColor)] bg-white hover:bg-white underline text-[14px] hover:text-[var(--brandColor-dark)] hover:cursor-pointer"
            >
              Clear Filter
            </Button>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          ref={filterContentRef}
          className={`px-3 py-3 flex flex-col gap-3 ${
            filterScrollable ? "overflow-y-auto scrollbar-hide" : "overflow-hidden"
          }`}
        >
          {fields.map((f) => {
            const common = {
              id: f.id,
              label: f.label,
              value: values[f.id] ?? "",
              onChange: (val: string | number) =>
                setValues((prev) => ({ ...prev, [f.id]: val })),
            };

            if (f.type === "text") {
              return (
                <LabeledText
                  key={f.id}
                  {...common}
                  placeholder={`Enter ${f.label}`}
                />
              );
            }
            if (f.type === "number") {
              return (
                <LabeledNumber
                  key={f.id}
                  {...common}
                  placeholder={`Enter ${f.label}`}
                />
              );
            }
            return (
              <LabeledSelect
                key={f.id}
                id={f.id}
                label={f.label}
                value={(values[f.id] ?? "") as string}
                options={f.options!}
                onChange={(v) => common.onChange(v)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Input Components */

function LabeledText({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: number | string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-gray-600">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 px-3 py-5 rounded-[4px] border border-gray-300 bg-white text-sm  text-gray-900 outline-none border focus:border-1 focus:border-emerald-500"
      />
    </div>
  );
}

function LabeledNumber({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: number | string;
  onChange: (v: number) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-gray-600">
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={value as any}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        className="h-9 px-3 py-5 rounded-[4px] border border-gray-300 bg-white text-sm  text-gray-900 outline-none border focus:border-1 focus:border-emerald-500"
      />
    </div>
  );
}

function LabeledSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Option[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-gray-600">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 px-2.5 rounded-[4px] text-sm border border-gray-300 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-[--brandColor] focus:border-[--brandColor]"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}