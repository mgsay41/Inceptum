import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type FileUploadProps = {
  accept: string;
  maxSize: number;
  onFileSelect: (file: File | null) => void;
};

export function FileUpload({ accept, maxSize, onFileSelect }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        alert(`File size should not exceed ${maxSize / (1024 * 1024)}MB`);
        return;
      }
      setFileName(file.name);
      onFileSelect(file);
    } else {
      setFileName(null);
      onFileSelect(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <Button type="button" variant="outline" onClick={handleButtonClick}>
        Choose File
      </Button>
      <span className="text-sm text-muted-foreground">
        {fileName || "No file chosen"}
      </span>
    </div>
  );
}
