"use client";

import { HStack, Center } from "@chakra-ui/react";
import { Layout } from "@/components/Layout";
import { Sidebar, SidebarItem } from "@/components/Sidebar";
import subdomains from "@/subdomains";

const SidebarItems: SidebarItem[] = [{ name: "Wallet Bridge", path: "bridge" }];

export const WalletLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Center>{children}</Center>
    </Layout>
  );
};
