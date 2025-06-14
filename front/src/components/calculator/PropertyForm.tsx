
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

interface PropertyFormProps {
  data: {
    area: string;
    bedrooms: string;
    bathrooms: string;
    parking: string;
    neighborhood: string;
    condition: string;
    cep: string;
    street: string;
    city: string;
    state: string;
  };
  onChange: (data: any) => void;
}

export const PropertyForm = ({ data, onChange }: PropertyFormProps) => {
  const { toast } = useToast();
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const fetchAddressByCep = async (cep: string) => {
    if (cep.length !== 8) return;
    
    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData = await response.json();
      
      if (addressData.erro) {
        toast({
          title: "CEP não encontrado",
          description: "Verifique o CEP informado",
          variant: "destructive"
        });
        return;
      }

      onChange({
        ...data,
        cep,
        street: addressData.logradouro || '',
        neighborhood: addressData.bairro || '',
        city: addressData.localidade || '',
        state: addressData.uf || ''
      });

      toast({
        title: "Endereço encontrado!",
        description: `${addressData.logradouro}, ${addressData.bairro} - ${addressData.localidade}/${addressData.uf}`
      });
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Tente novamente em alguns momentos",
        variant: "destructive"
      });
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleCepChange = (value: string) => {
    const cleanCep = value.replace(/\D/g, '');
    onChange({ ...data, cep: cleanCep });
    
    if (cleanCep.length === 8) {
      fetchAddressByCep(cleanCep);
    }
  };

  const formatCep = (value: string) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 8) {
      return clean.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return clean.slice(0, 8).replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="area">Área (m²)</Label>
          <Input
            id="area"
            type="number"
            placeholder="85"
            value={data.area}
            onChange={(e) => onChange({...data, area: e.target.value})}
            className="bg-muted/50 border-white/10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cep">CEP</Label>
          <Input
            id="cep"
            type="text"
            placeholder="00000-000"
            value={formatCep(data.cep)}
            onChange={(e) => handleCepChange(e.target.value)}
            className="bg-muted/50 border-white/10"
            disabled={isLoadingCep}
          />
          {isLoadingCep && (
            <p className="text-xs text-muted-foreground">Buscando endereço...</p>
          )}
        </div>
      </div>

      {data.street && (
        <div className="space-y-2">
          <Label htmlFor="street">Rua</Label>
          <Input
            id="street"
            type="text"
            value={data.street}
            onChange={(e) => onChange({...data, street: e.target.value})}
            className="bg-muted/50 border-white/10"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Quartos</Label>
          <Select value={data.bedrooms} onValueChange={(value) => onChange({...data, bedrooms: value})}>
            <SelectTrigger className="bg-muted/50 border-white/10">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="1">1 quarto</SelectItem>
              <SelectItem value="2">2 quartos</SelectItem>
              <SelectItem value="3">3 quartos</SelectItem>
              <SelectItem value="4">4+ quartos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Banheiros</Label>
          <Select value={data.bathrooms} onValueChange={(value) => onChange({...data, bathrooms: value})}>
            <SelectTrigger className="bg-muted/50 border-white/10">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="1">1 banheiro</SelectItem>
              <SelectItem value="2">2 banheiros</SelectItem>
              <SelectItem value="3">3 banheiros</SelectItem>
              <SelectItem value="4">4+ banheiros</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="parking">Vagas</Label>
          <Select value={data.parking} onValueChange={(value) => onChange({...data, parking: value})}>
            <SelectTrigger className="bg-muted/50 border-white/10">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="0">Sem vaga</SelectItem>
              <SelectItem value="1">1 vaga</SelectItem>
              <SelectItem value="2">2 vagas</SelectItem>
              <SelectItem value="3">3+ vagas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="condition">Estado do Imóvel</Label>
          <Select value={data.condition} onValueChange={(value) => onChange({...data, condition: value})}>
            <SelectTrigger className="bg-muted/50 border-white/10">
              <SelectValue placeholder="Selecione o estado" />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="new">Novo/Lançamento</SelectItem>
              <SelectItem value="excellent">Excelente</SelectItem>
              <SelectItem value="good">Bom</SelectItem>
              <SelectItem value="renovated">Reformado</SelectItem>
              <SelectItem value="needs-renovation">Precisa reformar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {data.neighborhood && (
        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            type="text"
            value={data.neighborhood}
            onChange={(e) => onChange({...data, neighborhood: e.target.value})}
            className="bg-muted/50 border-white/10"
          />
        </div>
      )}

      {data.city && data.state && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              type="text"
              value={data.city}
              onChange={(e) => onChange({...data, city: e.target.value})}
              className="bg-muted/50 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              type="text"
              value={data.state}
              onChange={(e) => onChange({...data, state: e.target.value})}
              className="bg-muted/50 border-white/10"
            />
          </div>
        </div>
      )}
    </div>
  );
};
