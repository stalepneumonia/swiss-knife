import type { Metadata } from "next";
import { getMetadata } from "@/utils";
// Putting the page into separate component as it uses "use client" which doesn't work with `generateMetadata`
import { ContractPage as ContractP } from "@/components/pages/ContractPage";
import { generateMetadata as layoutGenerateMetadata } from "./layout";
import { fetchContractAbi } from "@/lib/decoder";

interface PageProps {
  params: { address: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
  params: { address },
  searchParams,
}: PageProps): Promise<Metadata> {
  let title = `Contract ${address} | Swiss-Knife.xyz`;

  let chainId = searchParams.chainId as string | undefined;

  // add contract name to the title if possible
  let contractName = undefined as string | undefined;
  if (chainId) {
    try {
      const fetchedAbi = await fetchContractAbi({
        address,
        chainId: parseInt(chainId),
      });
      contractName = fetchedAbi?.name;
    } catch {}
  }
  if (contractName) {
    title = `${contractName} - ${address} | Swiss-Knife.xyz`;
  }

  const layoutMetadata = await layoutGenerateMetadata({ params: { address } });

  return getMetadata({
    title,
    description: layoutMetadata.description as string,
    images: layoutMetadata.openGraph?.images as string,
  });
}

const ContractPage = ({
  params,
}: {
  params: {
    address: string;
  };
}) => {
  return <ContractP params={params} />;
};
export default ContractPage;