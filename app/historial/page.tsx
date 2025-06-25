"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, MapPin, User, Phone } from "lucide-react"
import Link from "next/link"

interface TurnoHistorial {
  id: string
  centro: string
  profesional: string
  especialidad: string
  fecha: string
  hora: string
  direccion: string
  telefono: string
  estado: "aceptado" | "rechazado" | "cancelado" | "completado"
  fechaAccion: string
}

export default function Historial() {
  const [historial] = useState<TurnoHistorial[]>([
    {
      id: "h1",
      centro: "Centro Médico San Juan",
      profesional: "Dr. María González",
      especialidad: "Cardiología",
      fecha: "2024-12-10",
      hora: "14:30",
      direccion: "Av. Corrientes 1234",
      telefono: "011-4567-8901",
      estado: "completado",
      fechaAccion: "2024-12-08",
    },
    {
      id: "h2",
      centro: "Clínica Norte",
      profesional: "Dr. Carlos Rodríguez",
      especialidad: "Traumatología",
      fecha: "2024-12-05",
      hora: "10:00",
      direccion: "Av. Santa Fe 5678",
      telefono: "011-4567-8902",
      estado: "rechazado",
      fechaAccion: "2024-12-03",
    },
    {
      id: "h3",
      centro: "Hospital Central",
      profesional: "Dra. Ana Martínez",
      especialidad: "Dermatología",
      fecha: "2024-11-28",
      hora: "16:15",
      direccion: "Av. Rivadavia 9012",
      telefono: "011-4567-8903",
      estado: "cancelado",
      fechaAccion: "2024-11-26",
    },
    {
      id: "h4",
      centro: "Centro Médico Belgrano",
      profesional: "Dr. Luis Fernández",
      especialidad: "Oftalmología",
      fecha: "2024-12-20",
      hora: "09:00",
      direccion: "Av. Cabildo 2345",
      telefono: "011-4567-8904",
      estado: "aceptado",
      fechaAccion: "2024-12-12",
    },
  ])

  const getEstadoBadge = (estado: string) => {
    const configs = {
      aceptado: { variant: "default" as const, color: "bg-blue-500", text: "Confirmado" },
      completado: { variant: "default" as const, color: "bg-green-500", text: "Completado" },
      rechazado: { variant: "secondary" as const, color: "bg-red-500", text: "Rechazado" },
      cancelado: { variant: "outline" as const, color: "bg-orange-500", text: "Cancelado" },
    }

    const config = configs[estado as keyof typeof configs]
    return (
      <Badge
        variant={config.variant}
        className={
          estado === "completado"
            ? "bg-green-500 hover:bg-green-600"
            : estado === "aceptado"
              ? "bg-blue-500 hover:bg-blue-600"
              : ""
        }
      >
        {config.text}
      </Badge>
    )
  }

  const filtrarPorEstado = (estado: string) => {
    if (estado === "todos") return historial
    return historial.filter((turno) => turno.estado === estado)
  }

  const TurnoCard = ({ turno }: { turno: TurnoHistorial }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{turno.centro}</CardTitle>
            <CardDescription className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {turno.profesional}
              </span>
              <Badge variant="secondary">{turno.especialidad}</Badge>
            </CardDescription>
          </div>
          {getEstadoBadge(turno.estado)}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>{new Date(turno.fecha).toLocaleDateString("es-AR")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{turno.hora} hs</span>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {turno.direccion}
          </p>
          <p className="flex items-center gap-2 mt-1">
            <Phone className="h-4 w-4" />
            {turno.telefono}
          </p>
        </div>

        <div className="text-xs text-gray-500 pt-2 border-t">
          Acción realizada: {new Date(turno.fechaAccion).toLocaleDateString("es-AR")}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Historial de Turnos</h1>
            <p className="text-gray-600">Registro de todos tus turnos médicos</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {historial.filter((t) => t.estado === "completado").length}
              </div>
              <div className="text-sm text-gray-600">Completados</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {historial.filter((t) => t.estado === "aceptado").length}
              </div>
              <div className="text-sm text-gray-600">Confirmados</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {historial.filter((t) => t.estado === "rechazado").length}
              </div>
              <div className="text-sm text-gray-600">Rechazados</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {historial.filter((t) => t.estado === "cancelado").length}
              </div>
              <div className="text-sm text-gray-600">Cancelados</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros por pestañas */}
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="aceptado">Confirmados</TabsTrigger>
            <TabsTrigger value="completado">Completados</TabsTrigger>
            <TabsTrigger value="rechazado">Rechazados</TabsTrigger>
            <TabsTrigger value="cancelado">Cancelados</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-4 mt-6">
            {historial.map((turno) => (
              <TurnoCard key={turno.id} turno={turno} />
            ))}
          </TabsContent>

          <TabsContent value="aceptado" className="space-y-4 mt-6">
            {filtrarPorEstado("aceptado").map((turno) => (
              <TurnoCard key={turno.id} turno={turno} />
            ))}
          </TabsContent>

          <TabsContent value="completado" className="space-y-4 mt-6">
            {filtrarPorEstado("completado").map((turno) => (
              <TurnoCard key={turno.id} turno={turno} />
            ))}
          </TabsContent>

          <TabsContent value="rechazado" className="space-y-4 mt-6">
            {filtrarPorEstado("rechazado").map((turno) => (
              <TurnoCard key={turno.id} turno={turno} />
            ))}
          </TabsContent>

          <TabsContent value="cancelado" className="space-y-4 mt-6">
            {filtrarPorEstado("cancelado").map((turno) => (
              <TurnoCard key={turno.id} turno={turno} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
