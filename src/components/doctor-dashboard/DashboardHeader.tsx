import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
interface DashboardHeaderProps {
  isAvailable: boolean;
  onToggle: () => void;
}
const DashboardHeader = ({ isAvailable, onToggle }: DashboardHeaderProps) => (
  <header className="bg-card border-b sticky top-0 z-10">
    <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Physician Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back, Dr. Smith</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
          <span className={`h-3 w-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-muted-foreground'}`} />
          <span className="text-sm font-medium">{isAvailable ? 'Available' : 'Offline'}</span>
          <Switch checked={isAvailable} onCheckedChange={onToggle} className="ml-2" />
        </div>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">2</span>
        </Button>
      </div>
    </div>
  </header>
);
export default DashboardHeader;