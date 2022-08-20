import { useState } from "react";

import { CardContent, CardHeader, Collapse, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

import { DefinitionDataItem, DefinitionList } from "./definitions_list";

export interface ListCardContentProps {
  title: string;
  listData: DefinitionDataItem[];
  expandable?: boolean;
  defaultExpanded?: boolean;
}

export type StandardContentProps = Omit<
  ListCardContentProps,
  "title" | "listData"
>;

export function ListCardContent({
  title,
  listData,
  expandable = false,
  defaultExpanded = false,
}: ListCardContentProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const onExpandedClick = () => {
    setExpanded((current) => !current);
  };

  const cardContent = (
    <CardContent>
      <DefinitionList listData={listData} />
    </CardContent>
  );

  return (
    <>
      <CardHeader
        title={title}
        action={
          expandable ? (
            <IconButton onClick={onExpandedClick}>
              {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          ) : undefined
        }
      />
      {expandable ? (
        <Collapse in={expanded} timeout="auto">
          {cardContent}
        </Collapse>
      ) : (
        cardContent
      )}
    </>
  );
}
