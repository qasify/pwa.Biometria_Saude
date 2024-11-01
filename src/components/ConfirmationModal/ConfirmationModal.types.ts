export interface ConfirmationModalProps {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose?: () => void; // Tornando opcional com "?"
  singleButton?: boolean;
}
