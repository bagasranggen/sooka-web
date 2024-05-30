import React from 'react';

import { createDynamicElement } from '@/libs/factory';
import { ALERT_HANDLES } from '@/libs/handles';

import type { AlertRoundedProps } from '@/components/common/alert/alertRounded/AlertRounded';

export type AlertProps = AlertRoundedProps;

const Alert = (props: AlertProps): React.ReactElement =>
    createDynamicElement({ handles: ALERT_HANDLES, selector: props.variant, props });

export default Alert;

export type * from '@/components/common/alert/alertRounded/AlertRounded';
