import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Assistant {
  id: string;
  name: string;
}

interface CreateNumberFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  assistants: Assistant[]
}

export default function CreateNumberForm({ onSubmit, onCancel, assistants }: CreateNumberFormProps) {
  const [provider, setProvider] = useState('vapi')
  const [number, setNumber] = useState('')
  const [assistantId, setAssistantId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      fallbackDestination: {
        type: "number",
        numberE164CheckEnabled: true,
        number: "<string>",
        extension: "<string>",
        message: "<string>",
        description: "<string>"
      },
      provider: provider,
      numberE164CheckEnabled: true,
      number: number,
      credentialId: "<string>",
      name: "<string>",
      assistantId: assistantId,
      squadId: "<string>",
      serverUrl: "<string>",
      serverUrlSecret: "<string>"
    }
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select value={provider} onValueChange={setProvider}>
        <SelectTrigger>
          <SelectValue placeholder="Select provider" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="vapi">Vapi</SelectItem>
          <SelectItem value="twilio">Twilio</SelectItem>
          <SelectItem value="vonage">Vonage</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Phone Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <Select value={assistantId} onValueChange={setAssistantId}>
        <SelectTrigger>
          <SelectValue placeholder="Select assistant" />
        </SelectTrigger>
        <SelectContent>
          {assistants.map((assistant) => (
            <SelectItem key={assistant.id} value={assistant.id}>
              {assistant.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Create</Button>
      </div>
    </form>
  )
}

