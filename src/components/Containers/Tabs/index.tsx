"use client";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import accessObjectByString from "@/utils/accessObjectByString";
import { useState } from "react";
import { ITabs } from "./types";
import { TabContainer, TabItem } from "./styles";

function Tabs<T extends Record<string, any>>({
  options,
  optionLabelKey,
  showContent = true,
  orientation = "horizontal",
  variant,
  scrollButtons,
  onChange,
  revertcolorpalette,
  strongTabs,
  onTagged,
}: ITabs<T>) {
  const [tab, setTab] = useState<number>(0);

  function handleChange(_: any, value: number) {
    setTab(value);
  }

  return (
    <TabContext value={tab}>
      <TabContainer
        variant={variant}
        scrollButtons={scrollButtons}
        orientation={orientation}
        onChange={handleChange}
      >
        {options.map(({ content, onClick, ...option }, index) => {
          const label = accessObjectByString(option, optionLabelKey);

          return onTagged ? (
            <TabContainer
              key={`${label} - ${index}`}
              orientation={orientation}
              style={{ position: "relative" }}
            >
              <TabItem
                label={label}
                value={index}
                strongTabs={strongTabs}
                revertcolorpalette={revertcolorpalette}
                onClick={() => {
                  if (onChange) onChange(option);
                  if (onClick) onClick(option);
                  setTab(index);
                }}
              />
              {tab === index && (
                <ArrowDropUpIcon
                  fontSize="large"
                  style={{
                    position: "absolute",
                    bottom: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
              )}
            </TabContainer>
          ) : (
            <TabItem
              key={`${label} - ${index}`}
              label={label}
              value={index}
              strongTabs={strongTabs}
              revertcolorpalette={revertcolorpalette}
              onClick={() => {
                if (onChange) onChange(option);
                if (onClick) onClick(option);
                setTab(index);
              }}
            />
          );
        })}
      </TabContainer>
      {showContent &&
        options.map((tabOption, index) => (
          <TabPanel
            key={`${tabOption} - ${index}`}
            value={index.toString()}
            sx={{
              "&.MuiTabPanel-root": {
                p: 0,
              },
            }}
          >
            {tabOption.content}
          </TabPanel>
        ))}
    </TabContext>
  );
}

export default Tabs;
