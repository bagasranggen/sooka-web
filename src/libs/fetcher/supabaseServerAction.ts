import { supabaseServer } from '@/libs/fetcher/supabaseServer';
import type { SupabaseReturnProps, SupabaseVariantProps } from '@/libs/fetcher/supabaseClientAction';

export type SupabaseFetchActionProps = {
    variant: 'fetch';
    relation: SupabaseVariantProps;
};

export type SupabaseFetchLimitActionProps = {
    variant: 'fetch-limit';
    relation: SupabaseVariantProps;
    limit: number;
};

export type SupabaseFetchFindActionProps = {
    variant: 'fetch-find';
    relation: SupabaseVariantProps;
    slug: string;
};

export type SupabaseFetchFilterActionProps = {
    variant: 'fetch-filter';
    relation: SupabaseVariantProps;
    filter: {
        key: string;
        slug: string;
    };
};

export type SupabaseServerActionProps =
    | SupabaseFetchActionProps
    | SupabaseFetchLimitActionProps
    | SupabaseFetchFindActionProps
    | SupabaseFetchFilterActionProps;

export const supabaseServerAction = async (props: SupabaseServerActionProps): Promise<SupabaseReturnProps> => {
    const supabase = supabaseServer();

    switch (props.variant) {
        case 'fetch':
            const { data: fetchData } = await supabase
                .from(props.relation)
                .select()
                .order('order', { ascending: true });

            return { data: fetchData };

        case 'fetch-limit':
            const { data: fetchLimitData } = await supabase
                .from(props.relation)
                .select()
                .order('order', { ascending: true })
                .limit(props.limit);

            return { data: fetchLimitData };

        case 'fetch-find':
            const { data: fetchFindData } = await supabase.from(props.relation).select('*').eq('slug', props.slug);

            return { data: fetchFindData };

        case 'fetch-filter':
            const { data: fetchFilterData } = await supabase
                .from(props.relation)
                .select()
                .eq(props.filter.key, props.filter.slug)
                .order('order', { ascending: true });

            return { data: fetchFilterData };
    }
};
