"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Calendar,
  Search,
  PlusCircle,
  BarChart
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500"
  },
  {
    label: "Team",
    icon: Users,
    href: "/team",
    color: "text-orange-700"
  },
  {
    label: "Search",
    icon: Search,
    href: "/search",
    color: "text-violet-500"
  },
  {
    label: "Projects",
    icon: PlusCircle,
    href: "/projects",
    color: "text-pink-700"
  },
  {
    label: "Calendar",
    icon: Calendar,
    href: "/calendar",
    color: "text-emerald-500"
  },
  {
    label: "Reports",
    icon: BarChart,
    href: "/reports",
    color: "text-green-700"
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#1E1F21] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">
            Jira Clone
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}