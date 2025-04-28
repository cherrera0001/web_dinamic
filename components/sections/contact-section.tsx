"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({
    message: "",
    type: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);

      // Verifica que grecaptcha esté disponible
      if (typeof grecaptcha === "undefined") {
        setFormStatus({
          message: "reCAPTCHA no está disponible. Por favor, recargue la página.",
          type: "error",
        });
        setIsSubmitting(false);
        return;
      }

      // Generar el token de reCAPTCHA
      const token = await grecaptcha.enterprise.execute("6LcnyiQrAAAAAOMZji4M1EHoV27cknXX4DkuEC1k", { action: "submit" });

      // Enviar los datos del formulario a Formspree
      const response = await fetch("https://formspree.io/f/mblgzwvn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, "g-recaptcha-response": token }),
      });

      if (response.ok) {
        setFormStatus({
          message: "Mensaje enviado con éxito. Nos pondremos en contacto pronto.",
          type: "success",
        });
        reset(); // Limpiar formulario
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setFormStatus({
        message: "Error de conexión. Por favor, verifique su conexión a internet e inténtelo de nuevo.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);

      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setFormStatus({
          message: "",
          type: null,
        });
      }, 5000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Contáctenos <span className="text-offensive">Ahora</span>
            </h2>
            <p className="text-gray-300 mb-8">
              ¿Listo para fortalecer su postura de ciberseguridad? Contáctenos para una consulta o solicite una
              evaluación preliminar gratuita.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Mail className="h-5 w-5 text-offensive" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Email</h4>
                  <a href="mailto:contacto@c4a.cl" className="text-gray-400 hover:text-offensive transition-colors">
                    contact@c4a.cl
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Phone className="h-5 w-5 text-offensive" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Teléfono</h4>
                  <a href="tel:+56955338899" className="text-gray-400 hover:text-offensive transition-colors">
                    +56 9 5533 8899
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-offensive" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Ubicación</h4>
                  <p className="text-gray-400">Santiago, Chile</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-darker border border-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              Envíenos un <span className="text-offensive">Mensaje</span>
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="bg-dark border-gray-700 focus:border-offensive"
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="bg-dark border-gray-700 focus:border-offensive"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="mb-6 space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  {...register("company")}
                  className="bg-dark border-gray-700 focus:border-offensive"
                />
              </div>

              <div className="mb-6 space-y-2">
                <Label htmlFor="service">Servicio de Interés</Label>
                <Select name="service" onValueChange={(value) => register("service").onChange({ target: { value } })}>
                  <SelectTrigger className="bg-dark border-gray-700 focus:border-offensive">
                    <SelectValue placeholder="Seleccione un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethical-hacking">Ethical Hacking</SelectItem>
                    <SelectItem value="red-teaming">Red Teaming</SelectItem>
                    <SelectItem value="devsecops">DevSecOps</SelectItem>
                    <SelectItem value="security-training">Security Training</SelectItem>
                    <SelectItem value="maturity-assessment">Maturity Assessment</SelectItem>
                    <SelectItem value="managed-security">Managed Security</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6 space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  rows={4}
                  className="bg-dark border-gray-700 focus:border-offensive"
                  aria-invalid={errors.message ? "true" : "false"}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-offensive hover:bg-offensive/90 text-white font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              </Button>

              {formStatus.type && (
                <div
                  className={`mt-4 p-3 rounded text-center ${
                    formStatus.type === "success" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"
                  }`}
                  role="alert"
                >
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}