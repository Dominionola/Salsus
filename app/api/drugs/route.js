import { NextResponse } from 'next/server';
import { searchDrug } from '@/lib/mockData';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json(
            { status: "ERROR", message: "Query parameter 'q' is required" },
            { status: 400 }
        );
    }

    try {
        const drug = await searchDrug(query);

        if (drug) {
            return NextResponse.json({
                status: "FOUND",
                ...drug
            });
        } else {
            return NextResponse.json({
                status: "NOT_FOUND",
                message: "Drug not found in public registry",
                nextAction: "VERIFY_ON_NAFDAC"
            });
        }
    } catch (error) {
        return NextResponse.json(
            { status: "ERROR", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
