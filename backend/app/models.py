from pydantic import BaseModel, Field

class ImovelInput(BaseModel):
    area: float = Field(..., gt=0, description="Área em m²")
    quartos: int = Field(..., ge=0)
    banheiros: int = Field(..., ge=0)
    garagem: int = Field(..., ge=0)
