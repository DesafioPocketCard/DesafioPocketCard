'use client';

import { ExpandMoreOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { IAccordion } from './types';

function TAccordion({ configs, defaultOpen, kerning = true }: IAccordion) {
  const theme = useTheme();

  const [expanded, setExpanded] = useState<number>(defaultOpen || 0);
  const handleChangePanel = (panel: any) => (_: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Box>
      {configs?.map((config, index) => (
        <Accordion
          expanded={!!defaultOpen || expanded === index}
          key={index}
          onChange={handleChangePanel(index)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined style={{ color: '#f9f9f9' }} />}
            aria-controls={`TAccordion-${index}`}
            id={`TAccordion-${index}`}
            sx={{
              background: config?.bgColor || theme.palette.primary.main,
              borderRadius: '5px',
              color: '#f9f9f9',
              letterSpacing: kerning ? '2px' : '',
              borderBottom: '1px solid #f9f9f9',
              fontFamily: 'General Sans',
            }}
          >
            {config.title || ''}
          </AccordionSummary>
          <AccordionDetails sx={{ paddingTop: '20px', fontFamily: 'General Sans' }}>
            {config.body || ''}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default React.memo(TAccordion);
