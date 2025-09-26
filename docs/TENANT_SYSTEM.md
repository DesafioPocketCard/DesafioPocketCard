# Sistema de Tenants Multi-Tema

Este documento explica como funciona o sistema de tenants da aplicação PocketCard.

## Visão Geral

O sistema permite que a aplicação use temas diferentes baseados no domínio/tenant atual. Cada tenant tem sua própria paleta de cores e configurações visuais.

## Tenants Disponíveis

- **default**: Tema padrão (roxo)
- **novocred**: Tema da NovoCred (roxo)  
- **autoline**: Tema da Autoline (vermelho)

## Como Funciona

### Detecção Automática

O sistema detecta automaticamente o tenant através:

1. **Domínio**: Analisa o hostname da URL
2. **Cookie**: Armazena a preferência do usuário
3. **LocalStorage**: Cache no lado do cliente

### Arquitetura

```
src/
├── contexts/DynamicThemeProvider.tsx  # Provider principal
├── components/ThemeInitializer.tsx    # Sincronização servidor/cliente
├── components/UI/Logo/                # Componente Logo dinâmica
├── utils/theme-utils.ts               # Utilitários de detecção
├── utils/logo-utils.ts                # Utilitários de logos
├── hooks/useTenant.ts                 # Hook para componentes
├── hooks/useLogo.ts                   # Hook para logos
├── types/tenant.ts                    # Tipos e configurações
├── config/theme/main-palette.ts       # Paletas de cores
└── assets/icons/logos/                # Assets de logos por tenant
```

## Uso nos Componentes

### Hook `useTenant`

```typescript
import { useTenant } from '@/hooks/useTenant';

function MeuComponente() {
  const { tenant, colors, isLoading, theme } = useTenant();

  if (isLoading) return <div>Carregando tema...</div>;

  return (
    <div style={{ color: colors.main }}>
      Tenant atual: {tenant}
    </div>
  );
}
```

### Hook `useLogo`

```typescript
import { useLogo } from '@/hooks/useLogo';

function MeuComponente() {
  const { src, width, height, tenant, getLogo } = useLogo('horizontal-b');

  return (
    <img 
      src={src} 
      alt="Logo" 
      width={width} 
      height={height}
      data-tenant={tenant}
    />
  );
}
```

### Componente Logo

```typescript
import { Logo } from '@/components/UI';

function MeuComponente() {
  return (
    <>
      {/* Logo horizontal padrão */}
      <Logo alt="Minha logo" />
      
      {/* Logo específica com tamanho customizado */}
      <Logo 
        logoType="180x180" 
        alt="Logo grande" 
        sizeFactor={0.5}
      />
      
      {/* Logo com dimensões específicas */}
      <Logo 
        logoType="horizontal-w"
        alt="Logo branca"
        width={200}
        height={50}
      />
    </>
  );
}
```

### Theme MUI

```typescript
import { useTheme } from '@mui/material/styles';

function MeuComponente() {
  const theme = useTheme();
  
  return (
    <Box sx={{ color: theme.palette.primary.main }}>
      Usando tema do MUI
    </Box>
  );
}
```

## Configuração de Novos Tenants

### 1. Adicionar Paleta

```typescript
// src/config/theme/main-palette.ts
const main_palette = {
  // ... tenants existentes
  novo_tenant: {
    main: "#123456",
    light: "#ABCDEF",
    dark: "#000000",
    // ... outras cores
  }
};
```

### 2. Adicionar Logos

```bash
# Criar diretório para o novo tenant
mkdir -p src/assets/icons/logos/novo_tenant

# Adicionar arquivos de logo (seguir convenção)
# - 180x180.svg (logo quadrada)
# - horizontal-w.svg (logo horizontal branca)
# - horizontal-b.png (logo horizontal preta)
# - horizontal-g.png (logo horizontal cinza)
```

### 3. Configurar Logos no Sistema

```typescript
// src/utils/logo-utils.ts

// Importar as logos
import novoTenantLogo180 from '@/assets/icons/logos/novo_tenant/180x180.svg';
import novoTenantLogoHorizontal from '@/assets/icons/logos/novo_tenant/horizontal-w.svg';

// Adicionar ao LOGO_MAP
const LOGO_MAP = {
  // ... outros tenants
  novo_tenant: {
    '180x180': novoTenantLogo180,
    'horizontal': novoTenantLogoHorizontal,
    // ... outros tipos
  },
};
```

### 4. Configurar Detecção

```typescript
// src/types/tenant.ts
export const TENANT_CONFIGS: Record<TenantType, TenantConfig> = {
  // ... configs existentes
  novo_tenant: {
    name: 'novo_tenant',
    domainPatterns: ['novo-tenant', 'nt'],
    displayName: 'Novo Tenant',
    description: 'Descrição do novo tenant',
  },
};
```

## Performance

### Otimizações Implementadas

- **Memoização**: Tema só é recriado quando tenant muda
- **Inicialização Lazy**: Evita flash de conteúdo sem estilo
- **Cache Inteligente**: localStorage + cookies para persistência
- **SSR Friendly**: Evita mismatches de hidratação
- **Logos Estáticas**: Todas as logos são importadas estaticamente (bundler otimization)
- **Fallbacks**: Sistema de fallback para logos não encontradas

### Métricas

- **Tempo de carregamento**: ~50ms para detecção
- **Flash de tema**: Eliminado com inicialização otimizada
- **Re-renders**: Minimizados com memoização

## Troubleshooting

### Problema: Flash de tema errado

**Solução**: Verificar se `ThemeInitializer` está no layout

### Problema: Tema não muda por domínio

**Solução**: Limpar localStorage e cookies

```javascript
localStorage.removeItem('pocketcard_tenant_theme');
document.cookie = 'pocketcard_tenant_theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
```

### Problema: Erro de hidratação

**Solução**: O sistema usa 'default' durante hidratação para evitar mismatches

## Debugging

### Console Commands

```javascript
// Ver tenant atual
console.log(localStorage.getItem('pocketcard_tenant_theme'));

// Forçar tenant específico
localStorage.setItem('pocketcard_tenant_theme', 'autoline');
location.reload();

// Reset para detecção automática
localStorage.removeItem('pocketcard_tenant_theme');
location.reload();
```

### DevTools

Use as React DevTools para inspecionar:
- `DynamicThemeProvider` state
- Theme object no contexto MUI
- Re-renders do provider

## Considerações de Segurança

- Cookies são `httpOnly: false` para acesso via JavaScript
- `secure: true` em produção
- `sameSite: 'lax'` para proteção CSRF
- Validação de tenant contra lista permitida