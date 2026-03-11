import React from "react";
import { Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
const requestedRecords = [
  { id: 1, patient: "Robert Smith", recordType: "Vitals & Allergies", status: "Approved" },
  { id: 2, patient: "Emma Wilson", recordType: "Lab Results", status: "Pending" },
];
const PatientsRecordsTab = () => (
  <Card>
    <CardHeader>
      <CardTitle>Medical Wallet Access</CardTitle>
      <CardDescription>Manage access to patient records via the blockchain.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input placeholder="Search patient by name or ID..." className="max-w-sm" />
          <Button variant="secondary"><Search className="h-4 w-4" /></Button>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-3">Recent Record Requests</h4>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Requested Record</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {requestedRecords.map((req) => (
                  <tr key={req.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{req.patient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{req.recordType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        req.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>{req.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {req.status === 'Approved' ? (
                        <Button variant="ghost" size="sm" className="text-blue-600">View Data</Button>
                      ) : (
                        <Button variant="ghost" size="sm" disabled>Awaiting Consent</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
export default PatientsRecordsTab;