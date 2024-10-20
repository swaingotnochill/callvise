import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Construction } from 'lucide-react'

export default function WorkInProgressPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <Construction className="mx-auto h-12 w-12 text-yellow-500" />
        <h2 className="mt-2 text-2xl font-bold text-gray-900">Work in Progress</h2>
        <p className="mt-1 text-gray-500">This page is currently under construction. Please check back later.</p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}