import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";

const useExcelData = (files: string[]) => {
  const [jsonData, setJsonData] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFetched = useRef(false); // ✅ Track if data was already fetched

  const readExcelFile = async (fileName: string) => {
    try {
      const response = await fetch(`/assets/${fileName}`);
      if (!response.ok) throw new Error(`Failed to load ${fileName}`);

      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      return XLSX.utils.sheet_to_json(worksheet);
    } catch (err) {
      setError(`Error loading ${fileName}: ${(err as Error).message}`);
      return [];
    }
  };

  useEffect(() => {
    if (isFetched.current) return; // ✅ Prevent multiple fetches
    isFetched.current = true;

    const fetchData = async () => {
      setLoading(true);
      const results: { [key: string]: any[] } = {};

      for (const file of files) {
        results[file] = await readExcelFile(file);
      }

      setJsonData(results);
      setLoading(false);
    };

    fetchData();
  }, [files]);

  return { jsonData, loading, error };
};

export default useExcelData;
