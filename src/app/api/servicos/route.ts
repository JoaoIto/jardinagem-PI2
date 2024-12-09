import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import {connectToDatabase} from "@/app/db/connectDb";
import {Servico} from "@/app/interfaces/Servico";

// Listar todos os serviços
export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const servicos = await db.collection('servicos').find().toArray();
        return NextResponse.json(servicos);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao listar serviços' }, { status: 500 });
    }
}

// Criar um novo serviço
export async function POST(request: Request) {
    try {
        const body: Servico = await request.json();
        const { db } = await connectToDatabase();

        const novoServico = { ...body, status: 'em-atendimento' };
        const result = await db.collection('servicos').insertOne(novoServico);

        return NextResponse.json({ ...novoServico, id: result.insertedId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao criar serviço' }, { status: 400 });
    }
}

// Atualizar um serviço existente
export async function PUT(request: Request) {
    try {
        const body: Partial<Servico> = await request.json();
        const { db } = await connectToDatabase();

        if (!body.id) {
            return NextResponse.json({ error: 'ID do serviço é obrigatório' }, { status: 400 });
        }

        const result = await db
            .collection('servicos')
            .updateOne({ _id: new ObjectId(body.id) }, { $set: body });

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar serviço' }, { status: 400 });
    }
}

// Deletar um serviço
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID do serviço é obrigatório' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const result = await db.collection('servicos').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao deletar serviço' }, { status: 400 });
    }
}

// Atualizar apenas o status de um serviço
export async function PATCH(request: Request) {
    try {
        const body: { id: string; status: Servico['status'] } = await request.json();
        const { db } = await connectToDatabase();

        if (!body.id) {
            return NextResponse.json({ error: 'ID do serviço é obrigatório' }, { status: 400 });
        }

        if (!body.status) {
            return NextResponse.json({ error: 'Status é obrigatório' }, { status: 400 });
        }

        const result = await db
            .collection('servicos')
            .updateOne({ _id: new ObjectId(body.id) }, { $set: { status: body.status } });

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: 'Serviço não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true, updatedStatus: body.status });
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao atualizar o status do serviço' }, { status: 400 });
    }
}

