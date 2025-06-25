"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Plus, Calendar, Clock, User, MapPin, Trash2 } from "lucide-react"
import Link from "next/link"

interface TurnoDisponible {
  id: string
  profesional: string
  especialidad: string
  fecha: string
  hora: string
  disponible: boolean
  centro: string
}

export default function AdminPanel() {
  const { toast } = useToast()
  const [turnosDisponibles, setTurnosDisponibles] = useState<TurnoDisponible[]>([
    {
      id: "1",
      profesional: "Dr. María González",
      especialidad: "Cardiología",
      fecha: "2024-12-15",
      hora: "14:30",
      disponible: true,
      centro: "Centro Médico San Juan",
    },
    {
      id: "2",
      profesional: "Dr. Carlos Rodríguez",
      especialidad: "Traumatología",
      fecha: "2024-12-16",
      hora: "10:00",
      disponible: true,
      centro: "Centro Médico San Juan",
    },
    {
      id: "3",
      profesional: "Dra. Ana Martínez",
      especialidad: "Dermatología",
      fecha: "2024-12-17",
      hora: "16:15",
      disponible: false,
      centro: "Centro Médico San Juan",
    },
  ])

  const [nuevoTurno, setNuevoTurno] = useState({
    profesional: "",
    especialidad: "",
    fecha: "",
    hora: "",
    centro: "Centro Médico San Juan",
  })

  const especialidades = [
    "Cardiología",
    "Traumatología",
    "Dermatología",
    "Oftalmología",
    "Neurología",
    "Pediatría",
    "Ginecología",
    "Urología",
  ]

  const profesionales = [
    "Dr. María González",
    "Dr. Carlos Rodríguez",
    "Dra. Ana Martínez",
    "Dr. Luis Fernández",
    "Dra. Carmen López",
    "Dr. Roberto Silva",
  ]

  const agregarTurno = () => {
    if (!nuevoTurno.profesional || !nuevoTurno.especialidad || !nuevoTurno.fecha || !nuevoTurno.hora) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return
    }

    const turno: TurnoDisponible = {
      id: Date.now().toString(),
      ...nuevoTurno,
      disponible: true,
    }

    setTurnosDisponibles((prev) => [...prev, turno])
    setNuevoTurno({
      profesional: "",
      especialidad: "",
      fecha: "",
      hora: "",
      centro: "Centro Médico San Juan",
    })

    toast({
      title: "✅ Turno agregado",
      description: "El turno ha sido agregado exitosamente y estará disponible para los afiliados",
      duration: 3000,
    })
  }

  const toggleDisponibilidad = (id: string) => {
    setTurnosDisponibles((prev) =>
      prev.map((turno) => (turno.id === id ? { ...turno, disponible: !turno.disponible } : turno)),
    )

    const turno = turnosDisponibles.find((t) => t.id === id)
    toast({
      title: turno?.disponible ? "Turno deshabilitado" : "Turno habilitado",
      description: turno?.disponible
        ? "El turno ya no estará disponible para los afiliados"
        : "El turno ahora está disponible para los afiliados",
    })
  }

  const eliminarTurno = (id: string) => {
    setTurnosDisponibles((prev) => prev.filter((turno) => turno.id !== id))
    toast({
      title: "Turno eliminado",
      description: "El turno ha sido eliminado del sistema",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600">Centro Médico San Juan - Gestión de Turnos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulario para agregar turnos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Agregar Nuevo Turno
              </CardTitle>
              <CardDescription>Crea nuevos turnos disponibles para los afiliados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profesional">Profesional</Label>
                <Select
                  value={nuevoTurno.profesional}
                  onValueChange={(value) => setNuevoTurno((prev) => ({ ...prev, profesional: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar profesional" />
                  </SelectTrigger>
                  <SelectContent>
                    {profesionales.map((prof) => (
                      <SelectItem key={prof} value={prof}>
                        {prof}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="especialidad">Especialidad</Label>
                <Select
                  value={nuevoTurno.especialidad}
                  onValueChange={(value) => setNuevoTurno((prev) => ({ ...prev, especialidad: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {especialidades.map((esp) => (
                      <SelectItem key={esp} value={esp}>
                        {esp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={nuevoTurno.fecha}
                    onChange={(e) => setNuevoTurno((prev) => ({ ...prev, fecha: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora">Hora</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={nuevoTurno.hora}
                    onChange={(e) => setNuevoTurno((prev) => ({ ...prev, hora: e.target.value }))}
                  />
                </div>
              </div>

              <Button onClick={agregarTurno} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Turno
              </Button>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas del Centro</CardTitle>
              <CardDescription>Resumen de turnos y disponibilidad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {turnosDisponibles.filter((t) => t.disponible).length}
                  </div>
                  <div className="text-sm text-green-700">Turnos Disponibles</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {turnosDisponibles.filter((t) => !t.disponible).length}
                  </div>
                  <div className="text-sm text-gray-700">Turnos Ocupados</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {new Set(turnosDisponibles.map((t) => t.especialidad)).size}
                  </div>
                  <div className="text-sm text-blue-700">Especialidades</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Set(turnosDisponibles.map((t) => t.profesional)).size}
                  </div>
                  <div className="text-sm text-purple-700">Profesionales</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de turnos */}
        <Card>
          <CardHeader>
            <CardTitle>Turnos Programados</CardTitle>
            <CardDescription>Gestiona la disponibilidad de los turnos existentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {turnosDisponibles.map((turno) => (
                <div
                  key={turno.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{turno.profesional}</span>
                      </div>
                      <Badge variant="secondary">{turno.especialidad}</Badge>
                      <Badge variant={turno.disponible ? "default" : "outline"}>
                        {turno.disponible ? "Disponible" : "Ocupado"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(turno.fecha).toLocaleDateString("es-AR")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {turno.hora} hs
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {turno.centro}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => toggleDisponibilidad(turno.id)}>
                      {turno.disponible ? "Deshabilitar" : "Habilitar"}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => eliminarTurno(turno.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
