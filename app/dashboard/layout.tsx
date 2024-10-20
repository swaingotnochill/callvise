import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Link, Settings, HomeIcon, HelpingHand, Phone } from "lucide-react"

const navItems = [
  { name: "Home", icon: HomeIcon, href: '/dashboard' },
  { name: "Assistants", icon: HelpingHand, href: '/dashboard/assistants' },
  { name: "Numbers", icon: Phone, href: '/dashboard/numbers' },
  { name: "Contacts", icon: Link, href: '/dashboard/contacts' },
  { name: "Settings", icon: Settings, href: '/dashborad/settings' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar collapsible="none" className="hidden md:flex">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <a href={item.href}>
                          <item.icon />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
