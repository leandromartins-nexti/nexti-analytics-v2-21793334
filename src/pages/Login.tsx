import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import nextiLogo from "@/assets/nexti-logo.png";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!client.trim()) {
      setError("Informe a empresa");
      return;
    }

    const normalizedClient = client.trim().toLowerCase().replace(/\s+/g, "");
    const finalClient = normalizedClient === "atitude" || normalizedClient === "atitudeserviços"
      ? "atitudeservicos"
      : normalizedClient;

    const result = login(username, password);
    if (!result.success) setError(result.error || "Erro ao fazer login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center space-y-3 pb-2">
          <div className="flex justify-center">
            <img src={nextiLogo} alt="Nexti" className="h-10 object-contain" />
          </div>
          <CardTitle className="text-xl">Entrar no Analytics</CardTitle>
          <CardDescription>Informe suas credenciais para acessar</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Empresa</Label>
              <Input
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Nome da empresa"
                autoComplete="organization"
              />
            </div>

            <div className="space-y-2">
              <Label>Usuário</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nome de usuário"
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <Label>Senha</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg">
              <LogIn className="h-4 w-4 mr-2" />
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
