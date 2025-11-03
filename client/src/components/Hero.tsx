import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const defaultHeroImage = "https://images.squarespace-cdn.com/content/v1/593c208b46c3c411477414d4/550a3dee-2e6d-43f2-9988-cfc9b2615454/roofing+services.jpg";

interface HeroProps {
  businessName: string;
  phoneNumber: string;
  heroImage?: string | null;
}

export function Hero({ businessName, phoneNumber, heroImage }: HeroProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Aanvraag verzonden!",
        description: "We nemen zo spoedig mogelijk contact met u op.",
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Er is iets misgegaan",
        description: "Probeer het later opnieuw.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <section 
      className="relative min-h-[600px] md:min-h-[700px] flex items-center"
      style={{
        backgroundImage: `url(${heroImage || defaultHeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Hero Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold font-poppins mb-6 leading-tight">
              Professionele Dakdekker Diensten
            </h1>
            
            {/* USP Checkmarks */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle style="color:#1FBD5A !important;" className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-base md:text-lg text-white/95">VCA-gecertificeerd & volledig verzekerd</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle style="color:#1FBD5A !important;" className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-base md:text-lg text-white/95">15+ jaar ervaring in dakdekkerswerkzaamheden</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle style="color:#1FBD5A !important;" className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-base md:text-lg text-white/95">Gratis offerte binnen 24 uur</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle style="color:#1FBD5A !important;" className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-base md:text-lg text-white/95">Garantie op al ons werk</span>
              </div>
            </div>

            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              {businessName} is uw betrouwbare partner voor alle dakwerkzaamheden. 
              Van nieuwbouw tot renovatie, wij leveren vakwerk van de hoogste kwaliteit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                variant="default"
                className="font-poppins font-semibold text-lg px-8 shadow-lg hover:shadow-xl transition-shadow"
                data-testid="button-hero-offerte"
                onClick={() => {
                  const element = document.getElementById("contact");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Gratis Offerte
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="font-poppins font-semibold text-lg px-8 bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20"
                asChild
                data-testid="button-hero-bel"
              >
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Bel Direct
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Quick Contact Form */}
          <div className="bg-card/95 backdrop-blur-md p-6 md:p-8 rounded-2xl border-2 border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="mb-6 text-center">
              <h3 className="text-xl md:text-2xl font-bold font-poppins text-card-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Vraag Direct een Offerte Aan
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Naam *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background border-2 border-muted focus:border-primary transition-colors h-12"
                data-testid="input-hero-name"
              />
              <Input
                type="tel"
                placeholder="Telefoonnummer *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-background border-2 border-muted focus:border-primary transition-colors h-12"
                data-testid="input-hero-phone"
              />
              <Input
                type="email"
                placeholder="E-mailadres *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background border-2 border-muted focus:border-primary transition-colors h-12"
                data-testid="input-hero-email"
              />
              <Textarea
                placeholder="Korte omschrijving van uw project"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="bg-background border-2 border-muted focus:border-primary transition-colors resize-none"
                data-testid="textarea-hero-message"
              />
              <Button 
                type="submit" 
                size="lg"
                className="w-full font-poppins font-semibold text-base h-12 shadow-lg hover:shadow-xl transition-all"
                disabled={submitMutation.isPending}
                data-testid="button-hero-submit"
              >
                {submitMutation.isPending ? "Verzenden..." : "Verstuur Aanvraag"}
              </Button>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-muted/30">
                <div className="flex items-center justify-center p-3 bg-background rounded-lg border border-muted/50">
                  <img 
                    src="https://www.vca.nl/application/files/1815/6198/9140/vca-logo-transparant.png" 
                    alt="VCA Certificering"
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-center p-3 bg-background rounded-lg border border-muted/50">
                  <img 
                    src="https://e7.pngegg.com/pngimages/341/135/png-clipart-logo-google-customer-service-review-google.png" 
                    alt="Google Reviews"
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
