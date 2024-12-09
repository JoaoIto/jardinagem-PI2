import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from "@/app/db/connectDb";
import { Cliente } from "@/app/interfaces/Cliente";

// Listar todos os clientes
export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const clientes = await db.collection('clientes').find().toArray();
        return NextResponse.json(clientes);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar clientes' }, { status: 500 });
    }
}

// Criar um novo cliente
export async function POST(request: Request) {
    try {
        const body: Cliente = await request.json();
        const { db } = await connectToDatabase();

        const result = await db.collection('clientes').insertOne(body);

        return NextResponse.json({ ...body, id: result.insertedId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar cliente' }, { status: 400 });
    }
}

// Atualizar um cliente existente
export async function PUT(request: Request) {
    try {
        const body: Partial<Cliente> = await request.json();
        const { db } = await connectToDatabase();

        if (!body._id) {
            return NextResponse.json({ error: 'ID do cliente é obrigatório' }, { status: 400 });
        }

        const result = await db
            .collection('clientes')
            .updateOne({ _id: new ObjectId(body._id) }, { $set: body });

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar cliente' }, { status: 400 });
    }
}

// Deletar um cliente
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID do cliente é obrigatório' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const result = await db.collection('clientes').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao deletar cliente' }, { status: 400 });
    }
}
