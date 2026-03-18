import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Heart, Loader2 } from "lucide-react";
import { useSubmitRsvp } from "@workspace/api-client-react";

const formSchema = z.object({
  guestName: z.string().min(2, "Por favor, insira seu nome completo."),
  whatsapp: z.string().min(10, "Por favor, insira um número de WhatsApp válido."),
  companions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RsvpForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitRsvpMutation = useSubmitRsvp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: "",
      whatsapp: "",
      companions: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await submitRsvpMutation.mutateAsync({ data });
      reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit RSVP:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-lg mx-auto bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-primary/20 text-center flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
          <Heart className="w-10 h-10 fill-primary" />
        </div>
        <h3 className="font-serif text-3xl text-foreground mb-4">Obrigado!</h3>
        <p className="text-muted-foreground font-sans text-base leading-relaxed max-w-sm mb-8">
          Sua presença foi confirmada. Estamos muito felizes por você celebrar este dia inesquecível conosco.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-primary hover:text-primary/80 font-medium text-sm tracking-widest uppercase transition-colors"
        >
          Enviar outra resposta
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl border border-primary/20">
      <div className="text-center mb-8">
        <h3 className="font-serif text-3xl text-foreground mb-2">Confirme sua Presença</h3>
        <p className="text-muted-foreground font-sans text-sm tracking-wide">
          Por favor, nos avise se poderá celebrar conosco até 28 de Outubro de 2026.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="guestName" className="block text-sm font-medium text-foreground tracking-wide uppercase text-xs">
            Nome Completo
          </label>
          <input
            id="guestName"
            {...register("guestName")}
            className={`w-full px-4 py-3 rounded-lg bg-white/50 border ${
              errors.guestName
                ? "border-destructive focus:ring-destructive/20"
                : "border-primary/30 focus:border-primary focus:ring-primary/20"
            } outline-none focus:ring-4 transition-all font-sans text-foreground placeholder:text-muted-foreground/60`}
            placeholder="Ex: Maria Antonieta Silva"
          />
          {errors.guestName && (
            <p className="text-destructive text-xs mt-1">{errors.guestName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground tracking-wide uppercase text-xs">
            WhatsApp
          </label>
          <input
            id="whatsapp"
            {...register("whatsapp")}
            className={`w-full px-4 py-3 rounded-lg bg-white/50 border ${
              errors.whatsapp
                ? "border-destructive focus:ring-destructive/20"
                : "border-primary/30 focus:border-primary focus:ring-primary/20"
            } outline-none focus:ring-4 transition-all font-sans text-foreground placeholder:text-muted-foreground/60`}
            placeholder="(00) 00000-0000"
          />
          {errors.whatsapp && (
            <p className="text-destructive text-xs mt-1">{errors.whatsapp.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="companions" className="block text-sm font-medium text-foreground tracking-wide uppercase text-xs">
            Acompanhantes (Opcional)
          </label>
          <textarea
            id="companions"
            {...register("companions")}
            rows={3}
            className="w-full px-4 py-3 rounded-lg bg-white/50 border border-primary/30 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all font-sans text-foreground placeholder:text-muted-foreground/60 resize-none"
            placeholder="Nomes dos acompanhantes que irão com você..."
          />
        </div>

        {submitRsvpMutation.isError && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm text-center">
            Ocorreu um erro ao enviar. Por favor, tente novamente.
          </div>
        )}

        <button
          type="submit"
          disabled={submitRsvpMutation.isPending}
          className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-primary/90 to-primary text-white font-serif text-lg tracking-wider shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {submitRsvpMutation.isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>Confirmar Presença</>
          )}
        </button>
      </form>
    </div>
  );
}
