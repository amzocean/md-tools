"use client";

import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from "react";
import { useSiteConfig } from "./SiteProvider";
import MarkdownPreview from "./MarkdownPreview";
import PdfExportButton from "./PdfExportButton";
import { sampleMarkdown } from "@/config/sample";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_EXTENSIONS = [".md", ".markdown", ".txt"];

interface MarkdownToolProps {
  onContentLoaded?: () => void;
}

export default function MarkdownTool({ onContentLoaded }: MarkdownToolProps) {
  const config = useSiteConfig();
  const [markdown, setMarkdown] = useState("");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasNotified = useRef(false);

  // Notify parent when content first appears
  const notifyContentLoaded = useCallback(() => {
    if (!hasNotified.current && onContentLoaded) {
      hasNotified.current = true;
      onContentLoaded();
    }
  }, [onContentLoaded]);

  const clearError = () => setError(null);

  const validateAndReadFile = useCallback((file: File) => {
    clearError();
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      setError("Please upload a .md, .markdown, or .txt file.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5 MB limit.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        setMarkdown(text);
        setActiveTab("preview");
        notifyContentLoaded();
      }
    };
    reader.onerror = () => setError("Failed to read file. Please try again.");
    reader.readAsText(file);
  }, []);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndReadFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndReadFile(file);
  };

  const handleClear = () => {
    setMarkdown("");
    setError(null);
    setActiveTab("edit");
    hasNotified.current = false;
  };

  const handleLoadSample = () => {
    setMarkdown(sampleMarkdown);
    setActiveTab("preview");
    clearError();
    notifyContentLoaded();
  };

  return (
    <section id="tool" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 rounded-md text-sm font-medium text-white ${config.theme.primary} ${config.theme.primaryHover} transition-colors`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload .md
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.markdown,.txt"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={handleLoadSample}
          className="inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Load Sample
        </button>
        <button
          onClick={handleClear}
          disabled={!markdown}
          className="inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-1.5 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Clear
        </button>
        {config.features.pdfExport && (
          <div className="ml-auto">
            <PdfExportButton disabled={!markdown.trim()} />
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
          <button onClick={clearError} className="ml-auto text-red-500 hover:text-red-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Mobile tabs */}
      <div className="flex sm:hidden mb-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-2 text-sm font-medium text-center border-b-2 transition-colors ${
            activeTab === "edit"
              ? "border-gray-900 text-gray-900"
              : "border-transparent text-gray-500"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-2 text-sm font-medium text-center border-b-2 transition-colors ${
            activeTab === "preview"
              ? "border-gray-900 text-gray-900"
              : "border-transparent text-gray-500"
          }`}
        >
          Preview
        </button>
      </div>

      {/* Editor + Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Editor */}
        <div
          className={`${activeTab !== "edit" ? "hidden sm:block" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div
            className={`relative rounded-xl border-2 transition-colors ${
              isDragging
                ? "border-blue-400 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-blue-50/80 rounded-xl z-10">
                <p className="text-blue-600 font-medium text-sm">
                  Drop your .md file here
                </p>
              </div>
            )}
            <textarea
              value={markdown}
              onChange={(e) => {
                setMarkdown(e.target.value);
                clearError();
              }}
              placeholder="Paste or type your Markdown here, or drag & drop a .md file..."
              className="w-full h-[300px] sm:h-[500px] p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-sm bg-transparent"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Preview */}
        <div
          className={`${activeTab !== "preview" ? "hidden sm:block" : ""}`}
        >
          <div className="rounded-xl border-2 border-gray-200 bg-white p-4 h-[300px] sm:h-[500px] overflow-y-auto markdown-preview">
            <MarkdownPreview content={markdown} />
          </div>
        </div>
      </div>
    </section>
  );
}
