// import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  console.log('aquii', body);

  return NextResponse.json(body, {
    status: 201,
  });
}

// para cadastrar o usuario e já logar com o nextauth
// ao chamar a rota de cadastrar, e der sucesso
// pegar os mesmos dados e chamar a função de signin do nextauth
