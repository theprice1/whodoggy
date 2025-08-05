declare module '../components/InfoDialog.js' {
  import { FC } from 'react';

  interface InfoDialogProps {
    visible: boolean;
    title: string;
    message: string;
    onClose: () => void;
  }

  const InfoDialog: FC<InfoDialogProps>;
  export default InfoDialog;
}
