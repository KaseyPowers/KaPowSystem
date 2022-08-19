import React from "react";
import { Divider, Chip, List } from "@mui/material";

import {
  DefinitionDataItem,
  GroupStyleTypes,
  DefinitionListOptions,
} from "./definition_types";

import DefinitionItem from "./definition_item";

interface RenderItemProps extends DefinitionListOptions {
  item: DefinitionDataItem;
}

function RenderDataItem({ item, groupStyle, ...itemOptions }: RenderItemProps) {
  // isGroup
  if ("items" in item) {
    switch (groupStyle) {
      case GroupStyleTypes.divider:
        return (
          <React.Fragment>
            <Divider component="li">
              <Chip label={item.label || item.id} />
            </Divider>
            {item.items.map((subItem) => (
              <DefinitionItem
                key={subItem.id}
                item={subItem}
                {...itemOptions}
              />
            ))}
          </React.Fragment>
        );
    }
  } else {
    return <DefinitionItem item={item} {...itemOptions} />;
  }
  return null;
}

interface DefinitionListProps extends Partial<DefinitionListOptions> {
  listData: DefinitionDataItem[];
}

export function DefinitionList({ listData, ...options }: DefinitionListProps) {
  const optionProps = {
    groupStyle: GroupStyleTypes.divider,
    showItemDefinitions: false,
    ...options,
  };
  return (
    <List dense>
      {listData.map((dataItem) => {
        return (
          <RenderDataItem key={dataItem.id} item={dataItem} {...optionProps} />
        );
      })}
    </List>
  );
}
