import { prisma } from '@/lib/prisma';
import { add, differenceInDays, format } from 'date-fns';
import { NextResponse } from 'next/server';

interface ParamsProps {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params }: ParamsProps) {
  const site = await prisma.site.findUniqueOrThrow({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({
    ...site,
    sslValidTo: format(
      add(new Date(site.sslValidTo), { hours: 3 }),
      'dd/MM/yyyy HH:mm:ss',
    ),
    sslValidFrom: format(
      add(new Date(site.sslValidFrom), { hours: 3 }),
      'dd/MM/yyyy HH:mm:ss',
    ),
    sslDaysRemaining: differenceInDays(new Date(site.sslValidTo), new Date()),
    createdAt: format(new Date(site.createdAt), 'dd/MM/yyyy HH:mm:ss'),
  });
}

export async function PATCH(request: Request, { params }: ParamsProps) {
  const body = await request.json();

  try {
    await prisma.site.update({
      where: {
        id: params.id,
      },
      data: body,
    });
    return NextResponse.json({ message: 'infos updated' });
  } catch (error) {
    return NextResponse.json(
      { message: 'error when update field' },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request, { params }: ParamsProps) {
  try {
    await prisma.site.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: 'site deleted' });
  } catch (error) {
    return NextResponse.json(
      { message: 'error when delete site' },
      { status: 400 },
    );
  }
}
