"use client";

import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Alert, Button } from '@mui/material';
import { getTenantFromDomain } from '@/utils/theme-utils';
import { getClientTenant } from '@/utils/theme-utils';
import { TENANT_CONFIGS } from '@/types/tenant';
import type { TenantType } from '@/types/tenant';

/**
 * Componente para testar e debug da detecção de tenant
 * Útil para verificar problemas em produção
 */
export default function TenantTester() {
  const [hostname, setHostname] = useState<string>('');
  const [detectedTenant, setDetectedTenant] = useState<TenantType>('default');
  const [clientTenant, setClientTenant] = useState<TenantType>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentHostname = window.location.hostname;
      setHostname(currentHostname);
      
      // Testa detecção direta por hostname
      const detected = getTenantFromDomain(currentHostname);
      setDetectedTenant(detected);
      
      // Testa função completa do cliente
      const client = getClientTenant();
      setClientTenant(client);
    }
  }, []);

  if (!isVisible) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 10000,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsVisible(true)}
          sx={{ backgroundColor: '#ff4081' }}
        >
          🧪 Tenant Test
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 10000,
        maxWidth: 400,
      }}
    >
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">🧪 Tenant Detection Test</Typography>
            <Button size="small" onClick={() => setIsVisible(false)}>✕</Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Current Hostname:
            </Typography>
            <Typography variant="body1" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
              {hostname || 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Direct Domain Detection:
            </Typography>
            <Alert 
              severity={detectedTenant === 'autoline' ? 'success' : 'warning'}
              sx={{ mt: 1 }}
            >
              <Typography variant="body2">
                <strong>{detectedTenant}</strong>
              </Typography>
            </Alert>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Client Function Result:
            </Typography>
            <Alert 
              severity={clientTenant === 'autoline' ? 'success' : 'warning'}
              sx={{ mt: 1 }}
            >
              <Typography variant="body2">
                <strong>{clientTenant}</strong>
              </Typography>
            </Alert>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Domain Patterns for 'autoline':
            </Typography>
            <Box sx={{ mt: 1 }}>
              {TENANT_CONFIGS.autoline?.domainPatterns.map((pattern) => {
                const matches = hostname.toLowerCase().includes(pattern.toLowerCase());
                return (
                  <Alert 
                    key={pattern}
                    severity={matches ? 'success' : 'info'}
                    sx={{ mb: 0.5 }}
                  >
                    <Typography variant="body2">
                      {pattern} {matches ? '✅' : '❌'}
                    </Typography>
                  </Alert>
                );
              })}
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              localStorage:
            </Typography>
            <Typography variant="body2" fontFamily="monospace">
              {typeof window !== 'undefined' 
                ? localStorage.getItem('pocketcard_tenant_theme') || 'null'
                : 'N/A'
              }
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                localStorage.setItem('pocketcard_tenant_theme', 'autoline');
                window.location.reload();
              }}
            >
              Force Autoline
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="warning"
              onClick={() => {
                localStorage.removeItem('pocketcard_tenant_theme');
                window.location.reload();
              }}
            >
              Clear Cache
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                console.log('🧪 Tenant Detection Debug:');
                console.log('Hostname:', hostname);
                console.log('Detected (direct):', detectedTenant);
                console.log('Client result:', clientTenant);
                console.log('Patterns:', TENANT_CONFIGS);
              }}
            >
              Console Log
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}