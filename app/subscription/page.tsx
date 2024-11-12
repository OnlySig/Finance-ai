import React from "react";
import NavBar from "../_components/navBar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { Badge } from "../_components/ui/badge";
import actionUseUserId from "../_hooks/actionUserId";
import AcquirePlanButton from "./_actions/_components/acquire-plan-button";
import getMonthTransactions from "../_data/get-count-transactions";

const SubscriptionPage = async () => {
  const { userId, user } = await actionUseUserId();
  if (!userId) redirect("/login");
  const isProPlan = user.publicMetadata.subscriptionPlan === "pro";
  const getMonth = await getMonthTransactions();
  return (
    <>
      <NavBar />
      <div className="space-y-6 p-8">
        <h1 className="text-2xl font-bold">Assinatura</h1>
        <div className="flex gap-6">
          <Card className="w-[450px] py-8">
            <CardHeader className="relative border-b border-solid text-center text-2xl font-semibold">
              <h2>Plano Básico</h2>
              {!isProPlan && <Badge className="absolute">Atual</Badge>}
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col justify-center space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>
                  Apenas 10 transações por mês (
                  <span
                    className={getMonth >= 10 ? "text-danger" : "text-primary"}
                  >
                    {getMonth}
                  </span>
                  /10)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-[450px] py-8">
            <CardHeader className="relative border-b border-solid text-center text-2xl font-semibold">
              <h2>Plano Pro</h2>
              {isProPlan && <Badge className="absolute">Atual</Badge>}
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19</span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col justify-center space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>
              <AcquirePlanButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
