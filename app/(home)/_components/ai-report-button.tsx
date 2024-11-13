"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { FileChartPie, Loader2Icon, LockKeyhole } from "lucide-react";
import generateAiReport from "../actions/generate-ai-report";
import { useState } from "react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";

interface AiReportButtonProp {
  month: string;
  isPro: boolean;
}
const AiReportButton = ({ month, isPro }: AiReportButtonProp) => {
  const [report, setReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerateReports = async () => {
    try {
      setIsLoading(true);
      const resp = await generateAiReport({ month });
      if (!resp) throw new Error("Sem resposta do chat.");
      setReport(resp);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          Relatório IA
          <FileChartPie />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        {isPro ? (
          <>
            <DialogHeader>
              <DialogTitle>Relatório AI</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <Markdown>{report}</Markdown>
            </ScrollArea>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setReport("")}>
                Limpar
              </Button>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleGenerateReports}
                disabled={isLoading || !isPro}
              >
                {isLoading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Gerar relatório"
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Relatório AI</DialogTitle>
              <DialogDescription>
                Para desbloquear essa função assine o plano pro em assinaturas.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription">
                  Desbloquear
                  <LockKeyhole />
                </Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
