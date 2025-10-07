// components/event-list/EventCard.tsx
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Event } from "./EventListPage";
import { Button } from "@/components/ui/button";
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

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(event.id);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card className="bg-white rounded-2xl shadow-[4px_4px_54px_0px_#0000000D] p-6 border border-gray-100">
        <h3 className="text-2xl font-semibold text-center text-primary">
          {event.name}
        </h3>

        <div className="space-y-2">
          <div className="flex items-start">
            <span className="font-semibold text-gray-900 min-w-[80px]">
              Date :
            </span>
            <span className="text-gray-600">{event.date}</span>
          </div>

          <div className="flex items-start">
            <span className="font-semibold text-gray-900 min-w-[80px]">
              Time :
            </span>
            <span className="text-gray-600">
              {event.startTime} - {event.endTime}
            </span>
          </div>

          <div className="flex items-start">
            <span className="font-semibold text-gray-900 min-w-[80px]">
              Location
            </span>
            <span className="text-gray-600">{event.location}</span>
          </div>

          <div className="flex items-start">
            <span className="font-semibold text-gray-900 min-w-[80px]">
              Type:
            </span>
            <span className="text-gray-600">{event.description}</span>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button
            size="lg"
            onClick={() => onEdit(event)}
            className="bg-gray-900 px-8 text-white hover:bg-gray-800 transition-colors"
          >
            Edit
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleDeleteClick}
            className=" text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Delete
          </Button>
        </div>
      </Card>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event "{event.name}" from your event list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
