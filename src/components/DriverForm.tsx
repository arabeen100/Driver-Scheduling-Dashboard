import { useState } from "react";
import type { Driver } from "../types";

interface Props {
  onAdd: (d: Driver) => void;
}

export default function DriverForm({ onAdd }: Props) {
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ id: crypto.randomUUID(), name: name.trim() });
    setName("");
  };

  return (
    <form onSubmit={submit} className="p-4 border rounded-xl shadow space-y-3">
      <h2 className="text-xl font-semibold">Add Driver</h2>
      <input
        className="w-full border rounded p-2"
        placeholder="Driver name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        Add Driver
      </button>
    </form>
  );
}
