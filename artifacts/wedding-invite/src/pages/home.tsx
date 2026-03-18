import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, Download } from "lucide-react";
import RsvpForm from "@/components/rsvp-form";

async function exportRsvpCsv() {
  const response = await fetch(`${import.meta.env.BASE_URL}api/rsvp`.replace(/\/+/g, "/").replace(":/", "://"));
  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) {
    alert("Nenhuma confirmação encontrada ainda.");
    return;
  }
  const headers = ["Nome", "WhatsApp", "Acompanhantes", "Data de Confirmação"];
  const rows = data.map((r: any) => [
    `"${(r.guestName ?? "").replace(/"/g, '""')}"`,
    `"${(r.whatsapp ?? "").replace(/"/g, '""')}"`,
    `"${(r.companions ?? "").replace(/"/g, '""')}"`,
    `"${r.createdAt ? new Date(r.createdAt).toLocaleString("pt-BR") : ""}"`,
  ]);
  const csv = [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "confirmacoes-casamento-leonan-stephani.csv";
  link.click();
  URL.revokeObjectURL(url);
}

// Helper components for animation
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      
      {/* Background Textures & Decorative Images */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src={`${import.meta.env.BASE_URL}images/watercolor-bg.png`} 
          alt="" 
          className="w-full h-full object-cover opacity-40 mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />
      </div>

      <img 
        src={`${import.meta.env.BASE_URL}images/floral-corner.png`} 
        alt="" 
        className="absolute top-0 left-0 w-64 md:w-96 opacity-90 z-0 pointer-events-none -scale-x-100 origin-top-left" 
      />
      <img 
        src={`${import.meta.env.BASE_URL}images/floral-corner.png`} 
        alt="" 
        className="absolute bottom-0 right-0 w-64 md:w-96 opacity-90 z-0 pointer-events-none -scale-y-100 origin-bottom-right" 
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center">
        
        {/* HERO SECTION */}
        <section className="text-center w-full min-h-[70vh] flex flex-col items-center justify-center mb-20">
          <FadeIn delay={0.2}>
            <p className="text-primary font-sans uppercase tracking-[0.3em] text-sm md:text-base mb-8">
              Temos a honra de convidar para o casamento de
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4} className="w-full">
            <h1 className="font-script text-7xl md:text-8xl lg:text-[10rem] text-foreground leading-none mb-6 drop-shadow-sm">
              <span className="block mb-2 hover:scale-105 transition-transform duration-700">Leonan</span>
              <span className="block text-primary/70 text-5xl md:text-7xl lg:text-8xl my-2">&amp;</span>
              <span className="block mt-2 hover:scale-105 transition-transform duration-700">Stephani</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <img 
              src={`${import.meta.env.BASE_URL}images/gold-ornament.png`} 
              alt="ornament divider" 
              className="h-12 md:h-16 mx-auto opacity-70 my-10 object-contain mix-blend-multiply" 
            />
          </FadeIn>
        </section>

        {/* DETAILS SECTION */}
        <section className="w-full text-center mb-32">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-16">
              Os Detalhes
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-4xl mx-auto">
            {/* Date */}
            <FadeIn delay={0.1} className="flex flex-col items-center p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg shadow-primary/5 hover:shadow-xl hover:bg-white/60 transition-all duration-500 group">
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                <CalendarDays strokeWidth={1.5} className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-foreground">A Data</h3>
              <p className="font-sans text-muted-foreground leading-relaxed">
                Sábado,<br />
                <strong className="text-foreground font-medium text-lg">28 de Novembro de 2026</strong>
              </p>
            </FadeIn>

            {/* Time */}
            <FadeIn delay={0.3} className="flex flex-col items-center p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg shadow-primary/5 hover:shadow-xl hover:bg-white/60 transition-all duration-500 group">
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                <Clock strokeWidth={1.5} className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-foreground">O Horário</h3>
              <p className="font-sans text-muted-foreground leading-relaxed">
                A cerimônia iniciará pontualmente<br />
                <strong className="text-foreground font-medium text-lg">às 19:00 horas</strong>
              </p>
            </FadeIn>

            {/* Venue */}
            <FadeIn delay={0.5} className="flex flex-col items-center p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg shadow-primary/5 hover:shadow-xl hover:bg-white/60 transition-all duration-500 group">
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                <MapPin strokeWidth={1.5} className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl mb-3 text-foreground">O Local</h3>
              <p className="font-sans text-muted-foreground leading-relaxed text-balance">
                <strong className="text-foreground font-medium text-lg block mb-1">Sam Home</strong>
                Rua Suburbana, 478<br />
                Itaum, Joinville - SC
              </p>
            </FadeIn>
          </div>
        </section>

        {/* RSVP SECTION */}
        <section className="w-full mb-20 relative">
          <FadeIn>
            <div className="text-center mb-10">
              <img 
                src={`${import.meta.env.BASE_URL}images/gold-ornament.png`} 
                alt="ornament divider" 
                className="h-10 mx-auto opacity-50 mb-10 object-contain mix-blend-multiply" 
              />
            </div>
            
            <RsvpForm />
            
          </FadeIn>
        </section>

        {/* FOOTER */}
        <footer className="w-full text-center mt-20 pt-10 border-t border-primary/20">
          <p className="font-script text-4xl text-foreground/80 mb-2">Leonan & Stephani</p>
          <p className="font-sans text-xs tracking-widest text-muted-foreground uppercase">28.11.2026</p>
          <div className="mt-8">
            <button
              onClick={exportRsvpCsv}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground/60 hover:text-primary transition-colors duration-300 font-sans tracking-widest uppercase border border-muted-foreground/20 hover:border-primary/40 rounded-full px-4 py-2"
            >
              <Download className="w-3 h-3" />
              Exportar confirmações (.csv)
            </button>
          </div>
        </footer>

      </div>
    </main>
  );
}
