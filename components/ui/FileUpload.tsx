import { PaperclipIcon } from "lucide-react";
import React, { useRef } from "react";
import { Button } from "./button";

export default function FileUpload({ files, setFiles }: { files: File[], setFiles: (files: File[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        multiple
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <Button size={"icon"} type="button" variant={"outline"} onClick={() => inputRef.current?.click()}>
        <PaperclipIcon />
      </Button>
      <div className="mt-2 flex flex-wrap gap-2">
        {files.map((file, idx) => (
          <div key={idx} className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
            <span className="truncate max-w-[120px]">{file.name}</span>
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => removeFile(idx)}
              title="Remove file"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
