import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { CARD_HANDLES } from '@/libs/handles/card';
import type { CardImageProps } from '@/components/common/card/cardImage/CardImage';

export type CardProps = CardImageProps;

const Card = (props: CardProps): React.ReactElement =>
    createDynamicElement({
        handles: CARD_HANDLES,
        selector: props.variant,
        props,
    });

export default Card;
