import { useState } from 'react';
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateAssistantFormProps {
  onCreateAssistant: (name: string, contactsFile: File | null) => Promise<void>;
}

export function CreateAssistantForm({ onCreateAssistant }: CreateAssistantFormProps) {
  const [name, setName] = useState('');
  const [contactsFile, setContactsFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateAssistant(name, contactsFile);
    setName('');
    setContactsFile(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Assistant</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Assistant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="contacts">Contacts (TXT)</Label>
              <Input id="contacts" type="file" accept=".txt" onChange={(e) => setContactsFile(e.target.files?.[0] || null)} />
            </div>
          </div>
          <Button type="submit" className="mt-4">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

