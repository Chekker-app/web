import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc } from 'firebase/firestore';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';
import { db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();

  const decoded = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const userInfo = await prisma.user.findUniqueOrThrow({
    where: { id: (decoded?.id as string) || '' },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  const feedbacksCollection = collection(db, 'feedbacks');

  await addDoc(feedbacksCollection, {
    title,
    description,
    userId: userInfo?.id,
    userEmail: userInfo?.email,
    userName: userInfo?.name,
  });

  return NextResponse.json(
    { message: 'feedback sent successfull' },
    { status: 201 },
  );
}
