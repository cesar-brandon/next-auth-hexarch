"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  AccountRequest,
  AccountValidator,
} from "@/sections/auth/lib/validators/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function CredentialsSignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<AccountRequest>({
    resolver: zodResolver(AccountValidator),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        identifier: data.identifier,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        if (result.status === 401) {
          toast({
            title: "Error",
            description: "Credenciales inválidas.",
            variant: "destructive",
          });
        }
        if (result.status === 500) {
          toast({
            title: "Error",
            description:
              "Error al iniciar sesión. Inténtalo de nuevo más tarde.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Éxito",
          description: "Inicio de sesión exitoso.",
          variant: "default",
        });
        router.push("/home");
      }
    } catch (error) {
      toast({
        title: "Algo salió mal",
        description: "Error al iniciar sesión. Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form id="credentials-sign-in-form" onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button
        type="submit"
        form="credentials-sign-in-form"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        Sign In
      </Button>
    </div>
  );
}
