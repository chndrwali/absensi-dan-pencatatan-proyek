"use client";

import PageContainer from "@/components/custom/page-container";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { AbsensiForm } from "../form/absensi-form";
import { KeuanganForm } from "../form/keuangan-form";

export const HomeSection = () => {
  const [activeTab, setActiveTab] = useState("projects");
  
  return (
    <PageContainer pageTitle="Home" pageDescription="Home" scrollable >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="projects" className="gap-2">
            Absensi
          </TabsTrigger>
          <TabsTrigger value="skills" className="gap-2">
            Pemasukan
          </TabsTrigger>
          <TabsTrigger value="certificates" className="gap-2">
            Pengeluaran
          </TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <AbsensiForm />
        </TabsContent>
        <TabsContent value="skills">
          <KeuanganForm variant="pemasukan" />
        </TabsContent>
        <TabsContent value="certificates">
          <KeuanganForm variant="pengeluaran" />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};
