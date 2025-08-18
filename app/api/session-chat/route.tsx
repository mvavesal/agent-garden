import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
export async function POST(req: NextRequest) {
    const { notes, selectedAgent } = await req.json();
    const user = await currentUser();
    
    // Check if the selected doctor requires subscription and if user has pro plan
    if (selectedAgent?.subscriptionRequired) {
        //@ts-ignore
        const hasPro = user?.organizationMemberships?.[0]?.organization?.publicMetadata?.plan === 'pro' ||
                      user?.publicMetadata?.plan === 'pro' ||
                      user?.privateMetadata?.plan === 'pro';
        
        if (!hasPro) {
            return NextResponse.json(
                { error: "Premium subscription required for this agent" }, 
                { status: 403 }
            );
        }
    }
    
    try {
        const sessionId = uuidv4();
        const result = await db.insert(SessionChatTable).values({
            sessionId: sessionId,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            notes: notes,
            selectedAgent: selectedAgent,
            createdOn: (new Date()).toString()
            //@ts-ignore
        }).returning({ SessionChatTable });

        return NextResponse.json(result[0]?.SessionChatTable);
    } catch (e) {
        return NextResponse.json(e)
    }
}


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    const user = await currentUser();

    if (sessionId == 'all') {
        const result = await db.select().from(SessionChatTable)
            //@ts-ignore
            .where(eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(SessionChatTable.id));

        return NextResponse.json(result);
    }
    else {
        const result = await db.select().from(SessionChatTable)
            //@ts-ignore
            .where(eq(SessionChatTable.sessionId, sessionId));

        return NextResponse.json(result[0]);
    }

}