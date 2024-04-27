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
    find?: {
        key: string;
        value: string | string[] | number | number[];
    };
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
            let key = 'slug';
            let value: string | string[] | number | number[] = [];

            if (props?.find?.key) key = props.find.key;

            if (props?.find?.value) {
                if (Array.isArray(props.find.value)) value = props.find.value;
                if (!Array.isArray(props.find.value)) value = [props.find.value as string];
            }

            const { data: fetchFindData } = await supabase.from(props.relation).select('*').in(key, value);

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
