/**
 * @author Anderson Battisti
 */

export enum ToastVariant
{
    INFO    = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR   = 'error',
}

export interface Toast
{
    id: string;
    message: string;
    variant: ToastVariant;
    isLeaving: boolean;
}