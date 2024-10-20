'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import VapiClient from '../../../vapi-client'
import { CreateAssistantForm } from '@/components/createAssistant'
import { Button } from '@/components/ui/button'

interface Assistant {
  id: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
  voice?: {
    provider: string;
    voiceId: string;
  };
  model?: {
    provider: string;
    model: string;
  };
  transcriber?: {
    provider: string;
    model: string;
    language: string;
  };
}

const SYSTEM_MESSAGE = `You are a personal voice assistant for Siddhi.

Your job is to handle incoming calls to Siddhi, like a personal assistant.

Your task is to converse with the caller and know their reasons for the call and answer them accordingly. 
You have to talk with them politely and get more information about the conversation.
Analayze the conversation and if its from the contact list, use the "transferCall" function to transfer the call to forwarded Number.
Analayze the conversation and if its important or urgent for Siddhi to pick now, use the "transferCall" function to transfer the call to the forwaded Number.


If its not urgent, converse and gather the information.

Don't end the call without gathering information. Before ending the call try to summarise the details and confirm from the caller.

If the caller is being rude, end the call with endCallFunction.`;
const FIRST_MESSAGE = `This is Siddhi's Personal Assistant. How can i help you?`;

export default function AssistantsPage() {
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const vapiClient = new VapiClient(process.env.NEXT_PUBLIC_PRIVATE_VAPI_API_KEY || '');
  useEffect(() => {
    fetchAssistants();
  }, [])

  async function fetchAssistants() {
    try {
      const response = await vapiClient.getAssistants();
      setAssistants(response);
    } catch (error) {
      console.error('Error fetching assistants:', error);
      setError('Failed to fetch assistants');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateAssistant(name: string, contactsFile: File | null) {
    try {
      let knowledgeBase = undefined;

      if (contactsFile) {
        const fileResponse = await vapiClient.uploadFile(contactsFile);
        console.log('File upload response:', fileResponse); // Log the response
        knowledgeBase = {
          provider: "canonical",
          topK: 5,
          fileIds: [fileResponse.id]
        };
      }

      const assistantData = {
        name,
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en",
          smartFormat: false,
          endpointing: 255
        },
        model: {
          messages: [{ role: "system", content: SYSTEM_MESSAGE }],
          provider: "anyscale",
          model: "mistral-7b-instruct",
          temperature: 1,
          maxTokens: 525,
          emotionRecognitionEnabled: true,
          numFastTurns: 1,
          knowledgeBase: knowledgeBase
        },
        voice: {
          fillerInjectionEnabled: false,
          provider: "azure",
          voiceId: "andrew",
          speed: 1.25,
          chunkPlan: {
            enabled: true,
            minCharacters: 30,
            punctuationBoundaries: ["。", "，", ".", "!", "?", ";", "،", "۔", "।", "॥", "|", "||", ",", ":"]
          }
        },
        firstMessageMode: "assistant-speaks-first",
        firstMessage: FIRST_MESSAGE,
        recordingEnabled: true,
        hipaaEnabled: false,
        clientMessages: [
          "conversation-update",
          "function-call",
          "hang",
          "model-output",
          "speech-update",
          "status-update",
          "transcript",
          "tool-calls",
          "user-interrupted",
          "voice-input"
        ],
        serverMessages: [
          "conversation-update",
          "end-of-call-report",
          "function-call",
          "hang",
          "speech-update",
          "status-update",
          "tool-calls",
          "transfer-destination-request",
          "user-interrupted"
        ],
        silenceTimeoutSeconds: 30,
        maxDurationSeconds: 600,
        backgroundSound: "office",
        backchannelingEnabled: false,
        backgroundDenoisingEnabled: false,
        modelOutputInMessagesEnabled: false
      };

      const newAssistant = await vapiClient.createAssistant(assistantData);
      setAssistants(prevAssistants => [...prevAssistants, newAssistant]);
    } catch (error) {
      console.error('Error creating assistant:', error);
      setError('Failed to create assistant');
    }
  }



  async function handleDeleteAssistant(id: string) {
    try {
      await vapiClient.deleteAssistant(id);
      setAssistants(prevAssistants => prevAssistants.filter(assistant => assistant.id !== id));
    } catch (error) {
      console.error('Error deleting assistant:', error);
      setError('Failed to delete assistant');
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Assistants</h1>
      <CreateAssistantForm onCreateAssistant={handleCreateAssistant} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {assistants.map((assistant) => (
          <Card key={assistant.id}>
            <CardHeader>
              <CardTitle>{assistant.name || 'Unnamed Assistant'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                Created: {new Date(assistant.createdAt).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {assistant.voice && (
                  <Badge variant="secondary">
                    Voice: {assistant.voice.provider} - {assistant.voice.voiceId}
                  </Badge>
                )}
                {assistant.model && (
                  <Badge variant="secondary">
                    Model: {assistant.model.provider} - {assistant.model.model}
                  </Badge>
                )}
                {assistant.transcriber && (
                  <Badge variant="secondary">
                    Transcriber: {assistant.transcriber.provider} - {assistant.transcriber.model}
                  </Badge>
                )}
              </div>
              <Button variant="destructive" onClick={() => handleDeleteAssistant(assistant.id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
