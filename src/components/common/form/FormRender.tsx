import React from 'react';

import { FORM_CONTACT } from '@/libs/form';

import { Col, Row } from 'react-bootstrap';
import Input, { InputProps } from '@/components/common/input/Input';

export type FormRenderItemProps = Omit<InputProps, 'hook'>

export type FormRenderProps = {
    items: Array<{
        children: FormRenderItemProps[];
    }>;
};

const FormRender = ({ items }: FormRenderProps): React.ReactElement => (
    <>
        {items.map((item: any, i: number) => {
            // const { handle, ...rest } = form;

            return <Row key={i}>
                {item.children.map((input: any, idx: number) => {
                    const {} = input;

                    return <div
                        key={idx}>
                        <>INPUT</>
                        {/*<Input*/}
                        {/*    variant="floating"*/}
                        {/*    input={{ type: f.type, id: f.handle, label: 'label' }}*/}
                        {/*    hook={{ register, name: f.handle }} />*/}
                    </div>;
                })}
            </Row>;
        })}
    </>
);

export default FormRender;