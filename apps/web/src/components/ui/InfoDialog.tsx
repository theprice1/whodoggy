// apps/web/src/components/ui/InfoDialog.tsx
import type React from "react";

interface InfoDialogProps {
	visible: boolean;
	message: string;
	onClose: () => void;
}

export const InfoDialog: React.FC<InfoDialogProps> = ({
	visible,
	message,
	onClose,
}) => {
	if (!visible) return null;

	return (
		<div className="info-dialog-overlay" onClick={onClose}>
			<div className="info-dialog" onClick={(e) => e.stopPropagation()}>
				<p className="info-dialog-message">{message}</p>
				<button className="info-dialog-button" onClick={onClose}>
					OK
				</button>
			</div>
		</div>
	);
};

// Add to your CSS:
// .info-dialog-overlay {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// }
//
// .info-dialog {
//   background: white;
//   padding: 20px;
//   border-radius: 8px;
//   min-width: 300px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// }
//
// .info-dialog-message {
//   margin-bottom: 20px;
//   text-align: center;
// }
//
// .info-dialog-button {
//   width: 100%;
//   padding: 12px;
//   background-color: #007AFF;
//   color: white;
//   border: none;
//   border-radius: 6px;
//   font-weight: 600;
//   cursor: pointer;
// }
