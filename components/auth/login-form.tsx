"use client";

import { LoginSchema } from "@/schemas"
import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlErrorMessage = searchParams.get("error") === "OAuthAccountNotLinked" ?
        "Email already in use with another provider!" :
        "";

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data?.error ?? "");
                    setSuccess(data?.success ?? "");
                    // TODO: Add when 2FA is implemented
                })
        })
    }

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Create an account"
            backButtonHref="/auth/register"
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@example.com" {...field} disabled={isPending} />
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
                                        <Input placeholder="******" {...field} disabled={isPending} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error || urlErrorMessage} />
                    <FormSuccess message={success} />
                    <Button type="submit" disabled={isPending} className="w-full">Submit</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}