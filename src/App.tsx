import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import DoctorsPage from "./pages/DoctorsPage";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import PatientDashboard from "./pages/PatientDashboard";
import PaymentPage from "./pages/PaymentPage";
import CallPage from "./pages/CallPage";
import EmergencyPage from "./pages/EmergencyPage";
import PharmacyPage from "./pages/PharmacyPage";
import HomecarePage from "./pages/HomecarePage";
import ProfilePage from "./pages/ProfilePage";
import DuxtCoinPage from "./pages/DuxtCoinPage";
import MedicalWalletPage from "./pages/MedicalWalletPage";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/patientdashboard" element={<PatientDashboard />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />
          <Route path="/payment/:doctorId" element={<PaymentPage />} />
          <Route path="/call/:doctorId" element={<CallPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/pharmacy" element={<PharmacyPage />} />
          <Route path="/homecare" element={<HomecarePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/duxtcoin" element={<DuxtCoinPage />} />
          <Route path="/medical-wallet" element={<MedicalWalletPage />} />
          <Route path="/doctordashboard" element={<DoctorDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
