import { supabaseClient } from '@/libs/fetcher/supabaseClient';
import { SUPABASE_VARIANTS } from '@/libs/handles';
import { PostgrestError } from '@supabase/supabase-js';

export type SupabaseVariantProps = (typeof SUPABASE_VARIANTS)[keyof typeof SUPABASE_VARIANTS];

export type SupabaseInsertActionProps = {
    variant: 'insert';
    relation: SupabaseVariantProps;
    data: any[];
};

export type SupabaseDeleteActionProps = {
    variant: 'delete';
    relation: SupabaseVariantProps;
    id: number;
};

export type SupabaseReturnProps = {
    data?: any[] | null;
    error?: PostgrestError | null;
};

export type SupabaseActionProps = SupabaseInsertActionProps | SupabaseDeleteActionProps;

export const supabaseAction = async (props: SupabaseActionProps): Promise<SupabaseReturnProps> => {
    const supabase = supabaseClient();

    switch (props.variant) {
        case 'insert':
            const { data: insertData, error: insertError }: SupabaseReturnProps = await supabase
                .from(props.relation)
                .insert(props.data)
                .select();

            console.log(insertData, insertError);

            return { data: insertData, error: insertError };

        case 'delete':
            const { error: deleteError }: SupabaseReturnProps = await supabase
                .from(props.relation)
                .delete()
                .eq('id', props.id.toString());

            return { error: deleteError };
    }
};
