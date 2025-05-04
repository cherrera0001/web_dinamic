"client-only";

"use client";
import type {} from "react";
import { useState } from "react";
import type { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Loader2 as Loader2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

declare var grecaptcha: any;

export default function ContactSection() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsLoading(true);

      if (typeof grecaptcha === "undefined") {
        toast({
          variant: "destructive",
          description: "reCAPTCHA no está disponible. Recargue la página.",
        });
        setIsLoading(false);
        return;
      }

      const token = await new Promise<string>((resolve, reject) => {
        grecaptcha.ready(() => {
          grecaptcha
            .execute("6LcnyiQrAAAAAOMZji4M1EHoV27cknXX4DkuEC1k", {
              action: "submit",
            })
            .then(resolve)
            .catch(reject);
        });
      });

      const formData = new FormData();
      formData.append("name", sanitizeInput(data.name));
      formData.append("email", sanitizeInput(data.email));
      formData.append("company", data.company ? sanitizeInput(data.company) : "");
      formData.append("message", sanitizeInput(data.message));
      formData.append("g-recaptcha-response", token);
      formData.append("_gotcha", "");

      const response = await fetch("https://formspree.io/f/mblgzwvn", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({ description: "Mensaje enviado con éxito." });
        reset();
        window.location.href = "/gracias.html";
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast({
        variant: "destructive",
        description:
          "Error al enviar el mensaje. Intente nuevamente más tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Contáctenos <span className="text-offensive">Ahora</span>
            </h2>
            <p className="text-gray-300 mb-8">
              ¿Listo para fortalecer su postura de ciberseguridad? Escríbanos.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <MailIcon className="h-5 w-5 text-offensive mt-1" />
                <div className="ml-4">
                  <h4 className="font-bold">Email</h4>
                  <a href="mailto:contact@c4a.cl" className="text-gray-400 hover:text-offensive">
                    contact@c4a.cl
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <PhoneIcon className="h-5 w-5 text-offensive mt-1" />
                <div className="ml-4">
                  <h4 className="font-bold">Teléfono</h4>
                  <a href="tel:+56955338899" className="text-gray-400 hover:text-offensive">
                    +56 9 5533 8899
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPinIcon className="h-5 w-5 text-offensive mt-1" />
                <div className="ml-4">
                  <h4 className="font-bold">Ubicación</h4>
                  <p className="text-gray-400">Santiago, Chile</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-darker border border-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              Envíenos un <span className="text-offensive">Mensaje</span>
            </h3>
            <input
              type="text"
              id="_gotcha"
              name="_gotcha"
              style={{ display: "none" }}
              tabIndex={-1}
              aria-hidden={true}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" {...register("name")} className="bg-dark border-gray-700 focus:border-offensive" />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} className="bg-dark border-gray-700 focus:border-offensive" />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
              </div>
              <div className="mb-6 space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" {...register("company")} className="bg-dark border-gray-700 focus:border-offensive" />
              </div>
              <div className="mb-6 space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" rows={4} {...register("message")} className="bg-dark border-gray-700 focus:border-offensive" />
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
              </div>
              <Button
                type="submit"
                className="w-full bg-offensive hover:bg-offensive/90 text-white font-bold"
                disabled={!isValid || isSubmitting || isLoading}
              >
                {isLoading ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : null}
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
