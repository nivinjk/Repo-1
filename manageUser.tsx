import { useRef } from "react";
import Table from "./userTable";
import FilterPanel from "./FilterPanel";

type Option = { label: string; value: string };

type Field =
  | { id: string; label: string; type: "text" | "number"; options?: Option[] } 
  | { id: string; label: string; type: "select"; options: Option[] };          


type FilterValues = Record<string, string | number | null>;

interface Props {
  fields: Field[];
  initialValues?: Partial<FilterValues>;
  onChange?: (values: FilterValues) => void;
  rows?: Array<Record<string , any>>
  cols ?: string[];
  t_name : string
}

export default function Manager({
  fields,
  initialValues = {},
  onChange,
  rows = [],
  cols = [],
  t_name
}: Props) {
  const pageScrollRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={pageScrollRef}
      className="h-[calc(100vh-61px)] overflow-auto bg-white text-gray-900"
      style={{ accentColor: "var(--brandColor)" }}
    >
      <div className="flex box-border">
        {/* Filter Panel */}
        <FilterPanel
          fields={fields}
          initialValues={initialValues}
          onChange={onChange}
          pageScrollRef={pageScrollRef}
        />

        {/* Main Content */}
        <div ref={mainRef}>
          {/* <div className="m-4 border border-gray-200 p-4 rounded-lg font-bold text-[20px] text-[#435955]">User Table</div> */}
          <Table rows={rows} cols={cols} t_name={t_name}/>
        </div>
      </div>
    </div>
  );
}