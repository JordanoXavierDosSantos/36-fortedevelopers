
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, PieChart, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

const MarketAnalysis = () => {
  const [selectedRegion, setSelectedRegion] = useState('sao-paulo');
  const [selectedPeriod, setSelectedPeriod] = useState('12m');

  const marketIndicators = [
    {
      name: "Índice de Liquidez",
      value: "7.2",
      change: "+0.8",
      trend: "up",
      description: "Velocidade de vendas"
    },
    {
      name: "Taxa de Absorção",
      value: "78%",
      change: "+12%",
      trend: "up", 
      description: "Unidades vendidas/ofertadas"
    },
    {
      name: "Yield Médio",
      value: "6.8%",
      change: "-0.3%",
      trend: "down",
      description: "Rentabilidade anual"
    },
    {
      name: "Índice de Valorização",
      value: "112.5",
      change: "+5.2",
      trend: "up",
      description: "Base 100 = Jan/2023"
    }
  ];

  const priceRanges = [
    { range: "Até R$ 500K", percentage: 32, count: 892 },
    { range: "R$ 500K - R$ 1M", percentage: 28, count: 781 },
    { range: "R$ 1M - R$ 2M", percentage: 25, count: 697 },
    { range: "R$ 2M - R$ 5M", percentage: 12, count: 334 },
    { range: "Acima R$ 5M", percentage: 3, count: 83 }
  ];

  const neighborhoods = [
    { name: "Vila Olímpia", avgPrice: "R$ 12.500", volume: 234, trend: "up", change: "+8.2%" },
    { name: "Jardins", avgPrice: "R$ 15.200", volume: 189, trend: "up", change: "+3.1%" },
    { name: "Moema", avgPrice: "R$ 9.800", volume: 312, trend: "down", change: "-2.5%" },
    { name: "Brooklin", avgPrice: "R$ 8.900", volume: 278, trend: "up", change: "+12.3%" },
    { name: "Pinheiros", avgPrice: "R$ 11.400", volume: 198, trend: "up", change: "+5.7%" },
    { name: "Itaim Bibi", avgPrice: "R$ 13.100", volume: 167, trend: "up", change: "+6.8%" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Análise de Mercado</h1>
          <p className="text-muted-foreground">
            Indicadores avançados e tendências do mercado imobiliário
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 bg-muted/50 border-white/10">
              <SelectValue placeholder="Selecione a região" />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="sao-paulo">São Paulo - SP</SelectItem>
              <SelectItem value="rio-janeiro">Rio de Janeiro - RJ</SelectItem>
              <SelectItem value="belo-horizonte">Belo Horizonte - MG</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 bg-muted/50 border-white/10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="3m">3 meses</SelectItem>
              <SelectItem value="6m">6 meses</SelectItem>
              <SelectItem value="12m">12 meses</SelectItem>
              <SelectItem value="24m">24 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Market Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketIndicators.map((indicator, index) => (
          <Card key={index} className="glass-card border-white/10 hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {indicator.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {indicator.value}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {indicator.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-xs ${indicator.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {indicator.change}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {indicator.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Distribution */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Distribuição por Faixa de Preço
            </CardTitle>
            <CardDescription>
              Concentração de imóveis por valor de venda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priceRanges.map((range, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">{range.range}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">{range.percentage}%</span>
                      <span className="text-xs text-muted-foreground">({range.count})</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-orange-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${range.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Neighborhood Analysis */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Análise por Bairro
            </CardTitle>
            <CardDescription>
              Performance dos principais bairros
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {neighborhoods.map((neighborhood, index) => (
                <div key={index} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">
                        {neighborhood.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {neighborhood.volume} unidades
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground text-sm">
                        {neighborhood.avgPrice}/m²
                      </div>
                      <div className="flex items-center justify-end space-x-1">
                        {neighborhood.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={`text-xs ${neighborhood.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {neighborhood.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Evolução de Preços
            </CardTitle>
            <CardDescription>
              Variação do preço médio do m² ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary/10 to-orange-400/10 rounded-lg border border-white/10">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Gráfico de linha temporal</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Integração com Chart.js em desenvolvimento
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Sazonalidade
            </CardTitle>
            <CardDescription>
              Padrão sazonal de vendas e preços
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary/10 to-orange-400/10 rounded-lg border border-white/10">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Análise sazonal</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Padrões mensais e trimestrais
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketAnalysis;
