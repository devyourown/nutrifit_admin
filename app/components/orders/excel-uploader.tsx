import { updateTrackingNumbers } from "@/app/lib/api";
import { useState } from "react";
import * as XLSX from "xlsx";

interface ExcelUploaderProps {
  onClose: () => void;
  fetchOrders: (page: number) => void;
}

export default function ExcelUploader({
  onClose,
  fetchOrders,
}: ExcelUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      parseExcelFile(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      parseExcelFile(droppedFile);
      setFile(droppedFile);
    }
  };

  const parseExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setParsedData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    if (parsedData.length > 0) {
      const items = parsedData.map((item) => {
        return {
          orderId: item["주문번호"],
          productName: item["주문상품"],
          quantity: item["주문수"],
          trackingNumber: item["운송장번호"],
        };
      });
      const result = await updateTrackingNumbers(items);
      if (result) {
        alert("운송장번호가 성공적으로 등록되었습니다.");
        fetchOrders(0);
        onClose();
      } else {
        alert("운송장번호 업로드에 실패 했습니다.");
      }
    }
    onClose(); // 업로드 후 모달 닫기
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer"
    >
      <p className="text-gray-600 mb-4">
        엑셀 파일을 드래그하거나 클릭해서 파일을 선택하세요.
      </p>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {file && <p className="mt-4 text-green-600">선택된 파일: {file.name}</p>}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleSubmit}
        disabled={!file}
      >
        업로드
      </button>
    </div>
  );
}
