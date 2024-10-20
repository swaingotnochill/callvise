'use client'

import { useState, useEffect } from 'react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from 'lucide-react'
import VapiClient from '../../../vapi-client'
import CreateNumberForm from '@/components/createNumberForm'

interface Assistant {
  id: string;
  name: string;
}

interface PhoneNumber {
  id: string;
  name: string;
  number: string;
  provider: string;
  assistantId: string;
}

export default function NumbersPage() {
  const [numbers, setNumbers] = useState<PhoneNumber[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingNumber, setEditingNumber] = useState<PhoneNumber | null>(null)
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const vapiClient = new VapiClient(process.env.NEXT_PUBLIC_PRIVATE_VAPI_KEY || "");

  useEffect(() => {
    fetchNumbers()
    fetchAssistants()
  }, [])

  async function fetchNumbers() {
    try {
      const response = await vapiClient.getPhoneNumbers()
      setNumbers(response)
    } catch (error) {
      console.error('Error fetching numbers:', error)
      setError('Failed to fetch numbers')
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchAssistants() {
    try {
      const response = await vapiClient.getAssistants()
      setAssistants(response)
    } catch (error) {
      console.error('Error fetching assistants:', error)
    }
  }

  async function handleCreateNumber(numberData: any) {
    try {
      const newNumber = await vapiClient.createPhoneNumber(numberData)
      setNumbers(prevNumbers => [...prevNumbers, newNumber])
      setIsFormOpen(false)
    } catch (error) {
      console.error('Error creating number:', error)
      setError('Failed to create number')
    }
  }

  async function handleUpdateNumber(numberData: any) {
    try {
      const updatedNumber = await vapiClient.updatePhoneNumber(editingNumber!.id, numberData)
      setNumbers(prevNumbers => prevNumbers.map(number =>
        number.id === editingNumber!.id ? updatedNumber : number
      ))
      setIsFormOpen(false)
      setEditingNumber(null)
    } catch (error) {
      console.error('Error updating number:', error)
      setError('Failed to update number')
    }
  }

  async function handleDeleteNumber(id: string) {
    try {
      await vapiClient.deletePhoneNumber(id)
      setNumbers(prevNumbers => prevNumbers.filter(number => number.id !== id))
    } catch (error) {
      console.error('Error deleting number:', error)
      setError('Failed to delete number')
    }
  }

  function handleEditClick(number: PhoneNumber) {
    setEditingNumber(number)
    setIsFormOpen(true)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Phone Numbers</h1>
      <Button onClick={() => { setEditingNumber(null); setIsFormOpen(true); }}>Create Number</Button>


      {isFormOpen && (
        <CreateNumberForm
          onSubmit={handleCreateNumber}
          onCancel={() => setIsFormOpen(false)}
          assistants={assistants}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {numbers.map((number) => (
          <Card key={number.id}>
            <CardHeader>
              <CardTitle>{number.name || 'Unnamed Number'}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Number: {number.number}</p>
              <p>Provider: {number.provider}</p>
              <p>Assistant ID: {number.assistantId}</p>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="icon" onClick={() => handleEditClick(number)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDeleteNumber(number.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

