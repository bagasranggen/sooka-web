import InputFloating from '@/components/common/input/inputFloating/InputFloating';
import InputRegular from '@/components/common/input/inputRegular/InputRegular';
import InputSwitch from '@/components/common/input/inputShared/InputSwitch';
import InputText from '@/components/common/input/inputShared/InputText';
import InputCkEditor from '@/components/common/input/inputShared/InputCKEditor';
import InputSelect from '@/components/common/input/inputShared/InputSelect';

export const INPUT_VARIANTS = {
    FLOATING: 'floating',
    REGULAR: 'regular',
} as const;

export const INPUT_TYPE = {
    SWITCH: 'switch',
    TEXT: 'text',
    NUMBER: 'number',
    CK_EDITOR: 'ck-editor',
    SELECT: 'select',
} as const;

export const INPUT_HANDLES = {
    [INPUT_VARIANTS.FLOATING]: InputFloating,
    [INPUT_VARIANTS.REGULAR]: InputRegular,
};

export const INPUT_TYPE_HANDLES = {
    [INPUT_TYPE.SWITCH]: InputSwitch,
    [INPUT_TYPE.TEXT]: InputText,
    [INPUT_TYPE.NUMBER]: InputText,
    [INPUT_TYPE.CK_EDITOR]: InputCkEditor,
    [INPUT_TYPE.SELECT]: InputSelect,
};
