"use client"

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
    const onAPIRouteClick = () => {
        fetch("/api/admin").then(res => {
            if (res.ok) {
                toast.success("OK")
            } else {
                toast.error("FORBIDDEN")
            }
        })
    }
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    Admin Page
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You have permission to access this page." />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-xl font-semibold text-gray-700">
                        Admin only API Route
                    </p>
                    <Button onClick={onAPIRouteClick}>
                        Click to Test
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AdminPage