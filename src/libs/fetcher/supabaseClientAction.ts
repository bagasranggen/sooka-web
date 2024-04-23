import { supabaseClient } from '@/libs/fetcher/supabaseClient';
import { SUPABASE_VARIANTS } from '@/libs/handles';
import { PostgrestError } from '@supabase/supabase-js';
import { SupabaseFetchActionProps } from '@/libs/fetcher/supabaseServerAction';

export type SupabaseVariantProps = (typeof SUPABASE_VARIANTS)[keyof typeof SUPABASE_VARIANTS];

export type SupabaseEventsProps = {
    onFinish?: (res?: any) => void;
};

export type SupabaseInsertActionProps = {
    variant: 'insert';
    relation: SupabaseVariantProps;
    data: any[];
} & SupabaseEventsProps;

export type SupabaseUpdateActionProps = {
    variant: 'update';
    relation: SupabaseVariantProps;
    id: number;
    data: any;
} & SupabaseEventsProps;

export type SupabaseDeleteActionProps = {
    variant: 'delete';
    relation: SupabaseVariantProps;
    id: number;
} & SupabaseEventsProps;

export type SupabaseDeleteAllActionProps = {
    variant: 'delete-all';
    relation: SupabaseVariantProps;
} & SupabaseEventsProps;

export type SupabaseUserLoginActionProps = {
    variant: 'user-login';
    data: {
        email: string;
        password: string;
    };
} & SupabaseEventsProps;

export type SupabaseUserLogoutActionProps = {
    variant: 'user-logout';
} & SupabaseEventsProps;

export type SupabaseReturnProps = {
    data?: any[] | null;
    error?: PostgrestError | null;
};

export type SupabaseActionProps =
    | (SupabaseFetchActionProps & SupabaseEventsProps)
    | SupabaseInsertActionProps
    | SupabaseUpdateActionProps
    | SupabaseDeleteActionProps
    | SupabaseDeleteAllActionProps
    | SupabaseUserLoginActionProps
    | SupabaseUserLogoutActionProps;

export const supabaseClientAction = async (props: SupabaseActionProps) => {
    const supabase = supabaseClient();

    switch (props.variant) {
        case 'fetch':
            await supabase
                .from(props.relation)
                .select()
                .order('order', { ascending: true })
                .then((res) => {
                    props?.onFinish && props.onFinish(res);
                });

            break;

        case 'insert':
            await supabase
                .from(props.relation)
                .insert(props.data)
                .select()
                .then((res) => {
                    console.log(res);
                    props?.onFinish && props.onFinish(res);
                });

            break;

        case 'delete':
            await supabase
                .from(props.relation)
                .delete()
                .eq('id', props.id.toString())
                .then(() => {
                    props?.onFinish && props.onFinish();
                });

            break;

        case 'delete-all':
            await supabase
                .from(props.relation)
                .delete()
                .neq('id', 0)
                .then((res) => {
                    props.onFinish && props?.onFinish(res);
                });

            break;

        case 'update':
            await supabase
                .from(props.relation)
                .update(props.data)
                .eq('id', props.id)
                .select()
                .then((res) => {
                    console.log(res);
                    props?.onFinish && props.onFinish(res);
                });

            break;

        case 'user-login':
            try {
                await supabase.auth
                    .signInWithPassword({
                        email: props.data.email,
                        password: props.data.password,
                    })
                    .then((res) => {
                        console.log(res);
                        props.onFinish && props.onFinish(res);
                    });
            } catch (err) {
                console.log(err);
            }

            break;

        case 'user-logout':
            try {
                await supabase.auth.signOut().then((res) => {
                    console.log(res);
                    props.onFinish && props.onFinish(res);
                });
            } catch (err) {
                console.log(err);
            }
            break;
    }
};
