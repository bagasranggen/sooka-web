import InputFloating from '@/components/common/input/inputFloating/InputFloating';
import InputRegular from '@/components/common/input/inputRegular/InputRegular';
import InputSwitch from '@/components/common/input/inputShared/InputSwitch';
import InputText from '@/components/common/input/inputShared/inputText';

export const INPUT_VARIANTS = {
    FLOATING: 'floating',
    REGULAR: 'regular',
} as const;

export const INPUT_TYPE = {
    SWITCH: 'switch',
    TEXT: 'text',
    NUMBER: 'number',
} as const;

export const INPUT_HANDLES = {
    [INPUT_VARIANTS.FLOATING]: InputFloating,
    [INPUT_VARIANTS.REGULAR]: InputRegular,
};

export const INPUT_TYPE_HANDLES = {
    [INPUT_TYPE.SWITCH]: InputSwitch,
    [INPUT_TYPE.TEXT]: InputText,
    [INPUT_TYPE.NUMBER]: InputText,
};
