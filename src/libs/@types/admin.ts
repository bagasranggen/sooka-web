export type AdminDataSlugProps = { slug?: string };
export type AdminDataVariantProps = 'view' | 'add' | 'edit';
export type AdminDataProps = { variant?: AdminDataVariantProps } & AdminDataSlugProps;
