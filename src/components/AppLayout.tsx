import { Outlet, Navigate } from "react-router-dom"
import { AppSidebar } from "@/components/AppSidebar"
import { useAuth } from "@/hooks/use-auth"

export function AppLayout() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-14 border-b border-border flex items-center px-6 shrink-0 bg-card">
          <div
            className="w-1 h-5 rounded-full mr-3"
            style={{ background: "hsl(var(--primary))" }}
          />
          <p className="text-sm text-muted-foreground">
            Sistema de Gestión — Protección de Datos Personales · Ley 21.719
          </p>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
