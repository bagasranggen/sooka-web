import { supabaseServer } from '@/libs/fetcher/supabaseServer';
import type { SupabaseReturnProps, SupabaseVariantProps } from '@/libs/fetcher/supabaseClientAction';

export type SupabaseFetchActionProps = {
    variant: 'fetch';
    relation: SupabaseVariantProps;
};

export type SupabaseServerActionProps = SupabaseFetchActionProps;

export const supabaseServerAction = async (props: SupabaseServerActionProps): Promise<SupabaseReturnProps> => {
    const supabase = supabaseServer();

    switch (props.variant) {
        case 'fetch':
            const { data: fetchData } = await supabase.from(props.relation).select();

            return { data: fetchData };
    }
};
