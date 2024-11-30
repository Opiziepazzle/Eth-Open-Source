import CardItem from "./components/CardItem";

import DashboardComponent from "./components/Dashboard";
import Setup from "./components/Setup";

export default function Dashboard() {
  return (
    <div className=" bg-[#101323] min-h-[100vh] relative z-30 flex flex-wrap">
      <DashboardComponent />
      <CardItem />
      <Setup />
    </div>
  );
}
