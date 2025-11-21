'use client';

import { useMemo } from 'react';
import { styled } from '@mui/system';
import { passwordRequirements } from '@/utils/GlobalValidations';
import { Typography, Box } from '@mui/material';
import { Check, Close } from '@mui/icons-material';

type PasswordStrengthIndicatorProps = {
  password: string;
};

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const BarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: 4,
  width: '100%',
  gap: theme.spacing(0.5),
}));

const Bar = styled('span')<{ active: boolean; color: string }>(
  ({ theme, active, color }) => ({
    flex: 1,
    height: '100%',
    borderRadius: 9999,
    transition: 'all 0.5s ease-out',
    backgroundColor: active
      ? theme.palette[color]?.main || color
      : theme.palette.divider,
  })
);

const RequirementList = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: 0,
  margin: 0,
  listStyle: 'none',
}));

const RequirementItem = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const RequirementText = styled(Typography)<{ met: boolean }>(
  ({ theme, met }) => ({
    fontSize: '0.75rem',
    color: met
      ? theme.palette.success.main
      : theme.palette.text.secondary,
  })
);

/* ============================
    Main Component
=============================== */

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const strength = useMemo(
    () =>
      passwordRequirements.map((req) => ({
        met: req.regex.test(password),
        text: req.message,
      })),
    [password]
  );

  const strengthScore = strength.filter((s) => s.met).length;

  const getColor = (score: number) => {
    if (score === 0) return 'divider';
    if (score <= 1) return 'error';
    if (score <= 2) return 'warning';
    if (score <= 3) return 'warning';
    if (score === 4) return 'info';
    return 'success';
  };

  const getText = (score: number) => {
    if (score === 0) return 'Insira uma senha';
    if (score <= 2) return 'Senha fraca';
    if (score <= 3) return 'Senha média';
    if (score === 4) return 'Senha forte';
    return 'Senha muito forte';
  };

  return (
    <Container>
      {/* Strength Bars */}
      <BarContainer>
        {Array.from({ length: 5 }).map((_, index) => (
          <Bar
            key={index}
            active={index < strengthScore}
            color={getColor(strengthScore)}
          />
        ))}
      </BarContainer>

      {/* Strength Text */}
      <Typography variant="body2" fontWeight={500}>
        {getText(strengthScore)}. Deve conter:
      </Typography>

      {/* Requirements List */}
      <RequirementList>
        {strength.map((req, index) => (
          <RequirementItem key={index}>
            {req.met ? (
              <Check
                width={16}
                height={16}
                color="success"
              />
            ) : (
              <Close
                width={16}
                height={16}
                color='secondary'
              />
            )}

            <RequirementText met={req.met}>
              {req.text}
            </RequirementText>
          </RequirementItem>
        ))}
      </RequirementList>
    </Container>
  );
}
