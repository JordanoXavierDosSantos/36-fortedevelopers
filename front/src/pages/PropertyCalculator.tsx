
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, DollarSign, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PropertyForm } from '@/components/calculator/PropertyForm';

const PropertyCalculator = () => {
  const { toast } = useToast();
  const [saleData, setSaleData] = useState({
    area: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    neighborhood: '',
    condition: '',
    cep: '',
    street: '',
    city: '',
    state: ''
  });

  const [rentData, setRentData] = useState({
    area: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    neighborhood: '',
    condition: '',
    cep: '',
    street: '',
    city: '',
    state: ''
  });

  const [saleResult, setSaleResult] = useState(null);
  const [rentResult, setRentResult] = useState(null);

  const calculateSalePrice = () => {
    const area = parseFloat(saleData.area);
    const neighborhood = saleData.neighborhood;
    
    if (!area || !neighborhood) {
      toast({
        title: "Erro na calculadora",
        description: "Preencha todos os campos obrigatórios (área e bairro)",
        variant: "destructive"
      });
      return;
    }

    // Mock calculation algorithm
    let basePrice = 8500 * area; // Base price per sqm
    
    // Adjustments based on property features
    const bedroomMultiplier = Math.max(1, parseInt(saleData.bedrooms || '0') * 0.1);
    const bathroomMultiplier = Math.max(1, parseInt(saleData.bathrooms || '0') * 0.05);
    const parkingMultiplier = Math.max(1, parseInt(saleData.parking || '0') * 0.08);
    
    basePrice *= (1 + bedroomMultiplier + bathroomMultiplier + parkingMultiplier);
    
    // Condition adjustment
    if (saleData.condition === 'new') basePrice *= 1.15;
    else if (saleData.condition === 'renovated') basePrice *= 1.08;
    else if (saleData.condition === 'needs-renovation') basePrice *= 0.85;
    
    const minPrice = basePrice * 0.9;
    const maxPrice = basePrice * 1.1;
    
    setSaleResult({
      estimatedPrice: basePrice,
      minPrice,
      maxPrice,
      pricePerSqm: basePrice / area,
      confidence: 85
    });

    toast({
      title: "Cálculo realizado!",
      description: "Estimativa de preço calculada com sucesso"
    });
  };

  const calculateRentPrice = () => {
    const area = parseFloat(rentData.area);
    const neighborhood = rentData.neighborhood;
    
    if (!area || !neighborhood) {
      toast({
        title: "Erro na calculadora",
        description: "Preencha todos os campos obrigatórios (área e bairro)",
        variant: "destructive"
      });
      return;
    }

    // Mock rent calculation
    const salePrice = 8500 * area;
    const monthlyRent = salePrice * 0.006; // 0.6% per month
    const annualRent = monthlyRent * 12;
    const yieldRate = (annualRent / salePrice) * 100;
    
    setRentResult({
      monthlyRent,
      annualRent,
      yieldRate,
      confidence: 82
    });

    toast({
      title: "Cálculo realizado!",
      description: "Estimativa de aluguel calculada com sucesso"
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calculadora de Preços</h1>
          <p className="text-muted-foreground">
            Estimativas inteligentes para venda e locação
          </p>
        </div>
        <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center">
          <Calculator className="h-6 w-6 text-primary" />
        </div>
      </div>

      <Tabs defaultValue="sale" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="sale">Calculadora de Venda</TabsTrigger>
          <TabsTrigger value="rent">Calculadora de Aluguel</TabsTrigger>
        </TabsList>

        <TabsContent value="sale" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sale Input Form */}
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
                <Button onClick={calculateSalePrice} className="w-full btn-primary mt-4">
                  Calcular Preço de Venda
                </Button>
              </CardContent>
            </Card>

            {/* Sale Results */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Estimativa de Preço
                </CardTitle>
                <CardDescription>
                  Faixa de preço recomendada para venda
                </CardDescription>
              </CardHeader>
              <CardContent>
                {saleResult ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saleResult.estimatedPrice)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Preço estimado
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <div className="text-lg font-semibold text-foreground">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saleResult.minPrice)}
                        </div>
                        <div className="text-xs text-muted-foreground">Preço mínimo</div>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <div className="text-lg font-semibold text-foreground">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saleResult.maxPrice)}
                        </div>
                        <div className="text-xs text-muted-foreground">Preço máximo</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Preço por m²:</span>
                        <span className="text-sm font-medium text-foreground">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saleResult.pricePerSqm)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Confiança:</span>
                        <span className="text-sm font-medium text-green-500">
                          {saleResult.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
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

        <TabsContent value="rent" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rent Input Form */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Dados do Imóvel
                </CardTitle>
                <CardDescription>
                  Preencha as informações para calcular o preço de aluguel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PropertyForm data={rentData} onChange={setRentData} />
                <Button onClick={calculateRentPrice} className="w-full btn-primary mt-4">
                  Calcular Preço de Aluguel
                </Button>
              </CardContent>
            </Card>

            {/* Rent Results */}
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Estimativa de Aluguel
                </CardTitle>
                <CardDescription>
                  Valor sugerido e rentabilidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                {rentResult ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rentResult.monthlyRent)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Aluguel mensal estimado
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-sm text-muted-foreground">Receita anual:</span>
                        <span className="text-sm font-medium text-foreground">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(rentResult.annualRent)}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-sm text-muted-foreground">Yield anual:</span>
                        <span className="text-sm font-medium text-green-500">
                          {rentResult.yieldRate.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-sm text-muted-foreground">Confiança:</span>
                        <span className="text-sm font-medium text-green-500">
                          {rentResult.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
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
