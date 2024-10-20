import { redirect } from 'next/navigation'
import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../authOptions'
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator
} from "../../components/ui/breadcrumb"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/login')
  }

  // Session.user => {name, email, image}
  return (
    <div className="space-y-4">
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard {session.user?.name}</p>
      {/* Add your dashboard content here */}
    </div>
  )

}
