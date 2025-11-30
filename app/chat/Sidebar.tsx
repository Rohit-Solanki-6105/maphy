import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../../components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "../../components/ui/dialog";
import { MoreVertical, PlusIcon } from "lucide-react";

export default function Sidebar({ chatSessionId, setChatSessionId }: { chatSessionId: string | null, setChatSessionId: (id: string) => void }) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [renameDialogId, setRenameDialogId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/chat/sessions")
      .then((res) => res.json())
      .then((data) => setSessions(data.sessions));
  }, [chatSessionId]);

  return (
    <aside className="w-64 bg-gray-100 p-4 border-r h-screen flex flex-col">
      <div className="mb-4 font-bold text-lg flex flex-row gap-2 justify-between items-center">
        <h2>
          Maphy
        </h2>
        <Button
          className="mt-4"
          variant={"outline"}
          size={"icon"}
          onClick={async () => {
            const res = await fetch("/api/chat/session", { method: "POST" });
            const data = await res.json();
            setChatSessionId(data.session.id);
          }}
          title="New Chat"
        >
          <PlusIcon />
        </Button>
      </div>
      <input
        type="text"
        className="mb-2 px-2 py-1 border rounded w-full"
        placeholder="Search chats..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-1 overflow-y-auto">
        {sessions
          .filter(session => {
            const label = session.name && session.name.trim().length > 0
              ? session.name
              : new Date(session.createdAt).toLocaleString();
            return label.toLowerCase().includes(search.toLowerCase());
          })
          .map((session) => (
            <div key={session.id} className="mb-2 flex items-center group">
              <Button
                variant={session.id === chatSessionId ? "default" : "outline"}
                className="w-full text-left truncate"
                style={{ maxWidth: '180px' }}
                onClick={() => setChatSessionId(session.id)}
              >
                <span className="truncate block">
                  {session.name && session.name.trim().length > 0
                    ? session.name
                    : new Date(session.createdAt).toLocaleString()}
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm" className="ml-2 opacity-70 group-hover:opacity-100">
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => { setRenameDialogId(session.id); setEditName(session.name || ""); }}>Rename</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog open={renameDialogId === session.id} onOpenChange={val => { if (!val) setRenameDialogId(null); }}>
                <DialogContent className="max-w-xs">
                  <DialogHeader>
                    <DialogTitle>Rename Chat</DialogTitle>
                  </DialogHeader>
                  <input
                    className="border rounded px-2 py-1 w-full mt-2"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    autoFocus
                  />
                  <div className="flex gap-2 mt-4 justify-end">
                    <Button
                      size="sm"
                      onClick={async () => {
                        await fetch("/api/chat/sessions", {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ id: session.id, name: editName }),
                        });
                        setRenameDialogId(null);
                        setEditName("");
                        // Refresh sessions
                        fetch("/api/chat/sessions")
                          .then((res) => res.json())
                          .then((data) => setSessions(data.sessions));
                      }}
                    >Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setRenameDialogId(null)}>Cancel</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
      </div>

    </aside>
  );
}
