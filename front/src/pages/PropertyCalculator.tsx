import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calculator, DollarSign, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PropertyForm } from "@/components/calculator/PropertyForm";

type SaleResult = {
  estimatedPrice: number;
  minPrice: number;
  maxPrice: number;
} | null;

const PropertyCalculator = () => {
  const { toast } = useToast();

  const [saleData, setSaleData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    neighborhood: "",
    condition: "",
    cep: "",
    street: "",
    city: "",
    state: "",
  });

  const [saleResult, setSaleResult] = useState<SaleResult>(null);

  const calculateSalePrice = async () => {
    const payload = {
      area: parseFloat(saleData.area),
      quartos: Number(saleData.bedrooms),
      banheiros: Number(saleData.bathrooms),
      garagem: Number(saleData.parking),
    };

    try {
      const response = await fetch("http://localhost:8000/prever_preco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro na requisição");

      const data = await response.json();
      setSaleResult({
        estimatedPrice: data.preco_sugerido,
        minPrice: data.preco_sugerido,
        maxPrice: data.preco_sugerido,
      });

      toast({
        title: "Cálculo realizado!",
        description: "Estimativa de preço calculada com sucesso",
      });
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
      toast({
        title: "Erro na calculadora",
        description: "Preencha todos os campos obrigatórios (área e bairro)",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Calculadora de Preços
          </h1>
          <p className="text-muted-foreground">
            Estimativas inteligentes para venda e locação
          </p>
        </div>

        <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <Calculator className="h-6 w-6 text-primary" />
        </div>
      </header>

      <Tabs defaultValue="sale" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="sale">Calculadora de Venda</TabsTrigger>
        </TabsList>

        <TabsContent value="sale" className="space-y-6">
          {/* --------------- FORM & RESULT --------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* ---------- CARD: FORM ---------- */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Dados do Imóvel
                </CardTitle>
                <CardDescription>
                  Preencha as informações para calcular o preço de venda
                </CardDescription>
              </CardHeader>

              <CardContent>
                <PropertyForm data={saleData} onChange={setSaleData} />

                <Button
                  onClick={calculateSalePrice}
                  className="w-full btn-primary mt-4"
                >
                  Calcular Preço de Venda
                </Button>
              </CardContent>
            </Card>

            {/* ---------- CARD: RESULT ---------- */}
            <Card className="glass-card border-white/10 h-fit self-start">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Estimativa de Preço
                </CardTitle>
                <CardDescription>
                  Faixa de preço recomendada para venda
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6 flex flex-col items-center">
                {saleResult ? (
                  <>
                    <p className="text-3xl font-bold text-primary mb-1">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(saleResult.estimatedPrice)}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      Preço estimado
                    </span>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Preencha os dados do imóvel para ver a estimativa
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyCalculator;
