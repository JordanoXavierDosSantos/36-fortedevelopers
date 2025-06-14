
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { History, Download, Search, Filter, TrendingUp, TrendingDown, Calendar, MapPin } from 'lucide-react';

const TradeHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedType, setSelectedType] = useState('all');

  const trades = [
    {
      id: 1,
      address: "Rua Oscar Freire, 123 - Jardins",
      type: "Apartamento",
      area: 85,
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      salePrice: 1200000,
      pricePerSqm: 14118,
      saleDate: "2024-01-15",
      daysOnMarket: 45,
      trend: "up",
      priceChange: "+5.2%"
    },
    {
      id: 2,
      address: "Av. Paulista, 456 - Bela Vista",
      type: "Cobertura",
      area: 180,
      bedrooms: 3,
      bathrooms: 3,
      parking: 2,
      salePrice: 3500000,
      pricePerSqm: 19444,
      saleDate: "2024-01-12",
      daysOnMarket: 67,
      trend: "up",
      priceChange: "+12.8%"
    },
    {
      id: 3,
      address: "Rua Augusta, 789 - Consolação",
      type: "Studio",
      area: 35,
      bedrooms: 1,
      bathrooms: 1,
      parking: 0,
      salePrice: 450000,
      pricePerSqm: 12857,
      saleDate: "2024-01-10",
      daysOnMarket: 32,
      trend: "down",
      priceChange: "-2.1%"
    },
    {
      id: 4,
      address: "Rua Haddock Lobo, 321 - Cerqueira César",
      type: "Apartamento",
      area: 120,
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      salePrice: 1800000,
      pricePerSqm: 15000,
      saleDate: "2024-01-08",
      daysOnMarket: 89,
      trend: "up",
      priceChange: "+8.7%"
    },
    {
      id: 5,
      address: "Alameda Ministro Rocha Azevedo, 654 - Jardins",
      type: "Apartamento",
      area: 95,
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      salePrice: 1450000,
      pricePerSqm: 15263,
      saleDate: "2024-01-05",
      daysOnMarket: 23,
      trend: "up",
      priceChange: "+15.3%"
    },
    {
      id: 6,
      address: "Rua Teodoro Sampaio, 987 - Pinheiros",
      type: "Loft",
      area: 65,
      bedrooms: 1,
      bathrooms: 1,
      parking: 1,
      salePrice: 680000,
      pricePerSqm: 10462,
      saleDate: "2024-01-03",
      daysOnMarket: 156,
      trend: "down",
      priceChange: "-7.8%"
    }
  ];

  const stats = {
    totalTrades: trades.length,
    totalVolume: trades.reduce((sum, trade) => sum + trade.salePrice, 0),
    avgPrice: trades.reduce((sum, trade) => sum + trade.salePrice, 0) / trades.length,
    avgDaysOnMarket: trades.reduce((sum, trade) => sum + trade.daysOnMarket, 0) / trades.length
  };

  const exportData = () => {
    // Mock CSV export
    const csvData = trades.map(trade => ({
      Endereço: trade.address,
      Tipo: trade.type,
      Área: trade.area,
      Quartos: trade.bedrooms,
      Banheiros: trade.bathrooms,
      Vagas: trade.parking,
      'Preço de Venda': trade.salePrice,
      'Preço por m²': trade.pricePerSqm,
      'Data da Venda': trade.saleDate,
      'Dias no Mercado': trade.daysOnMarket
    }));
    
    console.log('Exportando dados:', csvData);
    // In a real app, this would generate and download a CSV file
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Histórico de Trades</h1>
          <p className="text-muted-foreground">
            Transações imobiliárias realizadas e análise de performance
          </p>
        </div>
        <Button onClick={exportData} className="btn-primary flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Trades</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalTrades}</p>
              </div>
              <History className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Volume Total</p>
                <p className="text-2xl font-bold text-foreground">
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL',
                    notation: 'compact',
                    maximumFractionDigits: 1
                  }).format(stats.totalVolume)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Preço Médio</p>
                <p className="text-2xl font-bold text-foreground">
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL',
                    notation: 'compact',
                    maximumFractionDigits: 1
                  }).format(stats.avgPrice)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tempo Médio</p>
                <p className="text-2xl font-bold text-foreground">{Math.round(stats.avgDaysOnMarket)} dias</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por endereço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted/50 border-white/10"
              />
            </div>
            
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-muted/50 border-white/10">
                <SelectValue placeholder="Região" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="all">Todas as regiões</SelectItem>
                <SelectItem value="jardins">Jardins</SelectItem>
                <SelectItem value="pinheiros">Pinheiros</SelectItem>
                <SelectItem value="vila-olimpia">Vila Olímpia</SelectItem>
                <SelectItem value="moema">Moema</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="bg-muted/50 border-white/10">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="cobertura">Cobertura</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="loft">Loft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="bg-muted/50 border-white/10">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                <SelectItem value="180d">Últimos 6 meses</SelectItem>
                <SelectItem value="365d">Último ano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trades Table */}
      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-foreground">Transações Recentes</CardTitle>
          <CardDescription>
            Histórico detalhado de vendas realizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trades.map((trade) => (
              <div key={trade.id} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-foreground text-sm">
                          {trade.address}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {trade.type} • {trade.area}m²
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {trade.bedrooms} quartos
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {trade.bathrooms} banheiros
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {trade.parking} vagas
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <div className="font-bold text-foreground">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(trade.salePrice)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(trade.pricePerSqm)}/m²
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-sm text-foreground">
                        {new Date(trade.saleDate).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {trade.daysOnMarket} dias no mercado
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {trade.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${trade.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {trade.priceChange}
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
  );
};

export default TradeHistory;
