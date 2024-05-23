import React from 'react';

export type ProductDetailSectionProps = {
    title: string;
    className?: string;
    children: React.ReactNode;
};

const ProductDetailSection = ({ title, className, children }: ProductDetailSectionProps): React.ReactElement => (
    <div className={`product-detail__section${className ? ` ${className}` : ''}`}>
        <h3>{title}</h3>
        {children}
    </div>
);

export default ProductDetailSection;
