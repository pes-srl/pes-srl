import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { logActivity } from "@/app/actions/activity-actions";

export async function POST(req: NextRequest) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        await logActivity(user.id, 'logout');
        await supabase.auth.signOut();
    }

    revalidatePath("/", "layout");
    return NextResponse.redirect(new URL("/login", req.url), {
        status: 302,
    });
}
