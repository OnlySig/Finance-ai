import Image from "next/image"
import { Button } from "../_components/ui/button"
import { LogInIcon } from "lucide-react"

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex flex-col justify-center h-full max-w-[500px] mx-auto">
        <Image 
          src="/logoLogin.svg" 
          alt="logo do Finance Ai" 
          width={173} 
          height={39} 
          className="mb-8"
        />
        <h1 className="text-4xl font-bold mb-3">Bem-vindo</h1>
        <p className="text-muted-foreground mb-8">A Finance AI é uma plataforma de gestão financeira que utiliza IA para monitorar suas movimentações, e oferecer insights personalizados, facilitando o controle do seu orçamento.</p>
        <Button 
          variant="ghost">
          <LogInIcon />
          Fazer login ou Criar conta
        </Button>
      </div> 
      <div className="relative h-full w-full">
        <Image 
          src="/loginPageImage.png" 
          alt="Imagem da pagina de login." 
          fill className="object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage