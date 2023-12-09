import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const decoded = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!decoded) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const userInfo = await prisma.user.findUniqueOrThrow({
    where: { id: (decoded?.id as string) || '' },
    select: {
      Plan: {
        select: {
          intervalMin: true,
          quantityEmailsAllowed: true,
        },
      },
      id: true,
    },
  });

  const userPlanEmailsLimit = userInfo?.Plan?.quantityEmailsAllowed ?? 1;

  if (body.secondary_email && userPlanEmailsLimit < 2) {
    return NextResponse.json(
      {
        message:
          'Não foi possível atualizar informação. Seu plano atual não permite.',
      },
      { status: 403 },
    );
  }

  if (body.terciary_email && userPlanEmailsLimit < 3) {
    return NextResponse.json(
      {
        message:
          'Não foi possível atualizar informação. Seu plano atual não permite.',
      },
      { status: 403 },
    );
  }

  try {
    const updatedUserInfo = await prisma.user.update({
      where: { id: (decoded?.id as string) || '' },
      data: body,
    });

    const infoToIterate = {
      first: updatedUserInfo.email,
      second: updatedUserInfo.secondary_email,
      third: updatedUserInfo.terciary_email,
    };

    let usedEmailsQuantity = 0;

    Object.values(infoToIterate).map((value) => {
      if (value) {
        usedEmailsQuantity++;
      }
    });

    await prisma.subscription.update({
      where: { userId: userInfo?.id },
      data: { usedEmails: usedEmailsQuantity },
    });

    return NextResponse.json({ message: 'User info updated' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Não foi possível atualizar as informações. Tente novamente.',
      },
      { status: 400 },
    );
  }
}
