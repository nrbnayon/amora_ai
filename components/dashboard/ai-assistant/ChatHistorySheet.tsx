// components/ai-assistant/ChatHistorySheet.tsx
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X, MessageSquare, Trash2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

interface ChatHistorySheetProps {
  isOpen: boolean;
  onClose: () => void;
  chatSessions: ChatSession[];
  onSelectChat: (session: ChatSession) => void;
  onDeleteChat: (sessionId: string) => void;
}

export function ChatHistorySheet({
  isOpen,
  onClose,
  chatSessions,
  onSelectChat,
  onDeleteChat,
}: ChatHistorySheetProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    setSessionToDelete(sessionId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (sessionToDelete) {
      onDeleteChat(sessionToDelete);
      setDeleteDialogOpen(false);
      setSessionToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSessionToDelete(null);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-primary text-black overflow-y-auto gap-0 p-0"
        >
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-semibold text-white">
                Chat History
              </SheetTitle>
              <button
                onClick={onClose}
                className="text-white hover:text-white/80 border rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </SheetHeader>

          <div className="bg-white text-black  p-5 min-h-fit md:min-h-screen space-y-6">
            <h3 className="text-sm font-semibold text-black mb-4">
              Recent Chats
            </h3>
            <div className="space-y-2">
              {chatSessions.map((session) => (
                <div
                  key={session.id}
                  className="w-full text-black flex items-center justify-between  bg-white/10 hover:bg-white/20 rounded-lg transition-colors group"
                >
                  <button
                    onClick={() => onSelectChat(session)}
                    className="flex items-center gap-3 flex-1 min-w-0 text-left"
                  >
                    <MessageSquare className="w-5 h-5 text-black/60 flex-shrink-0" />
                    <span className="text-black text-sm font-medium truncate">
                      {session.title}
                    </span>
                  </button>
                  <button
                    onClick={(e) => handleDeleteClick(e, session.id)}
                    className="ml-2 p-2 text-black/40 hover:text-red-500 transition-colors flex-shrink-0"
                    aria-label="Delete chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
