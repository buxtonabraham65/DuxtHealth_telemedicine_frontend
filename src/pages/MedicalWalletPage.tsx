import { useState } from "react";
import {
  Shield,
  ShieldCheck,
  ShieldX,
  FileText,
  FlaskConical,
  Pill,
  HeartPulse,
  Stethoscope,
  ClipboardList,
  UserCheck,
  UserX,
  Clock,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Plus,
  AlertTriangle,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type RecordCategory = "all" | "consultations" | "labs" | "medications" | "vitals" | "diagnoses" | "notes";

interface MedicalRecord {
  id: string;
  category: RecordCategory;
  title: string;
  date: string;
  doctor: string;
  summary: string;
  isEncrypted: boolean;
}

interface DoctorAccess {
  id: string;
  name: string;
  specialty: string;
  accessGranted: boolean;
  grantedDate?: string;
  lastAccessed?: string;
}

const mockRecords: MedicalRecord[] = [
  { id: "1", category: "consultations", title: "General Check-up", date: "Mar 5, 2026", doctor: "Dr. Kwame Asante", summary: "Routine physical examination. All vitals normal. Blood pressure 120/80.", isEncrypted: true },
  { id: "2", category: "labs", title: "Complete Blood Count", date: "Mar 3, 2026", doctor: "Dr. Ama Mensah", summary: "CBC results within normal range. WBC 7.2, RBC 4.8, Hemoglobin 14.2.", isEncrypted: true },
  { id: "3", category: "medications", title: "Prescription - Amoxicillin", date: "Feb 28, 2026", doctor: "Dr. Kwame Asante", summary: "Amoxicillin 500mg, 3 times daily for 7 days. For bacterial infection.", isEncrypted: true },
  { id: "4", category: "vitals", title: "Blood Pressure Monitoring", date: "Feb 25, 2026", doctor: "Self-recorded", summary: "BP: 118/76, HR: 72bpm, SpO2: 98%, Temp: 36.8°C, Weight: 74kg.", isEncrypted: true },
  { id: "5", category: "diagnoses", title: "Upper Respiratory Infection", date: "Feb 28, 2026", doctor: "Dr. Kwame Asante", summary: "Diagnosed with acute upper respiratory tract infection. Mild severity.", isEncrypted: true },
  { id: "6", category: "notes", title: "Treatment Plan Update", date: "Mar 1, 2026", doctor: "Dr. Ama Mensah", summary: "Follow-up in 2 weeks. Continue current medication. Rest recommended.", isEncrypted: true },
  { id: "7", category: "labs", title: "Urinalysis", date: "Feb 20, 2026", doctor: "Lab Corp", summary: "Normal urinalysis. No proteinuria. Glucose negative. pH 6.0.", isEncrypted: true },
  { id: "8", category: "consultations", title: "Dermatology Consultation", date: "Feb 15, 2026", doctor: "Dr. Kofi Adjei", summary: "Skin rash evaluation. Prescribed topical cream. Follow up in 1 week.", isEncrypted: true },
  { id: "9", category: "vitals", title: "Allergy Profile", date: "Jan 10, 2026", doctor: "Dr. Ama Mensah", summary: "Known allergies: Penicillin (severe), Shellfish (mild). Blood type: O+.", isEncrypted: true },
];

const mockDoctorAccess: DoctorAccess[] = [
  { id: "d1", name: "Dr. Kwame Asante", specialty: "General Practice", accessGranted: true, grantedDate: "Jan 15, 2026", lastAccessed: "Mar 5, 2026" },
  { id: "d2", name: "Dr. Ama Mensah", specialty: "Internal Medicine", accessGranted: true, grantedDate: "Feb 1, 2026", lastAccessed: "Mar 3, 2026" },
  { id: "d3", name: "Dr. Kofi Adjei", specialty: "Dermatology", accessGranted: false },
  { id: "d4", name: "Dr. Abena Osei", specialty: "Cardiology", accessGranted: false },
];

const categories: { id: RecordCategory; label: string; icon: typeof FileText }[] = [
  { id: "all", label: "All", icon: FileText },
  { id: "consultations", label: "Visits", icon: Stethoscope },
  { id: "labs", label: "Labs", icon: FlaskConical },
  { id: "medications", label: "Meds", icon: Pill },
  { id: "vitals", label: "Vitals", icon: HeartPulse },
  { id: "diagnoses", label: "Dx", icon: ClipboardList },
  { id: "notes", label: "Notes", icon: FileText },
];

const MedicalWalletPage = () => {
  const [activeTab, setActiveTab] = useState<"records" | "access">("records");
  const [selectedCategory, setSelectedCategory] = useState<RecordCategory>("all");
  const [doctorAccess, setDoctorAccess] = useState(mockDoctorAccess);
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  const filteredRecords = selectedCategory === "all"
    ? mockRecords
    : mockRecords.filter((r) => r.category === selectedCategory);

  const toggleAccess = (doctorId: string) => {
    setDoctorAccess((prev) =>
      prev.map((d) => {
        if (d.id === doctorId) {
          const newAccess = !d.accessGranted;
          toast[newAccess ? "success" : "info"](
            newAccess ? `Access granted to ${d.name}` : `Access revoked for ${d.name}`
          );
          return {
            ...d,
            accessGranted: newAccess,
            grantedDate: newAccess ? "Mar 8, 2026" : undefined,
            lastAccessed: undefined,
          };
        }
        return d;
      })
    );
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.id === category);
    return cat ? cat.icon : FileText;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Medical Wallet" subtitle="Blockchain-Secured Records" />

      {/* Security Banner */}
      <div className="px-4 pt-4">
        <div className="bg-gradient-primary rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/15 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-heading font-bold text-primary-foreground">Blockchain Protected</h3>
            <p className="text-[10px] text-primary-foreground/70 mt-0.5">
              Your records are encrypted on the DuxtHealth blockchain. Only you control access.
            </p>
          </div>
          <Lock className="w-5 h-5 text-primary-foreground/50" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-4 mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "Total Records", value: mockRecords.length.toString(), icon: FileText },
          { label: "Doctors Allowed", value: doctorAccess.filter((d) => d.accessGranted).length.toString(), icon: UserCheck },
          { label: "Encrypted", value: "100%", icon: Lock },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-3 shadow-card text-center">
            <stat.icon className="w-4 h-4 text-secondary mx-auto mb-1" />
            <p className="text-base font-bold text-foreground">{stat.value}</p>
            <p className="text-[9px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tab Toggle */}
      <div className="px-4 mt-5">
        <div className="flex gap-1 bg-muted rounded-xl p-1">
          <button
            onClick={() => setActiveTab("records")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "records" ? "bg-card text-foreground shadow-card" : "text-muted-foreground"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            My Records
          </button>
          <button
            onClick={() => setActiveTab("access")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "access" ? "bg-card text-foreground shadow-card" : "text-muted-foreground"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Doctor Access
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 mt-4 animate-fade-in">
        {activeTab === "records" && (
          <>
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <cat.icon className="w-3 h-3" />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Records List */}
            <div className="space-y-2 mt-3">
              {filteredRecords.map((record) => {
                const Icon = getCategoryIcon(record.category);
                const isExpanded = expandedRecord === record.id;
                return (
                  <button
                    key={record.id}
                    onClick={() => setExpandedRecord(isExpanded ? null : record.id)}
                    className="w-full bg-card rounded-xl border border-border p-3.5 shadow-card text-left transition-all hover:shadow-card-hover"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-secondary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-foreground truncate">{record.title}</p>
                          {record.isEncrypted && <Lock className="w-3 h-3 text-success flex-shrink-0" />}
                        </div>
                        <p className="text-[10px] text-muted-foreground">{record.doctor} • {record.date}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{record.summary}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[9px] bg-success/10 text-success px-2 py-0.5 rounded-full font-medium">
                            Encrypted on blockchain
                          </span>
                          <span className="text-[9px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                            {record.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "access" && (
          <div className="space-y-3">
            {/* Access Info */}
            <div className="bg-gold/10 rounded-xl p-3 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-gold-foreground mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-gold-foreground leading-relaxed">
                Only doctors you approve can view your medical records. You can revoke access at any time. All access is logged on the blockchain.
              </p>
            </div>

            {/* Doctor Access List */}
            {doctorAccess.map((doctor) => (
              <div key={doctor.id} className="bg-card rounded-xl border border-border p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    doctor.accessGranted ? "bg-success/10" : "bg-muted"
                  }`}>
                    {doctor.accessGranted ? (
                      <ShieldCheck className="w-5 h-5 text-success" />
                    ) : (
                      <ShieldX className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{doctor.name}</p>
                    <p className="text-[10px] text-muted-foreground">{doctor.specialty}</p>
                  </div>
                  <button
                    onClick={() => toggleAccess(doctor.id)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                      doctor.accessGranted
                        ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                        : "bg-success/10 text-success hover:bg-success/20"
                    }`}
                  >
                    {doctor.accessGranted ? "Revoke" : "Grant"}
                  </button>
                </div>
                {doctor.accessGranted && (
                  <div className="mt-3 pt-2 border-t border-border flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-[9px] text-muted-foreground">Granted: {doctor.grantedDate}</span>
                    </div>
                    {doctor.lastAccessed && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[9px] text-muted-foreground">Last viewed: {doctor.lastAccessed}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Add Doctor */}
            <Button variant="outline" className="w-full rounded-xl h-12 border-dashed">
              <Plus className="w-4 h-4 mr-2" />
              Add Doctor by ID
            </Button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default MedicalWalletPage;
