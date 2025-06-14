import { useState } from 'react'
import dayjs from 'dayjs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  MapPin,
  Calendar
} from 'lucide-react'
import { Line, Chart } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
)

const monthsBack = 12
const priceLabels = Array.from({ length: monthsBack }, (_, i) =>
  dayjs().subtract(monthsBack - i - 1, 'month').format('MMM/YY')
)
const mockPrices = priceLabels.map(
  (_, i) => 8500 + Math.sin(i / 1.7) * 650 + Math.random() * 300
)
const priceChartData = {
  labels: priceLabels,
  datasets: [
    {
      label: 'Preço médio do m² (R$)',
      data: mockPrices,
      borderColor: '#3b82f6',    
      backgroundColor: '#3b82f6', 
      borderWidth: 2,
      tension: 0.35
    }
  ]
};

const priceChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: import('chart.js').TooltipItem<'line'>) =>
          `R$ ${ctx.parsed.y.toLocaleString('pt-BR', {
            minimumFractionDigits: 2
          })}`
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: (v: unknown) =>
          `R$ ${(v as number).toLocaleString('pt-BR')}`
      }
    }
  }
};


const monthLabels = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez'
]
const monthlySales = [
  80, 
  110,
  120,  
  105,  
  95,  
  75,   
  85,  
  130,
  125,  
  110,  
  90,   
  60   
];

const monthlyPrices = [
  2000,
  3550, 
  3500, 
  2600, 
  5150, 
  3200, 
  2700, 
  2400, 
  2100,
  1900, 
  2000, 
  1850  
];
const seasonChartData = {
  labels: monthLabels,
  datasets: [
    {
      type: 'bar' as const,
      label: 'Unidades vendidas',
      data: monthlySales,
      backgroundColor: 'rgba(99,102,241,0.6)',
      yAxisID: 'y'
    },
    {
      type: 'line' as const,
      label: 'Preço médio (R$)',
      data: monthlyPrices,
      borderWidth: 2,
      tension: 0.35,
      yAxisID: 'y1'
    }
  ]
}
const seasonChartOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: {
    y: { 
      type: 'linear' as const,
      beginAtZero: true, 
      position: 'left' as const 
    },
    y1: {
      type: 'linear' as const,
      beginAtZero: false,
      position: 'right' as const,
      grid: { drawOnChartArea: false },
      ticks: {
        callback: (v: unknown) =>
          `R$ ${(v as number).toLocaleString('pt-BR')}`
      }
    }
  }
}

const MarketAnalysis = () => {
  const [selectedRegion, setSelectedRegion] = useState('sao-paulo')
  const [selectedPeriod, setSelectedPeriod] = useState('12m')

  const marketIndicators = [
    {
      name: 'Índice de Liquidez',
      value: '7.2',
      change: '+0.8',
      trend: 'up',
      description: 'Velocidade de vendas'
    },
    {
      name: 'Taxa de Absorção',
      value: '78%',
      change: '+12%',
      trend: 'up',
      description: 'Unidades vendidas/ofertadas'
    },
    {
      name: 'Yield Médio',
      value: '6.8%',
      change: '-0.3%',
      trend: 'down',
      description: 'Rentabilidade anual'
    },
    {
      name: 'Índice de Valorização',
      value: '112.5',
      change: '+5.2',
      trend: 'up',
      description: 'Base 100 = Jan/2023'
    }
  ]

  const priceRanges = [
    { range: 'Até R$ 500K', percentage: 32, count: 892 },
    { range: 'R$ 500K - R$ 1M', percentage: 28, count: 781 },
    { range: 'R$ 1M - R$ 2M', percentage: 25, count: 697 },
    { range: 'R$ 2M - R$ 5M', percentage: 12, count: 334 },
    { range: 'Acima R$ 5M', percentage: 3, count: 83 }
  ]

 const neighborhoods = [
  {
    name: 'Centro',
    avgPrice: 'R$ 5.362',
    volume: 280,
    trend: 'up',
    change: '+4.5%'
  },
  {
    name: 'Camobi',
    avgPrice: 'R$ 3.723',
    volume: 350,
    trend: 'up',
    change: '+5.2%'
  },
  {
    name: 'Nossa Senhora das Dores',
    avgPrice: 'R$ 5.140',
    volume: 210,
    trend: 'up',
    change: '+3.8%'
  },
  {
    name: 'Menino Jesus',
    avgPrice: 'R$ 4.800',
    volume: 190,
    trend: 'stable',
    change: '+1.5%'
  },
  {
    name: 'Nossa Senhora Medianeira',
    avgPrice: 'R$ 4.900',
    volume: 220,
    trend: 'up',
    change: '+2.9%'
  },
  {
    name: 'São José',
    avgPrice: 'R$ 4.500',
    volume: 170,
    trend: 'up',
    change: '+6.1%'
  }
];

  return (
    <div className="p-6 space-y-6">
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
              <SelectItem value="sao-paulo">Santa Maria - RS</SelectItem>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketIndicators.map((indicator, idx) => (
          <Card key={idx} className="glass-card border-white/10 hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {indicator.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">
                {indicator.value}
              </div>
              <div className="flex items-center space-x-1">
                {indicator.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={`text-xs ${
                    indicator.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {indicator.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {indicator.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              {priceRanges.map((range, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground">{range.range}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">
                        {range.percentage}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({range.count})
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-blue-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${range.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
              {neighborhoods.map((nh, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="font-medium text-foreground text-sm">
                        {nh.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {nh.volume} unidades
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-foreground text-sm">
                        {nh.avgPrice}/m²
                      </div>
                      <div className="flex items-center justify-end space-x-1">
                        {nh.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span
                          className={`text-xs ${
                            nh.trend === 'up'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          {nh.change}
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
            <div className="h-64">
              <Line data={priceChartData} options={priceChartOptions} />
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
            <div className="h-64">
              <Chart type="bar" data={seasonChartData} options={seasonChartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MarketAnalysis
