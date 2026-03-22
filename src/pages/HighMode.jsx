import React from "react";
import HighModeBackground from '../components/UI/highModeComp/HighModeLayout';
import HighModeHero from "../components/UI/highModeComp/HighModeHero";
import HighModeCards from "../components/UI/highModeComp/HighModeCards";
import MiniActivities from "../components/UI/highModeComp/MiniActivites";
import HighTips from "../components/UI/highModeComp/HighTips";
import HighPlug from "../components/UI/highModeComp/HighPlug";

function HighMode() {
  return (
    <HighModeBackground>
      <HighModeHero/>
      <HighModeCards/>
      <MiniActivities/>
      <HighTips/>
      <HighPlug/>
    </HighModeBackground>
  );
}

export default HighMode;
