import { useContext, useState } from 'react';
import {
  OptionsContext,
  OptionsContextType,
} from '../../context/OptionsContext';
import { ToolsContext, ToolsContextType } from '../../context/ToolsContext';

import ToolPanel from '../tools/ToolPanel';
import OptionPanel from '../options/OptionPanel';
import Canvas from '../canvas/Canvas';
import { Action } from './types';
import { Tool } from '../tools/types';

export default function Painter() {
  const [action, setAction] = useState<Action>(Action.PAINT);
  // const { tool, setTool } = useContext(ToolsContext) as ToolsContextType;
  // const { options } = useContext(OptionsContext) as OptionsContextType;

  // function handleToolSelect(tool: Tool) {
  //   setTool(tool);
  //   setAction(tool == Tool.SELECT ? Action.SELECT : Action.PAINT);
  // }

  return (
    <>
      {/* <ToolPanel onClick={handleToolSelect} /> */}
      {/* <OptionPanel show={action !== Action.SELECT} /> */}
      <Canvas width={window.innerWidth} height={window.innerHeight} />
    </>
  );
}
