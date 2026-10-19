import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1).max(100),
  category: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  url: z.string().url(),
  color: z.string().min(1).max(30),
  order: z.number().int().min(0).optional(),
  published: z.boolean().optional(),
});

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = projectSchema.parse(body);

    const maxOrder = await prisma.project.aggregate({
      _max: { order: true },
    });

    const project = await prisma.project.create({
      data: {
        ...data,
        order: data.order ?? (maxOrder._max.order ?? 0) + 1,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
