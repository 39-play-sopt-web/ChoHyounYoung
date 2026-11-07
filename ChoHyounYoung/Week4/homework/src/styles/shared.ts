import styled from 'styled-components';

export const Page = styled.main`
  width: min(850px, calc(100% - 40px));
  margin: ${({ theme }) => theme.spacing[10]} auto 96px;
  @media (max-width: 600px) { width: min(100% - 28px, 850px); margin-top: ${({ theme }) => theme.spacing[6]}; }
`;
export const Heading = styled.h1`margin: 0 0 ${({ theme }) => theme.spacing[8]}; font: ${({ theme }) => theme.typography.heading}; letter-spacing: -.04em;`;
export const Field = styled.input`
  width: 100%; height: 46px; padding: 0 ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.textPrimary}; background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: ${({ theme }) => theme.radius.medium}; outline: none;
  transition: border-color ${({ theme }) => theme.transition.fast};
  &::placeholder { color: ${({ theme }) => theme.colors.textTertiary}; }
  &:focus { border-color: ${({ theme }) => theme.colors.primary}; }
  &[aria-invalid='true'] { border-color: ${({ theme }) => theme.colors.danger}; }
`;
export const Textarea = styled.textarea`
  width: 100%; min-height: 220px; padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.textPrimary}; background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border}; border-radius: ${({ theme }) => theme.radius.medium};
  outline: none; line-height: 1.7; resize: vertical;
  &:focus { border-color: ${({ theme }) => theme.colors.primary}; }
  &[aria-invalid='true'] { border-color: ${({ theme }) => theme.colors.danger}; }
`;
export const Button = styled.button<{ $variant?: 'primary' | 'outline' | 'danger' }>`
  min-width: 88px; height: 44px; padding: 0 ${({ theme }) => theme.spacing[5]};
  border: 1px solid ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.primary : $variant === 'danger' ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.medium};
  color: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.onPrimary : $variant === 'danger' ? theme.colors.danger : theme.colors.textSecondary};
  background: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.primary : 'transparent'};
  font: ${({ theme }) => theme.typography.label}; transition: background ${({ theme }) => theme.transition.fast};
  &:hover:not(:disabled) { color: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.onPrimary : theme.colors.textPrimary}; background: ${({ theme, $variant }) => $variant === 'primary' ? theme.colors.primaryHover : $variant === 'danger' ? theme.colors.dangerSurface : theme.colors.surfaceHover}; }
`;
export const FormGroup = styled.div`margin-bottom: ${({ theme }) => theme.spacing[6]};`;
export const Label = styled.label`display: block; margin-bottom: ${({ theme }) => theme.spacing[2]}; font: ${({ theme }) => theme.typography.label};`;
export const ButtonRow = styled.div`display: flex; justify-content: flex-end; gap: ${({ theme }) => theme.spacing[3]}; margin-top: ${({ theme }) => theme.spacing[6]};`;
export const FieldMeta = styled.div`display: flex; justify-content: space-between; gap: ${({ theme }) => theme.spacing[3]}; margin-top: ${({ theme }) => theme.spacing[2]}; color: ${({ theme }) => theme.colors.textTertiary}; font: ${({ theme }) => theme.typography.caption};`;
export const ErrorText = styled.span`color: ${({ theme }) => theme.colors.danger};`;
export const Status = styled.div`padding: 70px ${({ theme }) => theme.spacing[5]}; text-align: center; color: ${({ theme }) => theme.colors.textSecondary}; button { margin-top: ${({ theme }) => theme.spacing[5]}; }`;
