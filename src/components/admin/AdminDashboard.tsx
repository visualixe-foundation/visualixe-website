"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  color: string;
  order: number;
  published: boolean;
};

const COLORS = [
  "emerald",
  "amber",
  "blue",
  "rose",
  "violet",
  "orange",
  "sky",
  "pink",
  "lime",
  "yellow",
  "cyan",
  "teal",
];

const emptyForm = {
  title: "",
  category: "",
  description: "",
  url: "",
  color: "cyan",
  order: 0,
  published: true,
};

export default function AdminDashboard({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function startEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      url: project.url,
      color: project.color,
      order: project.order,
      published: project.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editingId) {
        const res = await fetch(`/api/projects/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to update");
        const updated = await res.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === editingId ? updated : p))
        );
        setMessage("Project updated");
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to create");
        const created = await res.json();
        setProjects((prev) => [...prev, created].sort((a, b) => a.order - b.order));
        setMessage("Project added");
      }
      cancelEdit();
      router.refresh();
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setMessage("Project deleted");
      router.refresh();
    } catch {
      setMessage("Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  async function togglePublished(project: Project) {
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !project.published }),
      });
      if (!res.ok) throw new Error("Failed");
      const updated = await res.json();
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? updated : p))
      );
      router.refresh();
    } catch {
      setMessage("Failed to update status");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-zinc-400">Manage published projects</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-sm text-zinc-400 hover:text-cyan-400 transition"
            >
              View site ↗
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-sm bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {message && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-4 py-3 rounded-xl text-sm">
            {message}
          </div>
        )}

        {/* Form */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8">
          <h2 className="text-lg font-semibold mb-6">
            {editingId ? "Edit Project" : "Add New Project"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                  placeholder="e.g. EDUCATION · TOOL"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm text-zinc-400 mb-1.5">Live URL</label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  required
                  placeholder="https://..."
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Color</label>
                <select
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {COLORS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-zinc-400 mb-1.5">Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) =>
                    setForm({ ...form, order: parseInt(e.target.value) || 0 })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      setForm({ ...form, published: e.target.checked })
                    }
                    className="w-5 h-5 rounded accent-cyan-500"
                  />
                  <span className="text-sm text-zinc-300">Published</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-black font-semibold px-6 py-2.5 rounded-xl transition"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Project"
                  : "Add Project"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-zinc-800 hover:bg-zinc-700 px-6 py-2.5 rounded-xl transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Project list */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            All Projects ({projects.length})
          </h2>

          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-medium text-zinc-500">
                      #{project.order}
                    </span>
                    <h3 className="font-semibold truncate">{project.title}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        project.published
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-zinc-700 text-zinc-400"
                      }`}
                    >
                      {project.published ? "Live" : "Draft"}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 truncate">
                    {project.category}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:underline truncate block mt-1"
                  >
                    {project.url}
                  </a>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => togglePublished(project)}
                    className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition"
                  >
                    {project.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    onClick={() => startEdit(project)}
                    className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {projects.length === 0 && (
              <p className="text-zinc-500 text-center py-10">
                No projects yet. Add your first one above.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
