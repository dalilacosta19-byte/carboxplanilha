"use client";

import React, { useState } from "react";
import Login from "@/components/auth/login";

interface UserProfile {
  username: string;
  role: "admin" | "funcionario";
  name: string;
}

export default function Home() {
  const [user, setUser] = useState<UserProfile | null>(null);

  if (!user) {
    return <Login onLogin={(loggedInUser) => setUser(loggedInUser)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold">CARBOX PLANILHA</h1>
            <p className="text-sm text-slate-400">
              Sessão iniciada como: <span className="text-blue-400 font-semibold">{user.name}</span> ({user.role})
            </p>
          </div>
          <button
            onClick={() => setUser(null)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-all"
          >
            Sair
          </button>
        </header>

        <main className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Painel Principal</h2>
          <p className="text-slate-400 text-sm">
            Bem-vindo ao sistema! O seu acesso foi validado com sucesso.
          </p>
        </main>
      </div>
    </div>
  );
}
