
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Home, MapPin, Camera, Calculator, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PropertyForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Etapa 1: Informações Básicas
    title: '',
    type: '',
    purpose: '', // venda ou aluguel
    
    // Etapa 2: Localização
    address: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Etapa 3: Características
    area: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    description: '',
    
    // Etapa 4: Preços
    salePrice: '',
    rentPrice: '',
    condoFee: '',
    
    // Etapa 5: Imagens
    images: []
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Salvar dados (localStorage para demo)
    localStorage.setItem('propertyData', JSON.stringify(formData));
    
    toast({
      title: "Imóvel cadastrado com sucesso!",
      description: "Suas informações foram salvas e o imóvel está disponível na plataforma."
    });
    
    // Reset form
    setFormData({
      title: '', type: '', purpose: '', address: '', neighborhood: '',
      city: '', state: '', zipCode: '', area: '', bedrooms: '', bathrooms: '',
      parking: '', description: '', salePrice: '', rentPrice: '', condoFee: '', images: []
    });
    setCurrentStep(1);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Cadastrar Imóvel</h1>
        <p className="text-muted-foreground">
          Preencha as informações do seu imóvel em {totalSteps} etapas simples
        </p>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Etapa {currentStep} de {totalSteps}</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <Card className="glass-card border-white/10">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            {currentStep === 1 && <><Home className="h-5 w-5 text-primary" /> Informações Básicas</>}
            {currentStep === 2 && <><MapPin className="h-5 w-5 text-primary" /> Localização</>}
            {currentStep === 3 && <><Home className="h-5 w-5 text-primary" /> Características</>}
            {currentStep === 4 && <><Calculator className="h-5 w-5 text-primary" /> Preços</>}
            {currentStep === 5 && <><Camera className="h-5 w-5 text-primary" /> Finalização</>}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Vamos começar com as informações principais do imóvel"}
            {currentStep === 2 && "Onde está localizado o seu imóvel?"}
            {currentStep === 3 && "Conte-nos sobre as características do imóvel"}
            {currentStep === 4 && "Defina os valores para venda ou locação"}
            {currentStep === 5 && "Revise e confirme as informações"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Etapa 1: Informações Básicas */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Anúncio</Label>
                <Input
                  id="title"
                  placeholder="Ex: Apartamento 3 quartos no centro"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  className="bg-muted/50 border-white/10"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo do Imóvel</Label>
                  <Select value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
                    <SelectTrigger className="bg-muted/50 border-white/10">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="terreno">Terreno</SelectItem>
                      <SelectItem value="comercial">Comercial</SelectItem>
                      <SelectItem value="rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="purpose">Finalidade</Label>
                  <Select value={formData.purpose} onValueChange={(value) => updateFormData('purpose', value)}>
                    <SelectTrigger className="bg-muted/50 border-white/10">
                      <SelectValue placeholder="Venda ou Aluguel" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="venda">Venda</SelectItem>
                      <SelectItem value="aluguel">Aluguel</SelectItem>
                      <SelectItem value="ambos">Venda e Aluguel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Etapa 2: Localização */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Input
                  id="address"
                  placeholder="Rua, número, complemento"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  className="bg-muted/50 border-white/10"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    placeholder="Nome do bairro"
                    value={formData.neighborhood}
                    onChange={(e) => updateFormData('neighborhood', e.target.value)}
                    className="bg-muted/50 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    placeholder="Nome da cidade"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    className="bg-muted/50 border-white/10"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Select value={formData.state} onValueChange={(value) => updateFormData('state', value)}>
                    <SelectTrigger className="bg-muted/50 border-white/10">
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    placeholder="00000-000"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData('zipCode', e.target.value)}
                    className="bg-muted/50 border-white/10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Etapa 3: Características */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="area">Área Total (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="85"
                  value={formData.area}
                  onChange={(e) => updateFormData('area', e.target.value)}
                  className="bg-muted/50 border-white/10"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Quartos</Label>
                  <Select value={formData.bedrooms} onValueChange={(value) => updateFormData('bedrooms', value)}>
                    <SelectTrigger className="bg-muted/50 border-white/10">
                      <SelectValue placeholder="Qtd" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="0">Studio</SelectItem>
                      <SelectItem value="1">1 quarto</SelectItem>
                      <SelectItem value="2">2 quartos</SelectItem>
                      <SelectItem value="3">3 quartos</SelectItem>
                      <SelectItem value="4">4+ quartos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Banheiros</Label>
                  <Select value={formData.bathrooms} onValueChange={(value) => updateFormData('bathrooms', value)}>
                    <SelectTrigger className="bg-muted/50 border-white/10">
                      <SelectValue placeholder="Qtd" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="1">1 banheiro</SelectItem>
                      <SelectItem value="2">2 banheiros</SelectItem>
                      <SelectItem value="3">3 banheiros</SelectItem>
                      <SelectItem value="4">4+ banheiros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="parking">Vagas</Label>
                  <Select value={formData.parking} onValueChange={(value) => updateFormData('parking', value)}>
                    <SelectTrigger className="bg-muted/50 border-white/10">
                      <SelectValue placeholder="Qtd" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="0">Sem vaga</SelectItem>
                      <SelectItem value="1">1 vaga</SelectItem>
                      <SelectItem value="2">2 vagas</SelectItem>
                      <SelectItem value="3">3+ vagas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva as características e diferenciais do imóvel..."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="bg-muted/50 border-white/10 min-h-[100px]"
                />
              </div>
            </div>
          )}

          {/* Etapa 4: Preços */}
          {currentStep === 4 && (
            <div className="space-y-4">
              {(formData.purpose === 'venda' || formData.purpose === 'ambos') && (
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Preço de Venda (R$)</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    placeholder="450000"
                    value={formData.salePrice}
                    onChange={(e) => updateFormData('salePrice', e.target.value)}
                    className="bg-muted/50 border-white/10"
                  />
                </div>
              )}
              
              {(formData.purpose === 'aluguel' || formData.purpose === 'ambos') && (
                <div className="space-y-2">
                  <Label htmlFor="rentPrice">Preço do Aluguel (R$/mês)</Label>
                  <Input
                    id="rentPrice"
                    type="number"
                    placeholder="2500"
                    value={formData.rentPrice}
                    onChange={(e) => updateFormData('rentPrice', e.target.value)}
                    className="bg-muted/50 border-white/10"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="condoFee">Condomínio (R$/mês)</Label>
                <Input
                  id="condoFee"
                  type="number"
                  placeholder="350"
                  value={formData.condoFee}
                  onChange={(e) => updateFormData('condoFee', e.target.value)}
                  className="bg-muted/50 border-white/10"
                />
              </div>
            </div>
          )}

          {/* Etapa 5: Finalização */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Confirme os dados do seu imóvel
                </h3>
                <p className="text-muted-foreground">
                  Revise as informações antes de finalizar o cadastro
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div><strong>Título:</strong> {formData.title}</div>
                  <div><strong>Tipo:</strong> {formData.type}</div>
                  <div><strong>Finalidade:</strong> {formData.purpose}</div>
                  <div><strong>Área:</strong> {formData.area} m²</div>
                </div>
                <div className="space-y-2">
                  <div><strong>Localização:</strong> {formData.neighborhood}, {formData.city}</div>
                  <div><strong>Quartos:</strong> {formData.bedrooms}</div>
                  <div><strong>Banheiros:</strong> {formData.bathrooms}</div>
                  <div><strong>Vagas:</strong> {formData.parking}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-white/10 text-foreground hover:bg-white/10"
            >
              Anterior
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className="btn-primary">
                Próximo
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="btn-primary">
                Cadastrar Imóvel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyForm;
