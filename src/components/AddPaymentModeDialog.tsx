"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PaymentModeForm from "./PaymentModeForm";

const AddPaymentModeDialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="gap-2 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Payment Mode</DialogTitle>
          <DialogDescription>
            Add a new payment mode to your account
          </DialogDescription>
        </DialogHeader>

        <PaymentModeForm closeDialog={() => setOpen(false)} />
        {/* <DialogFooter>
                
              </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentModeDialog;
