"use client";

import React from "react";
import RecoveryFormEmail from "../RecoveryFormEmail";
import RecoveryFormOPT from "../RecoveryFormOPT";
import Link from "next/link";

import RecoveryFormPassword from "../RecoveryFormPassword";

export default function RecoveryController() {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [email, setEmail] = React.useState<string>("");
  const [token, setToken] = React.useState<string>("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {step === 1 && (
        <RecoveryFormEmail
          setStep={setStep}
          setEmail={setEmail}
          email={email}
          setToken={setToken}
          token={token}
        />
      )}
      {step === 2 && (
        <RecoveryFormOPT
          setStep={setStep}
          setEmail={setEmail}
          email={email}
          setToken={setToken}
          token={token}
        />
      )}
      {step === 3 && (
        <RecoveryFormPassword
          setStep={setStep}
          setEmail={setEmail}
          email={email}
          setToken={setToken}
          token={token}
        />
      )}
      <Link href="/signin">Voltar</Link>
    </div>
  );
}
