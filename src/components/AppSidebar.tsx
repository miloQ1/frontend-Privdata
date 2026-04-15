import { useLocation, Link } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FileCheck,
  ClipboardList,
  DatabaseZap,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"

interface NavItem {
  label: string
  path: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { label: "Dashboard",          path: "/dashboard",        icon: LayoutDashboard },
  { label: "Usuarios",           path: "/usuarios",         icon: Users },
  { label: "Titulares",          path: "/titulares",        icon: UserCheck },
  { label: "Consentimientos",    path: "/consentimientos",  icon: FileCheck },
  { label: "Solicitudes ARCO",   path: "/arco",             icon: ClipboardList },
  { label: "Auditoría",          path: "/auditoria",        icon: DatabaseZap },
]

export function AppSidebar() {
  const location = useLocation()
  const { logout, getUser } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const user = getUser()

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black shrink-0 bg-sidebar-primary text-sidebar-primary-foreground">
              PD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-sidebar-accent-foreground leading-tight">PrivData</p>
              <p className="text-xs text-sidebar-foreground/60 leading-tight">Ley 21.719</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black mx-auto bg-sidebar-primary text-sidebar-primary-foreground">
            PD
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            "p-1 rounded hover:bg-sidebar-accent transition-colors text-sidebar-foreground/60 hover:text-sidebar-accent-foreground",
            collapsed && "mx-auto mt-0"
          )}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        {!collapsed && (
          <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
            Módulos
          </p>
        )}
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* DEV — Vista del titular */}
      <div className="border-t border-sidebar-border px-2 py-2">
        <Link
          to="/portal"
          title="Vista Titular (DEV)"
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-colors text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          <Eye className="w-4 h-4 shrink-0" />
          {!collapsed && (
            <>
              <span>Vista Titular</span>
              <span
                className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{
                  background: "hsl(var(--sidebar-primary))",
                  color: "hsl(var(--sidebar-primary-foreground))",
                }}
              >
                DEV
              </span>
            </>
          )}
        </Link>
      </div>

      {/* Footer — usuario */}
      <div className="border-t border-sidebar-border p-3">
        {collapsed ? (
          <button
            onClick={logout}
            className="w-full flex justify-center p-2 rounded hover:bg-sidebar-accent transition-colors text-sidebar-foreground/60 hover:text-destructive"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-xs font-bold text-white shrink-0">
              {user?.name.split(" ").map((n) => n[0]).slice(0, 2).join("") ?? "??"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-sidebar-accent-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/50 truncate capitalize">{user?.role}</p>
            </div>
            <button
              onClick={logout}
              className="p-1 rounded hover:bg-sidebar-accent transition-colors text-sidebar-foreground/60 hover:text-destructive"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
