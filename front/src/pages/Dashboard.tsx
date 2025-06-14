
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Calculator, Home, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Bem-vindo ao PrecifAI</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Plataforma inteligente para análise e gestão do mercado imobiliário
        </p>
        
        {/* CTA Principal */}
        <div className="mt-8">
          <Link to="/calculator">
            <Button size="lg" className="btn-primary text-lg px-8 py-4 h-auto">
              <Calculator className="mr-2 h-6 w-6" />
              Calcular Preço do Imóvel
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            Comece calculando o valor estimado do seu imóvel
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Imóveis Cadastrados
            </CardTitle>
            <Home className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-green-500">
              +12% desde o último mês
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Preço Médio/m²
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ 8.450</div>
            <p className="text-xs text-green-500">
              +5% desde o último mês
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Usuários Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3,842</div>
            <p className="text-xs text-green-500">
              +23% desde o último mês
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Volume de Transações
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ 4.2M</div>
            <p className="text-xs text-green-500">
              +8% desde o último mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/market" className="group">
          <Card className="glass-card border-white/10 hover-lift cursor-pointer">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                <BarChart3 className="h-5 w-5" />
                Análise de Mercado
              </CardTitle>
              <CardDescription>
                Visualize tendências e indicadores do mercado imobiliário
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/calculator" className="group">
          <Card className="glass-card border-white/10 hover-lift cursor-pointer">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                <Calculator className="h-5 w-5" />
                Calculadora de Preços
              </CardTitle>
              <CardDescription>
                Estime valores de venda e locação para imóveis
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/trades" className="group">
          <Card className="glass-card border-white/10 hover-lift cursor-pointer">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                <TrendingUp className="h-5 w-5" />
                Histórico de Trades
              </CardTitle>
              <CardDescription>
                Acompanhe transações e operações realizadas
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
