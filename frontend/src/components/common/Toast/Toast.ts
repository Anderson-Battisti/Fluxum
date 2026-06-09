export enum ToastVariant
{
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR   = 'error',
}

export interface Toast
{
    message: string;
    variant: ToastVariant;
}