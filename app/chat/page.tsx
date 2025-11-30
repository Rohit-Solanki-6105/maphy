"use client";
import { useEffect, useRef, useState } from "react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import Sidebar from "./Sidebar";
import Markdown from "../../components/ui/markdown";
import GraphingCalculator from "@/components/ui/GraphingCalculator";
// import GraphingCalculator from "../../components/ui/GraphingCalculator";
import FileUpload from "../../components/ui/FileUpload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Send } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover";

export default function ChatPage() {
  const [chatSessionId, setChatSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState<string>("Math");
  const [model, setModel] = useState<string>("gemini-2.5-pro");
  const [showCalculator, setShowCalculator] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load model from localStorage on mount
    const stored = localStorage.getItem("chat_model");
    if (stored && ["gemini-2.5-pro", "gemini-2.5-flash"].includes(stored)) {
      setModel(stored);
    }
  }, []);

  useEffect(() => {
    if (model) localStorage.setItem("chat_model", model);
  }, [model]);

  // Remove auto-create session on mount

  useEffect(() => {
    if (!chatSessionId) return;
    fetch(`/api/chat/history?chatSessionId=${chatSessionId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages));
  }, [chatSessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    let sessionId = chatSessionId;
    try {
      // Always create session if not present, then send message
      if (!sessionId) {
        const res = await fetch("/api/chat/session", { method: "POST" });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to create session");
        }
        const data = await res.json();
        sessionId = data.session.id;
        if (!sessionId) throw new Error("Session ID missing after creation");
        setChatSessionId(sessionId);
      }
      // Prepare FormData for files and message
      const formData = new FormData();
      formData.append("content", input);
      formData.append("chatSessionId", sessionId);
      formData.append("domain", domain);
      formData.append("model", model);
      files.forEach((file, idx) => {
        formData.append("files", file, file.name);
      });
      const res = await fetch("/api/chat/send", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        let errMsg = "Failed to send message";
        try {
          const errData = await res.json();
          if (errData.error) errMsg = errData.error;
        } catch {}
        throw new Error(errMsg);
      }
      const data = await res.json();
      setMessages((prev) => [...prev, data.userMessage, data.geminiMessage]);
      setInput("");
      // Optionally clear files after sending
      setFiles([]);
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar chatSessionId={chatSessionId} setChatSessionId={setChatSessionId} />
      <div className="flex-1 flex flex-col p-4">
        
        <div className="mb-4 flex gap-2 items-center">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" type="button">
                Model: {model === "gemini-2.5-pro" ? "Gemini 2.5 Pro" : model === "gemini-2.5-flash" ? "Gemini 2.5 Flash" : "Select"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2">
              <div className="font-semibold mb-2">Select Model</div>
              {["gemini-2.5-pro", "gemini-2.5-flash"].map(opt => (
                <button
                  key={opt}
                  className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${model === opt ? "bg-gray-200" : ""}`}
                  onClick={() => { setModel(opt); setPopoverOpen(false); }}
                  type="button"
                >
                  {opt === "gemini-2.5-pro" ? "Gemini 2.5 Pro" : "Gemini 2.5 Flash"}
                </button>
              ))}
            </PopoverContent>
          </Popover>
          <label htmlFor="domain" className="font-semibold">Domain:</label>
          <select
            id="domain"
            value={domain}
            onChange={e => setDomain(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="Math">Math</option>
            <option value="Graphing">Graphing</option>
            <option value="Physics">Physics</option>
            <option value="Computer Science">Computer Science</option>
          </select>
{/*           
            <button
              type="button"
              className="ml-4 px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => setShowCalculator(true)}
            >
              Open Graphing Calculator
            </button> */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button">
                  Open Graphing Calculator
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[90%] min-w-[90%] flex flex-col">
                <DialogHeader>
                  <DialogTitle>Graphing Calculator</DialogTitle>
                  <DialogDescription>
                    Use the graphing calculator to visualize mathematical functions.
                  </DialogDescription>
                </DialogHeader>
                <GraphingCalculator />
              </DialogContent>
            </Dialog>
            {/* <GraphingCalculator /> */}
          
        </div>
        <div className="flex-1 overflow-y-auto mb-4 rounded p-2 bg-white">
          {messages.map((msg, idx) => (
            <div
              key={`${msg.id}-${idx}` || idx}
              className={`mb-2 text-sm flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "gemini" && (
                <span className="mr-2 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold">G</span>
              )}
              {msg.sender === "gemini" ? (
                <span className={`block px-3 py-2 rounded-lg bg-gray-100 text-gray-800`}>
                  <Markdown>{msg.content}</Markdown>
                </span>
              ) : (
                <span className={`block px-3 py-2 rounded-lg bg-blue-100 text-blue-800`}>{msg.content}</span>
              )}
              {msg.sender === "user" && (
                <span className="ml-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">U</span>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          className="flex w-full gap-2 border p-2 rounded-lg items-center"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <div className="w-full flex flex-col gap-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Type your ${domain.toLowerCase()} question...`}
              disabled={loading}
              className="w-full flex-1 border-0 outline-0 ring-0 shadow-none"
            />
            <FileUpload files={files} setFiles={setFiles} />
          </div>
          <Button type="submit"  disabled={loading || !input.trim()}>
            {loading ? "..." : <Send />}
          </Button>
        </form>
          
      </div>
    </div>
  );
}
