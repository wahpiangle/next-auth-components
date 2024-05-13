"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export default function NewVerificationForm() {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(async () => {
        if (success || error) return;
        if (!token) {
            setError("Missing Token!");
            return;
        }
        newVerification(token)
            .then((res) => {
                setError(res.error);
                setSuccess(res.success);
            })
            .catch((err) => {
                setError('Something went wrong!');
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit, token, success, error]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"
        >
            <div className="flex items-center w-full justify-center">
                {!error && !success && (
                    <BeatLoader color="#000" />
                )}
                <FormSuccess message={success} />
                {
                    !success && (
                        <FormError message={error} />
                    )
                }
            </div>
        </CardWrapper>
    )
}
